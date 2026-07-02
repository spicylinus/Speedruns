/**
 * Canonical NAP (Name, Address, Phone) records for every client business.
 *
 * This file is the single source of truth for business identity data.
 * Pages, dashboards, JSON-LD schema, and citation tooling must read from
 * here — never hardcode a business name, address, or phone elsewhere.
 * Consistent NAP across the site and third-party citations is a core
 * local-search ranking signal.
 */

export interface BusinessAddress {
  /** Omitted for service-area businesses with no public storefront. */
  street?: string;
  locality: string;
  region: string;
  postalCode?: string;
  country: string;
}

export interface BusinessInfo {
  /** Route slug, e.g. 'sd-plumbing' — matches CLIENT_DELIVERIES keys. */
  id: string;
  name: string;
  /** Registered/© name when it differs from the display name. */
  legalName?: string;
  /** schema.org LocalBusiness subtype, e.g. 'Plumber', 'HairSalon'. */
  schemaType: string;
  phone: {
    /** E.164 — used in tel: hrefs and JSON-LD telephone. */
    e164: string;
    /** House display format, e.g. '(512) 555-0123'. */
    display: string;
  };
  address: BusinessAddress;
  /** Service area for businesses that travel to customers. */
  areaServed?: string;
  url: string;
  email?: string;
  /** schema.org openingHours strings, e.g. 'Tu-Fr 10:00-20:00'. */
  openingHours?: string[];
  /** Human-readable hours for UI rendering, paired label/value. */
  openingHoursDisplay?: { days: string; hours: string }[];
  foundingDate?: string;
  /** Confirmed profile/citation URLs (GBP, Yelp, socials) for JSON-LD sameAs. */
  sameAs?: string[];
}

export const BUSINESSES: Record<string, BusinessInfo> = {
  'sd-plumbing': {
    id: 'sd-plumbing',
    name: 'S&D Plumbing',
    legalName: 'S&D Plumbing Austin',
    schemaType: 'Plumber',
    phone: { e164: '+15125550123', display: '(512) 555-0123' },
    // Service-area business: no public storefront, so no street address.
    address: { locality: 'Austin', region: 'TX', country: 'US' },
    areaServed: 'Austin, TX & Surrounding',
    url: 'https://sdplumbing.com',
  },
  'spruce-salon': {
    id: 'spruce-salon',
    name: 'Spruce Salon',
    schemaType: 'HairSalon',
    phone: { e164: '+15125550199', display: '(512) 555-0199' },
    address: {
      street: '1201 S Congress Ave',
      locality: 'Austin',
      region: 'TX',
      postalCode: '78704',
      country: 'US',
    },
    url: 'https://www.sprucesalonaustin.com',
    email: 'hello@spruceaustin.com',
    openingHours: ['Tu-Fr 10:00-20:00', 'Sa 09:00-18:00'],
    openingHoursDisplay: [
      { days: 'Tuesday – Friday', hours: '10am – 8pm' },
      { days: 'Saturday', hours: '9am – 6pm' },
    ],
    foundingDate: '2018',
  },
};

export const telHref = (b: BusinessInfo) => `tel:${b.phone.e164}`;

export const formatCityStateZip = (b: BusinessInfo) =>
  [`${b.address.locality}, ${b.address.region}`, b.address.postalCode]
    .filter(Boolean)
    .join(' ');

/**
 * Builds a schema.org LocalBusiness object for JSON-LD embedding.
 * @type is emitted as ['LocalBusiness', subtype] so detectors that only
 * check for the base type (including our own audit engine) still match.
 */
export function toLocalBusinessJsonLd(b: BusinessInfo): Record<string, unknown> {
  const address: Record<string, unknown> = {
    '@type': 'PostalAddress',
    addressLocality: b.address.locality,
    addressRegion: b.address.region,
    addressCountry: b.address.country,
  };
  if (b.address.street) address.streetAddress = b.address.street;
  if (b.address.postalCode) address.postalCode = b.address.postalCode;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', b.schemaType],
    name: b.name,
    telephone: b.phone.e164,
    address,
    url: b.url,
  };
  if (b.legalName) jsonLd.legalName = b.legalName;
  if (b.areaServed) jsonLd.areaServed = b.areaServed;
  if (b.email) jsonLd.email = b.email;
  if (b.openingHours) jsonLd.openingHours = b.openingHours;
  if (b.foundingDate) jsonLd.foundingDate = b.foundingDate;
  if (b.sameAs && b.sameAs.length > 0) jsonLd.sameAs = b.sameAs;
  return jsonLd;
}
