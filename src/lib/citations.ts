/**
 * Third-party citation manifest — the off-site counterpart to business-info.ts.
 *
 * Each business's directory/profile listings live in citations-data.json so
 * scripts/citation-audit.ts can write audit results (status, observed NAP,
 * timestamp) back to the manifest. The demo clients are fictional, so their
 * entries have no listingUrl yet; real clients get real listing URLs, and
 * confirmed URLs should also be added to BusinessInfo.sameAs for JSON-LD.
 */
import citationsData from './citations-data.json';

export type CitationStatus =
  | 'consistent'   // listing NAP matches the canonical record
  | 'mismatched'   // listing exists but shows different NAP values
  | 'unclaimed'    // listing exists but the business doesn't control it
  | 'not-found'    // no listing found on the platform
  | 'unchecked';   // never audited

export interface ObservedNap {
  name?: string;
  address?: string;
  phone?: string;
}

export interface Citation {
  platform: string;
  /** Public listing URL; undefined until the listing is found/claimed. */
  listingUrl?: string;
  /** Where a human applies manual updates. */
  dashboardUrl: string;
  /** 'api' when an official write API exists (see scripts/), else 'dashboard'. */
  updateMethod: 'api' | 'dashboard';
  status: CitationStatus;
  /** ISO timestamp written by scripts/citation-audit.ts. */
  lastCheckedAt?: string;
  /** NAP values the listing currently shows, per the last audit. */
  observed?: ObservedNap;
}

export const CITATIONS = citationsData as Record<string, Citation[]>;
