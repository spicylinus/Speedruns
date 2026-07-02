/**
 * Citation NAP audit — fetches each third-party listing in the citations
 * manifest, extracts the Name/Address/Phone it displays, diffs it against
 * the canonical record in src/lib/business-info.ts, and writes the result
 * (status, observed values, timestamp) back to src/lib/citations-data.json.
 *
 * Usage:
 *   npx tsx scripts/citation-audit.ts [business-id]
 *   npx tsx scripts/citation-audit.ts sd-plumbing --url https://www.yelp.com/biz/example
 *
 * With no business-id, audits every business. Citations without a
 * listingUrl are skipped (status stays 'unchecked' / 'not-found' is only
 * set by a failed fetch of a known URL). The --url flag audits an ad-hoc
 * listing URL against a business without touching the manifest — useful
 * for verifying extraction against a live page.
 *
 * Fetch strategy mirrors src/lib/audit-engine.ts: plain fetch with a
 * browser User-Agent, falling back to headless Playwright for JS-heavy
 * listing pages.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { BUSINESSES, BusinessInfo } from '../src/lib/business-info';
import { Citation, ObservedNap } from '../src/lib/citations';

const DATA_PATH = path.join(__dirname, '..', 'src', 'lib', 'citations-data.json');
const PHONE_REGEX = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const ADDRESS_REGEX =
  /\d+\s+[A-Za-z0-9 .'-]+\b(?:St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road|Dr|Drive|Ln|Lane|Way|Ct|Court|Pkwy|Parkway)\b\.?(?:[,\s]+(?:Ste|Suite|Unit|#)\s*[\w-]+)?[,\s]+[A-Za-z .]+,?\s+[A-Z]{2}\s+\d{5}/;

async function fetchHtml(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (err) {
    console.warn(`  fetch failed (${(err as Error).message}), trying Playwright...`);
    const { chromium } = await import('playwright');
    // CHROMIUM_PATH overrides the browser binary when the environment ships
    // its own Chromium instead of the playwright-managed download.
    const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined });
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      return await page.content();
    } finally {
      await browser.close();
    }
  }
}

/** Extracts the NAP a listing page displays: JSON-LD first, then heuristics. */
function extractNap(html: string): ObservedNap {
  const $ = cheerio.load(html);
  const observed: ObservedNap = {};

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).html() || '{}');
      const nodes = Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed];
      for (const node of nodes) {
        const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
        const isBusiness = types.some(
          (t: string) => typeof t === 'string' && /Business|Organization|Plumber|Salon|Store|Restaurant/i.test(t)
        );
        if (!isBusiness) continue;
        if (node.name && !observed.name) observed.name = String(node.name);
        if (node.telephone && !observed.phone) observed.phone = String(node.telephone);
        const addr = node.address;
        if (addr && !observed.address) {
          observed.address =
            typeof addr === 'string'
              ? addr
              : [addr.streetAddress, addr.addressLocality, addr.addressRegion, addr.postalCode]
                  .filter(Boolean)
                  .join(', ');
        }
      }
    } catch {}
  });

  const bodyText = $('body').text();
  if (!observed.phone) {
    const telHref = $('a[href^="tel:"]').first().attr('href');
    if (telHref) observed.phone = telHref.replace('tel:', '');
    else observed.phone = bodyText.match(PHONE_REGEX)?.[0]?.trim();
  }
  if (!observed.address) observed.address = bodyText.match(ADDRESS_REGEX)?.[0]?.trim();
  if (!observed.name) {
    observed.name =
      $('meta[property="og:site_name"]').attr('content') ||
      $('meta[property="og:title"]').attr('content') ||
      $('title').text().split(/[|\-–]/)[0].trim() ||
      undefined;
  }
  return observed;
}

const normalizePhone = (phone: string) => phone.replace(/\D/g, '').slice(-10);
const normalizeName = (name: string) => name.toLowerCase().replace(/\s*&\s*/g, '&').replace(/\s+/g, ' ').trim();
const normalizeAddress = (addr: string) => addr.toLowerCase().replace(/[.,]/g, '').replace(/\s+/g, ' ').trim();

