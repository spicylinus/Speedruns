import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'

export const metadata: Metadata = {
  title: 'Results',
  description: 'Real results from real businesses. Case studies in web design, SEO, and lead generation from Social Linus.',
}

const caseStudies = [
  {
    client: 'Creative Sources',
    industry: 'Commercial Lighting · Atlanta',
    metric: 'Page 20 → Page 1',
    description: 'Complete website redesign combined with a full SEO overhaul. Page one rankings for every target keyword within 90 days.',
    href: '/results/creative-sources',
    available: true,
  },
  {
    client: 'E-commerce Beauty Brand',
    industry: 'Beauty & Personal Care · Anonymized',
    metric: '+37%',
    description: 'Average order value increase in 30 days following a UX audit, homepage redesign, and checkout flow optimization.',
    href: '/results/ecommerce-beauty-brand',
    available: true,
  },
  {
    client: 'BHX Modular',
    industry: 'Modular Construction',
    metric: 'Coming Soon',
    description: 'Website redesign and B2B lead generation system deployment currently underway. Case study in progress.',
    href: '/results/bhx-modular',
    available: false,
  },
]

export default function ResultsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Results</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Results
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Every engagement starts with a clear goal. Here&apos;s what that looks like.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Case Studies */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="space-y-6">
            {caseStudies.map((cs, i) => (
              <AnimateIn key={cs.client} delay={i * 0.1}>
                <Link
                  href={cs.href}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-xl p-8 border transition-shadow group ${
                    cs.available
                      ? 'bg-frost border-frost hover:shadow-lg'
                      : 'bg-slate/5 border-slate/20 cursor-default'
                  }`}
                >
                  <div className="flex-1">
                    <p className="eyebrow text-cobalt mb-2">{cs.industry}</p>
                    <h2
                      className="font-display font-semibold text-void mb-3"
                      style={{ fontSize: '24px', letterSpacing: '-0.01em' }}
                    >
                      {cs.client}
                    </h2>
                    <p className="text-slate text-sm leading-relaxed max-w-lg">{cs.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className={`font-mono font-bold mb-2 ${cs.available ? 'text-cobalt' : 'text-slate'}`}
                      style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
                    >
                      {cs.metric}
                    </div>
                    {cs.available ? (
                      <p className="text-cobalt text-sm font-medium group-hover:underline">
                        Read case study →
                      </p>
                    ) : (
                      <p className="text-slate/60 text-sm">In progress</p>
                    )}
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
