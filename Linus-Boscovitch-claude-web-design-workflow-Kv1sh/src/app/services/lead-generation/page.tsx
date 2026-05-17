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
    num: '01',
    name: 'Lead Data',
    price: '$1,995',
    period: '/mo',
    description: 'Vetted, verified contact lists delivered monthly. You run the outreach.',
    features: ['Monthly curated prospect list', 'Verified contact data', 'ICP-matched targeting', 'Deliverability-checked emails', 'CRM-ready CSV format'],
    highlight: false,
  },
  {
    num: '02',
    name: 'Guided System',
    price: '$3,995',
    period: '/mo',
    description: 'Scored, segmented leads plus 10 hours/month of hands-on consulting.',
    features: ['Everything in Lead Data', 'Prospect scoring & segmentation', '10 hrs/month consulting', 'Sequence strategy & copy review', 'Monthly performance review'],
    highlight: true,
  },
  {
    num: '03',
    name: 'Full Service',
    price: '$9,000',
    period: '/mo',
    description: 'We run the entire outreach machine. You focus on closing.',
    features: ['Everything in Guided System', 'Outreach execution & management', 'A/B testing & optimization', 'Dedicated account manager', 'Weekly pipeline updates'],
    highlight: false,
  },
]

export default function LeadGenerationPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Lead Generation</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              Qualified Leads,<br />Delivered
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl mb-10" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              Your pipeline can&apos;t run on referrals alone. We put qualified buyers in your inbox every month.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}><Button href="/book-a-call" size="lg">Book a Call →</Button></AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">The Problem</p>
            <h2 className="font-display font-bold text-void mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              You can&apos;t scale referrals. You can&apos;t control when they come in.
            </h2>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Word-of-mouth got you here. It won&apos;t get you where you want to go. Referrals are unpredictable, slow, and impossible to forecast.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              To grow predictably, you need a system that generates qualified opportunities on demand.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="rounded-2xl bg-frost border border-cobalt/10 p-10">
              <p className="font-mono font-bold text-cobalt mb-2" style={{ fontSize: '52px', letterSpacing: '-0.03em', lineHeight: 1 }}>0</p>
              <p className="eyebrow text-slate mb-4">Pipeline opportunities you control</p>
              <p className="text-slate text-sm leading-relaxed">Referrals are great when they come. A lead generation system means you&apos;re not waiting.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Our Approach</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-display font-semibold text-void mb-12" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>A proprietary system built for B2B service businesses.</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Precision Targeting', body: 'We build an exact profile of your ideal buyer — industry, company size, role, geography, buying signals — then find them.' },
              { title: 'Vetted Contact Data', body: 'Every contact is verified before it reaches you. No bounces, no personal emails, no gatekeepers.' },
              { title: 'Personalized Outreach', body: 'Messages that don\'t feel like mass emails. Tailored to the buyer, relevant to their situation, timed for response.' },
            ].map((item, i) => (
              <AnimateIn className="bg-white rounded-2xl p-8">
                <h3 className="font-display font-semibold text-void mb-3" style={{ fontSize: '18px' }}>{item.title}</h3>
                <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.65' }}>{item.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Pricing</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-display font-semibold text-white mb-16" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>Three tiers. One goal.</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <AnimateIn>
                <p className="font-mono mb-4" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tier.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(21,71,232,1)' }}>{tier.num} — {tier.name}</p>
                <div className="flex items-end gap-1 mb-3">
                  <span className="font-mono font-bold text-white" style={{ fontSize: '36px', letterSpacing: '-0.02em', lineHeight: 1 }}>{tier.price}</span>
                  <span className="mb-1" style={{ fontSize: '13px', color: tier.highlight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)' }}>{tier.period}</span>
                </div>
                <p className="mb-6 flex-1" style={{ fontSize: '14px', lineHeight: '1.6', color: tier.highlight ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)' }}>{tier.description}</p>
                <ul className="space-y-2 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2" style={{ fontSize: '13px', color: tier.highlight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)' }}>
                      <span className={tier.highlight ? 'text-white' : 'text-cobalt'}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/book-a-call" className={`inline-flex items-center justify-center font-medium rounded-lg px-6 py-3 text-sm transition-colors ${tier.highlight ? 'bg-white text-cobalt hover:bg-frost' : 'border border-cobalt text-cobalt hover:bg-cobalt hover:text-white'}`}>
                  Book a Call →
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(21,71,232,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-lg">
              <AnimateIn><p className="eyebrow text-ember mb-6">Ready?</p></AnimateIn>
              <AnimateIn delay={0.1}><h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>Build a predictable pipeline.</h2></AnimateIn>
              <AnimateIn delay={0.2}><p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>We&apos;ll assess your ICP, your current pipeline, and which tier makes sense for your business.</p></AnimateIn>
            </div>
            <AnimateIn delay={0.3} className="flex flex-col items-start md:items-end gap-4 shrink-0">
              <Button href="/book-a-call" size="lg">Book a Call →</Button>
              <p className="eyebrow text-white/40">15 minutes · No commitment</p>
            </AnimateIn>
          </div>
        </div>
      </section>
    </main>
  )
}
