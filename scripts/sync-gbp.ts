/**
 * Google Business Profile sync — pushes the canonical NAP record from
 * src/lib/business-info.ts to a GBP location via the Business Information
 * API (locations.patch).
 *
 * Usage:
 *   npx tsx scripts/sync-gbp.ts <business-id>            # dry run (prints payload)
 *   npx tsx scripts/sync-gbp.ts <business-id> --apply    # pushes when credentials are set
 *
 * Required env vars for --apply:
 *   GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN  # OAuth2 for a GCP
 *     project approved for the Business Profile APIs (Google gates access;
 *     request it at https://developers.google.com/my-business)
 *   GBP_LOCATION_ID                                       # numeric id from
 *     locations.list, e.g. '12345678901234567890'
 *
 * Without credentials (or without --apply) the script prints the exact
 * PATCH payload and update mask so the change can be reviewed or applied
 * manually in the GBP dashboard.
 */
import { BUSINESSES, BusinessInfo } from '../src/lib/business-info';

const API_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';

/** Maps the canonical record to a GBP Location resource (patch fields only). */
function toGbpLocation(b: BusinessInfo): { location: Record<string, unknown>; updateMask: string } {
  const location: Record<string, unknown> = {
    title: b.name,
    phoneNumbers: { primaryPhone: b.phone.e164 },
    websiteUri: b.url,
  };
  const mask = ['title', 'phoneNumbers.primaryPhone', 'websiteUri'];

  // Service-area businesses must not send a storefront street address.
  if (b.address.street) {
    location.storefrontAddress = {
      regionCode: b.address.country,
      administrativeArea: b.address.region,
      locality: b.address.locality,
      postalCode: b.address.postalCode,
      addressLines: [b.address.street],
    };
    mask.push('storefrontAddress');
  }

  return { location, updateMask: mask.join(',') };
}

async function getAccessToken(): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GBP_CLIENT_ID!,
      client_secret: process.env.GBP_CLIENT_SECRET!,
      refresh_token: process.env.GBP_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  if (!response.ok) throw new Error(`Token exchange failed: HTTP ${response.status} ${await response.text()}`);
  const json = (await response.json()) as { access_token: string };
  return json.access_token;
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const businessId = args.find((a) => !a.startsWith('--'));

  if (!businessId || !BUSINESSES[businessId]) {
    console.error(`Usage: npx tsx scripts/sync-gbp.ts <business-id> [--apply]`);
    console.error(`Known business ids: ${Object.keys(BUSINESSES).join(', ')}`);
    process.exit(1);
  }

  const business = BUSINESSES[businessId];
  const { location, updateMask } = toGbpLocation(business);

  console.log(`Canonical NAP for ${business.name} as a GBP locations.patch payload:`);
  console.log(`updateMask: ${updateMask}`);
  console.log(JSON.stringify(location, null, 2));

  const credentials = ['GBP_CLIENT_ID', 'GBP_CLIENT_SECRET', 'GBP_REFRESH_TOKEN', 'GBP_LOCATION_ID'];
  const missing = credentials.filter((name) => !process.env[name]);

  if (!apply) {
    console.log('\nDry run (pass --apply to push). Review the payload above or apply it manually at https://business.google.com');
    return;
  }
  if (missing.length > 0) {
    console.error(`\nCannot apply: missing env vars ${missing.join(', ')}.`);
    console.error('GBP API access requires a Google-approved GCP project; see the header of this script.');
    process.exit(1);
  }

  const accessToken = await getAccessToken();
  const url = `${API_BASE}/locations/${process.env.GBP_LOCATION_ID}?updateMask=${encodeURIComponent(updateMask)}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(location),
  });

  if (!response.ok) {
    console.error(`PATCH failed: HTTP ${response.status}`);
    console.error(await response.text());
    process.exit(1);
  }
  console.log('\n✓ Google Business Profile updated. Changes may take a few days to propagate on Maps/Search.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
