export type CaseStudyStatus = 'published' | 'in-progress'

export type CaseStudyService = 'web-design' | 'seo' | 'lead-generation'

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  location?: string
  anonymous: boolean
  status: CaseStudyStatus
  services: CaseStudyService[]
  heroMetric: string
  heroMetricLabel: string
  challenge: string
  challengeDetail: string
  whatWeDid: { title: string; body: string }[]
  results: { metric: string; label: string }[]
  testimonial?: {
    quote: string
    name: string
    role: string
  }
  inProgressNote?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'creative-sources',
    client: 'Creative Sources',
    industry: 'Commercial Lighting',
    location: 'Atlanta, GA',
    anonymous: false,
    status: 'published',
    services: ['web-design', 'seo'],
    heroMetric: 'Page 20 → Page 1',
    heroMetricLabel: 'For every target keyword',
    challenge: 'Invisible online despite 12 years in business.',
    challengeDetail:
      'Creative Sources had over a decade of experience in commercial lighting — a legitimate, established business with a strong track record. Their problem: no organic traffic, no search visibility, and direct competition with national brands on local Google searches. When potential clients searched for commercial lighting services in Atlanta, Creative Sources didn\'t appear. Not on page one. Not on page two. Not in the local pack.',
    whatWeDid: [
      {
        title: 'New Website Architecture',
        body: 'Rebuilt site structure from the ground up. Separate, optimized pages for each service and market segment.',
      },
      {
        title: 'Targeted Keyword Strategy',
        body: 'Identified the commercial lighting search terms that buyers in Atlanta actually use with purchase intent.',
      },
      {
        title: 'On-Page SEO at Scale',
        body: 'Fully optimized 40+ target pages — title tags, headers, content, internal linking, structured data.',
      },
      {
        title: 'Local SEO Optimization',
        body: 'Google Business Profile overhaul, local citation building, and geo-targeted content for the Atlanta market.',
      },
      {
        title: 'Content Calendar',
        body: 'Developed a content plan targeting informational searches that draw buyers in the commercial lighting buying cycle.',
      },
    ],
    results: [
      { metric: 'Page 20 → Page 1', label: 'For every target keyword' },
      { metric: '+340%', label: 'Organic traffic in 90 days' },
      { metric: '40+', label: 'Pages fully optimized' },
    ],
    testimonial: {
      quote:
        "We've been in business for over a decade and never ranked for anything. Now we're getting calls from companies we've never met who found us on Google. That didn't happen before.",
      name: 'Creative Sources',
      role: 'Commercial Lighting, Atlanta GA',
    },
  },
  {
    slug: 'ecommerce-beauty-brand',
    client: 'E-commerce Beauty Brand',
    industry: 'Beauty & Personal Care',
    anonymous: true,
    status: 'published',
    services: ['web-design'],
    heroMetric: '+37%',
    heroMetricLabel: 'Average order value',
    challenge: 'High traffic but low conversion.',
    challengeDetail:
      'This brand had strong organic traffic and a genuinely good product. Their conversion rate told a different story. Visitors were landing, browsing, and leaving without buying. The homepage buried the value proposition. The checkout flow had friction at every step. There were no trust signals above the fold. Customers who wanted to buy were being lost by the experience.',
    whatWeDid: [
      {
        title: 'UX Audit',
        body: 'Session recording analysis identified every point where users were dropping off. We mapped the exact friction.',
      },
      {
        title: 'Homepage Redesign',
        body: 'Value proposition above the fold. Social proof prominent. Clear path from landing to purchase.',
      },
      {
        title: 'Checkout Flow Optimization',
        body: 'Reduced checkout from 5 steps to 3. Removed unnecessary fields. Progress indicators added.',
      },
      {
        title: 'Social Proof Integration',
        body: 'Reviews, testimonials, and trust badges placed at the specific moments buyers need reassurance.',
      },
      {
        title: 'A/B Testing',
        body: 'Tested headline variants, CTA placement, and product image formats. Data-backed final decisions.',
      },
    ],
    results: [
      { metric: '+37%', label: 'Average order value' },
      { metric: '+22%', label: 'Conversion rate' },
      { metric: '30 days', label: 'Time to results' },
    ],
  },
  {
    slug: 'bhx-modular',
    client: 'BHX Modular',
    industry: 'Modular Construction',
    anonymous: false,
    status: 'in-progress',
    services: ['web-design', 'lead-generation'],
    heroMetric: 'In Progress',
    heroMetricLabel: 'Case study being documented',
    challenge: 'Pipeline dependent entirely on existing relationships.',
    challengeDetail:
      'BHX Modular builds modular structures for commercial developers — a high-value B2B market with long sales cycles and significant deal sizes. Their challenge: a website that doesn\'t communicate the quality of their work, and a pipeline that depends entirely on existing relationships.',
    whatWeDid: [],
    results: [],
    inProgressNote:
      'Website redesign and B2B lead generation system deployment currently underway. Results will be documented as they come in.',
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.status === 'published')
}