interface Mismatch {
  field: 'name' | 'address' | 'phone';
  canonical: string;
  observed: string;
}

function diffNap(business: BusinessInfo, observed: ObservedNap): Mismatch[] {
  const mismatches: Mismatch[] = [];

  if (observed.name && normalizeName(observed.name) !== normalizeName(business.name)) {
    mismatches.push({ field: 'name', canonical: business.name, observed: observed.name });
  }
  if (observed.phone && normalizePhone(observed.phone) !== normalizePhone(business.phone.e164)) {
    mismatches.push({ field: 'phone', canonical: business.phone.display, observed: observed.phone });
  }
  if (observed.address && business.address.street) {
    const canonicalAddress = `${business.address.street} ${business.address.locality} ${business.address.region} ${business.address.postalCode ?? ''}`;
    if (!normalizeAddress(observed.address).includes(normalizeAddress(business.address.street))) {
      mismatches.push({ field: 'address', canonical: canonicalAddress.trim(), observed: observed.address });
    }
  }
  return mismatches;
}

async function auditListing(business: BusinessInfo, url: string): Promise<{ observed: ObservedNap; mismatches: Mismatch[] } | null> {
  console.log(`  ${url}`);
  let html: string;
  try {
    html = await fetchHtml(url);
  } catch (err) {
    console.warn(`  unreachable: ${(err as Error).message}`);
    return null;
  }
  const observed = extractNap(html);
  const mismatches = diffNap(business, observed);
  console.log(`  observed: name=${observed.name ?? '—'} | phone=${observed.phone ?? '—'} | address=${observed.address ?? '—'}`);
  if (mismatches.length === 0) {
    console.log('  ✓ consistent with canonical NAP');
  } else {
    for (const m of mismatches) {
      console.log(`  ✗ ${m.field}: listing shows "${m.observed}", canonical is "${m.canonical}"`);
    }
  }
  return { observed, mismatches };
}

async function main() {
  const args = process.argv.slice(2);
  const urlFlagIndex = args.indexOf('--url');
  const adHocUrl = urlFlagIndex !== -1 ? args[urlFlagIndex + 1] : undefined;
  const businessId = args.find((a) => !a.startsWith('--') && a !== adHocUrl);

  const businessIds = businessId ? [businessId] : Object.keys(BUSINESSES);
  for (const id of businessIds) {
    if (!BUSINESSES[id]) {
      console.error(`Unknown business id '${id}'. Known: ${Object.keys(BUSINESSES).join(', ')}`);
      process.exit(1);
    }
  }

  // Ad-hoc mode: audit one URL against one business, don't touch the manifest.
  if (adHocUrl) {
    const business = BUSINESSES[businessIds[0]];
    console.log(`Ad-hoc audit for ${business.name}:`);
    await auditListing(business, adHocUrl);
    return;
  }

  const manifest: Record<string, Citation[]> = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  let checkedAny = false;

  for (const id of businessIds) {
    const business = BUSINESSES[id];
    const citations = manifest[id] ?? [];
    console.log(`\n${business.name} (${id}) — ${citations.length} citations in manifest`);

    for (const citation of citations) {
      if (!citation.listingUrl) {
        console.log(`  ${citation.platform}: no listingUrl — skipped (claim/find the listing, then add its URL)`);
        continue;
      }
      console.log(`  ${citation.platform}:`);
      const result = await auditListing(business, citation.listingUrl);
      citation.lastCheckedAt = new Date().toISOString();
      if (!result) {
        citation.status = 'not-found';
      } else {
        citation.observed = result.observed;
        citation.status = result.mismatches.length === 0 ? 'consistent' : 'mismatched';
      }
      checkedAny = true;
    }
  }

  if (checkedAny) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`\nManifest updated: ${DATA_PATH}`);
  } else {
    console.log('\nNo citations had a listingUrl — manifest unchanged.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
