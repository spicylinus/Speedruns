import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'SEO That Ranks You for the Keywords That Matter',
  description: 'Technical SEO, keyword strategy, and local search optimization for B2B service companies. Revenue-focused SEO in Atlanta and the Southeast.',
}

export default function SeoPage() {
  return (
    <main>
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">SEO</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              SEO That Ranks You for the Keywords That Matter
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Ranking for your business name isn&apos;t SEO. We get you in front of buyers actively searching for what you sell.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Button href="/book-a-call" size="lg">Book a Call →</Button>
          </AnimateIn>
        </div>
      </section>

      {/* The Problem */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">The Problem</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-heading font-semibold text-void mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Ranking for your business name isn&apos;t SEO.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Most businesses rank for their own name. That&apos;s not SEO — that&apos;s just having a website. Real SEO means showing up when someone who&apos;s never heard of you searches for the service you provide.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              If you&apos;re not on page one for your core services, you&apos;re invisible to the buyers who are actively looking.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* The Approach */}
      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Our Approach</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-heading font-semibold text-void mb-12"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Five pillars. One goal: organic revenue.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Technical Audit', body: 'We find every crawl error, speed issue, and structural problem holding your rankings back.' },
              { title: 'Keyword Strategy', body: 'We map buyer intent to search volume — targeting terms that indicate purchase readiness.' },
              { title: 'On-Page Optimization', body: 'Every target page gets optimized: title tags, headers, content structure, internal links.' },
              { title: 'Local SEO', body: 'Google Business Profile optimization, local citations, and geo-targeted content for your market.' },
              { title: 'Content Strategy', body: 'Topic clusters built around your service areas. Content that ranks and converts.' },
              { title: 'Reporting', body: 'Monthly reporting on rankings, traffic, and — most importantly — leads generated.' },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6">
                  <h3
                    className="font-heading font-medium text-void mb-3"
                    style={{ fontSize: '18px' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.65' }}>{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Who It&apos;s For</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-heading font-semibold text-void mb-12"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Best suited for businesses where a single new client pays for months of SEO.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Local Service Businesses', body: 'Contractors, HVAC, plumbing, landscaping — any business winning local searches.' },
              { title: 'B2B Professional Services', body: 'Consultants, agencies, and firms where a single client is worth $10K+.' },
              { title: 'Regional Companies', body: 'Businesses serving Atlanta and the Southeast who want to dominate their market.' },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1}>
                <div className="border border-slate/20 rounded-xl p-6">
                  <h3 className="font-heading font-medium text-void mb-3" style={{ fontSize: '18px' }}>
                    {item.title}
                  </h3>
                  <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.65' }}>{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Diagnostic — Ember accent */}
      <section className="snap-section--short bg-void px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <AnimateIn>
            <div className="border border-ember/40 rounded-2xl p-10 text-center">
              <p className="eyebrow text-ember mb-4">SEO Diagnostic</p>
              <h2
                className="font-heading font-semibold text-white mb-4"
                style={{ fontSize: '28px', letterSpacing: '-0.02em' }}
              >
                $197 SEO Diagnostic. Find 5 revenue-impacting issues — or you don&apos;t pay.
              </h2>
              <p className="text-white/70 mb-8" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                We audit your site, your competitors, and your keyword landscape. You get a written report with specific, ranked fixes. If we don&apos;t find at least 5 issues directly impacting your revenue, the diagnostic is free.
              </p>
              <Button href="/book-a-call" variant="ember" size="lg">Book Your SEO Diagnostic →</Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Results Preview */}
      <section className="snap-section--short bg-frost px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-4">Results</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Link
              href="/results/creative-sources"
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white rounded-xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div>
                <p className="font-heading font-semibold text-void mb-2" style={{ fontSize: '20px' }}>
                  Creative Sources — Commercial Lighting
                </p>
                <p className="text-slate text-sm">+340% organic traffic in 90 days. Page one for every target keyword.</p>
              </div>
              <div>
                <div className="font-mono font-bold text-cobalt mb-1" style={{ fontSize: '36px', letterSpacing: '-0.02em' }}>
                  Page 20 → Page 1
                </div>
                <p className="text-cobalt text-sm font-medium group-hover:underline">Read the case study →</p>
              </div>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="snap-section bg-cobalt flex flex-col justify-center items-center text-center px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <AnimateIn>
            <h2
              className="font-heading font-semibold text-white mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Ready to rank for the searches that matter?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/80 mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Start with the $197 SEO Diagnostic. Know exactly where you stand before committing to anything.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors bg-white text-cobalt hover:bg-frost px-8 py-4 text-base"
            >
              Book a Call →
            </Link>
          </AnimateIn>
        </div>
      </section>
    </main>
  )
}
