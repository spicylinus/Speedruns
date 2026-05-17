import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'

export const metadata: Metadata = {
  title: 'E-commerce Beauty Brand Case Study — +37% Average Order Value',
  description: 'How Social Linus increased average order value by 37% and conversion rate by 22% in 30 days through UX redesign.',
}

export default function EcommerceBeautyBrandPage() {
  return (
    <main>
      {/* Header */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">Case Study · Beauty &amp; Personal Care · E-commerce</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              E-commerce Beauty Brand
              <span className="block text-white/55 mt-2" style={{ fontSize: '24px' }}>Anonymized by request</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div
              className="font-mono font-bold text-cobalt mb-8"
              style={{ fontSize: '56px', letterSpacing: '-0.02em' }}
            >
              +37%
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <p className="text-white/70 max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Average order value increase in 30 days. No new traffic. Just a better site.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Challenge */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">The Challenge</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-void mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              High traffic. Low conversion. Beautiful product — confusing checkout.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              This brand had strong organic traffic and a genuinely good product. Their conversion rate told a different story. Visitors were landing, browsing, and leaving without buying.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              The homepage buried the value proposition. The checkout flow had friction at every step. There were no trust signals above the fold. Customers who wanted to buy were being lost by the experience.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* What We Did */}
      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">What We Did</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-void mb-12"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              30-day turnaround. Conversion-first redesign.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'UX Audit', body: 'Session recording analysis identified every point where users were dropping off. We mapped the exact friction.' },
              { title: 'Homepage Redesign', body: 'Value proposition above the fold. Social proof prominent. Clear path from landing to purchase.' },
              { title: 'Checkout Flow Optimization', body: 'Reduced checkout from 5 steps to 3. Removed unnecessary fields. Progress indicators added.' },
              { title: 'Social Proof Integration', body: 'Reviews, testimonials, and trust badges placed at the specific moments buyers need reassurance.' },
              { title: 'A/B Testing', body: 'Tested headline variants, CTA placement, and product image formats. Data-backed final decisions.' },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-display font-medium text-void mb-3" style={{ fontSize: '18px' }}>
                    {item.title}
                  </h3>
                  <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.65' }}>{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">Results</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-white mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              30-day results from same traffic, better site.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: '+37%', label: 'Average order value' },
              { metric: '+22%', label: 'Conversion rate' },
              { metric: '30 days', label: 'Time to results' },
            ].map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div
                    className="font-mono font-bold text-cobalt mb-2"
                    style={{ fontSize: '42px', letterSpacing: '-0.02em' }}
                  >
                    {stat.metric}
                  </div>
                  <p className="eyebrow text-white/55">{stat.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="snap-section--short bg-cobalt px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2
              className="font-display font-semibold text-white mb-6"
              style={{ fontSize: '28px', letterSpacing: '-0.02em' }}
            >
              Ready to start a project?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/80 mb-8" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Book a call. We&apos;ll look at your site and identify where you&apos;re losing revenue.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors bg-white text-cobalt hover:bg-frost px-8 py-4 text-base"
            >
              Start a Project →
            </Link>
          </AnimateIn>
        </div>
      </section>
    </main>
  )
}
