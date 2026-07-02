import React from 'react';
import { BusinessInfo, toLocalBusinessJsonLd } from '@/lib/business-info';

/**
 * Emits schema.org LocalBusiness JSON-LD for a client business.
 * Place once per client page so search engines can tie the page to the
 * business's canonical NAP record.
 */
export function LocalBusinessJsonLd({ business }: { business: BusinessInfo }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(toLocalBusinessJsonLd(business)) }}
    />
  );
}
