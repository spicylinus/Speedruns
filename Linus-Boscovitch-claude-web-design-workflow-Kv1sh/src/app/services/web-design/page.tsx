import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Web Design That Drives Revenue',
  description: 'B2B web design built to convert. Conversion-focused architecture, SEO-ready, mobile-first for service companies in Atlanta and the Southeast.',
}

const processSteps = [
  { step: '01', title: 'Discovery', body: 'We learn your business, buyers, and competitors. What do you sell, who buys it, and what makes them convert.' },
  { step: '02', title: 'Design', body: 'Wireframes first, visuals second. Every layout decision is grounded in conversion psychology.' },
  { step: '03', title: 'Build', body: 'Clean code, fast loads, mobile-first. Built on a stack that won\'t break when you need to update it.' },
  { step: '04', title: 'Launch', body: 'QA across devices and browsers. Analytics configured. SEO foundations in place before we go live.' },
  { step: '05', title: 'Optimize', body: 'We don\'t disappear after launch. Data informs what we improve next.' },
]

export default function WebDesignPage() {
  return (
    <main>
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Web Design</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Web Design That Drives Revenue
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              A website that doesn&apos;t generate leads is an expense. We build sites that work.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Button href="/book-a-call" size="lg">Start a Project →</Button>
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
              Most business websites are digital business cards.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              They list services. They have a contact page. They look decent on desktop. But they don&apos;t rank, they don&apos;t convert, and they don&apos;t explain why someone should choose you.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              If your site isn&apos;t generating inquiries every week, it&apos;s not working. That&apos;s not an opinion — it&apos;s a fixable problem.
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
              Built to convert from the first click.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Conversion-Focused Architecture', body: 'Every page has a purpose and a path. We structure content so visitors know exactly what to do next.' },
              { title: 'SEO-Ready from Day One', body: 'Technical SEO is built into the foundation — proper structure, fast loads, clean code. Not bolted on after.' },
              { title: 'Mobile-First', body: 'Over 60% of B2B research happens on mobile. Your site works perfectly on every screen size.' },
              { title: 'Fast Loading', body: 'We target sub-2-second load times. Speed is a ranking factor and a conversion factor.' },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-white/60">
                  <h3
                    className="font-heading font-medium text-void mb-3"
                    style={{ fontSize: '20px', letterSpacing: '-0.01em' }}
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
              Built for businesses where deals are won or lost before the first call.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'B2B Service Companies', body: 'Consulting firms, agencies, managed service providers — anyone who sells expertise.' },
              { title: 'Contractors & Trades', body: 'Commercial and residential contractors who need to stand out from the competition online.' },
              { title: 'Professional Services', body: 'Law firms, accounting practices, financial advisors who need credibility and inquiries.' },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1}>
                <div className="border border-slate/20 rounded-xl p-6">
                  <h3
                    className="font-heading font-medium text-void mb-3"
                    style={{ fontSize: '20px' }}
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

      {/* The Process */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">The Process</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-heading font-semibold text-white mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Five steps from strategy to live site.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-5 gap-4">
            {processSteps.map((step, i) => (
              <AnimateIn key={step.step} delay={i * 0.08}>
                <div className="relative">
                  <div className="font-mono font-bold text-cobalt text-sm mb-3">{step.step}</div>
                  <h3 className="font-heading font-medium text-white mb-2" style={{ fontSize: '16px' }}>
                    {step.title}
                  </h3>
                  <p className="text-white/50" style={{ fontSize: '13px', lineHeight: '1.6' }}>{step.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Results Preview */}
      <section className="snap-section--short bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-4">Results</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Link
              href="/results/creative-sources"
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-frost rounded-xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div>
                <p className="font-heading font-semibold text-void mb-2" style={{ fontSize: '20px' }}>
                  Creative Sources — Commercial Lighting
                </p>
                <p className="text-slate text-sm">Complete redesign + SEO. Page one for every target keyword.</p>
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
              Ready to build a site that generates leads?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/80 mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Book a call. We&apos;ll audit your current site and show you exactly what&apos;s holding it back.
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
