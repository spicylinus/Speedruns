import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Qualified Leads, Delivered',
  description: 'B2B lead generation for service companies with deals above $25K. Vetted contacts, personalized outreach, full pipeline management.',
}

const tiers = [
  {
    name: 'Lead Data',
    price: '$1,995',
    period: '/mo',
    description: 'Vetted, targeted contact lists delivered monthly. You run the outreach.',
    features: [
      'Monthly curated prospect list',
      'Verified contact data',
      'ICP-matched targeting',
      'Deliverability-checked emails',
      'CRM-ready CSV format',
    ],
    cta: 'Get Started →',
    highlight: false,
  },
  {
    name: 'Guided System',
    price: '$3,995',
    period: '/mo',
    description: 'Scored, segmented leads plus 10 hours/month of hands-on consulting to build and optimize your outreach.',
    features: [
      'Everything in Lead Data',
      'Prospect scoring & segmentation',
      '10 hrs/month consulting',
      'Sequence strategy & copy review',
      'Monthly performance review',
    ],
    cta: 'Book a Call →',
    highlight: true,
  },
  {
    name: 'Full Service',
    price: '$9,000',
    period: '/mo',
    description: 'We run the entire outreach machine. You focus on closing.',
    features: [
      'Everything in Guided System',
      'Outreach execution & management',
      'A/B testing & optimization',
      'Dedicated account manager',
      'Weekly pipeline updates',
    ],
    cta: 'Book a Call →',
    highlight: false,
  },
]

export default function LeadGenerationPage() {
  return (
    <main>
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Lead Generation</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Qualified Leads, Delivered
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Your pipeline can&apos;t run on referrals alone. We put qualified buyers in your inbox every month.
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
              className="font-display font-semibold text-void mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Referrals are unreliable. You can&apos;t scale what you can&apos;t control.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Word-of-mouth got you here. It won&apos;t get you where you want to go. Referrals are unpredictable, slow, and impossible to forecast.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              To grow predictably, you need a system that generates qualified opportunities on demand — not one that depends on someone else&apos;s memory.
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
              className="font-display font-semibold text-void mb-12"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              A proprietary system built for B2B service businesses.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Precision Targeting',
                body: 'We build an exact profile of your ideal buyer — industry, company size, role, geography, buying signals — then find them.',
              },
              {
                title: 'Vetted Contact Data',
                body: 'Every contact is verified before it reaches you. No bounces, no personal emails, no gatekeepers.',
              },
              {
                title: 'Personalized Outreach',
                body: 'Messages that don\'t feel like mass emails. Tailored to the buyer, relevant to their situation, timed for response.',
              },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-8">
                  <h3 className="font-display font-medium text-void mb-3" style={{ fontSize: '20px' }}>
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
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Who It&apos;s For</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-void mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Built for B2B companies where a single deal is worth $25,000 or more.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              This is not a lead generation service for high-volume, low-margin products. It works for businesses where the math is clear: a handful of new clients per year completely transforms revenue.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              If your average deal is above $25K, the ROI on a consistent outbound system is obvious.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Pricing</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-white mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Three tiers. One goal.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <AnimateIn key={tier.name} delay={i * 0.1}>
                <div
                  className={`rounded-xl p-8 h-full flex flex-col ${
                    tier.highlight
                      ? 'bg-cobalt text-white'
                      : 'bg-white/5 border border-white/10 text-white'
                  }`}
                >
                  <div className="mb-6">
                    <p className={`eyebrow mb-3 ${tier.highlight ? 'text-white/70' : 'text-cobalt'}`}>
                      {tier.name}
                    </p>
                    <div className="flex items-end gap-1 mb-3">
                      <span
                        className="font-mono font-bold"
                        style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
                      >
                        {tier.price}
                      </span>
                      <span className={`text-sm mb-2 ${tier.highlight ? 'text-white/70' : 'text-white/50'}`}>
                        {tier.period}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${tier.highlight ? 'text-white/80' : 'text-white/60'}`}>
                      {tier.description}
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-2 text-sm ${tier.highlight ? 'text-white/90' : 'text-white/70'}`}>
                        <span className={tier.highlight ? 'text-white' : 'text-cobalt'}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book-a-call"
                    className={`inline-flex items-center justify-center font-medium rounded-lg px-6 py-3 text-sm transition-colors ${
                      tier.highlight
                        ? 'bg-white text-cobalt hover:bg-frost'
                        : 'border border-cobalt text-cobalt hover:bg-cobalt hover:text-white'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="snap-section bg-cobalt flex flex-col justify-center items-center text-center px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <AnimateIn>
            <h2
              className="font-display font-semibold text-white mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Ready to build a predictable pipeline?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/80 mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Book a call. We&apos;ll assess your ICP, your current pipeline, and which tier makes sense for your business.
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
