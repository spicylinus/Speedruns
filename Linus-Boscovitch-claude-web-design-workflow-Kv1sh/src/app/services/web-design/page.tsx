import type { Metadata } from 'next'
import Link from 'next/link'

import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Web Design That Drives Revenue',
  description: 'B2B web design built to convert. Conversion-focused architecture, SEO-ready, mobile-first for service companies in Atlanta.',
}

const approach = [
  { title: 'Conversion Architecture', body: 'Every page has a purpose and a path. We structure content so visitors know exactly what to do next.' },
  { title: 'SEO-Ready Foundation', body: 'Technical SEO built in from day one — proper structure, fast loads, clean code. Not bolted on after.' },
  { title: 'Mobile-First', body: 'Over 60% of B2B research happens on mobile. Your site works perfectly on every screen size.' },
  { title: 'Performance', body: 'Sub-2-second load times. Speed is a ranking factor and a conversion factor.' },
]

const process = [
  { num: '01', title: 'Discovery', body: 'Your buyers, your competitors, what makes someone choose you.' },
  { num: '02', title: 'Design', body: 'Wireframes before visuals. Every layout decision grounded in conversion.' },
  { num: '03', title: 'Build', body: 'Clean code, fast loads, mobile-first on a stack that\'s easy to update.' },
  { num: '04', title: 'Launch', body: 'QA across devices. Analytics live. SEO foundations set before go-live.' },
  { num: '05', title: 'Optimize', body: 'We don\'t disappear after launch. Data informs what we improve next.' },
]

export default function WebDesignPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Web Design</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              Web Design That<br />Drives Revenue
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl mb-10" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              A website that doesn&apos;t generate leads is an expense. We build sites that work as hard as you do.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}><Button href="/book-a-call" size="lg">Start a Project →</Button></AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">The Problem</p>
            <h2 className="font-display font-bold text-void mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              Most business websites are digital business cards.
            </h2>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              They list services, have a contact page, and look decent on desktop. But they don&apos;t rank, they don&apos;t convert, and they don&apos;t explain why someone should choose you.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              If your site isn&apos;t generating inquiries every week, that&apos;s a fixable problem.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="rounded-2xl bg-frost border border-cobalt/10 p-10">
              <p className="font-mono font-bold text-cobalt mb-2" style={{ fontSize: '52px', letterSpacing: '-0.03em', lineHeight: 1 }}>0</p>
              <p className="eyebrow text-slate mb-4">Leads from your site last month</p>
              <p className="text-slate text-sm leading-relaxed">If this number is lower than it should be, site architecture is the most likely cause. We fix that.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Our Approach</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-display font-semibold text-void mb-16" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>Built to convert from the first click.</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-4">
            {approach.map((item, i) => (
              <AnimateIn className="bg-white rounded-2xl p-8 border border-white hover:border-cobalt/20 transition-colors">
                <h3 className="font-display font-semibold text-void mb-3" style={{ fontSize: '18px' }}>{item.title}</h3>
                <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.65' }}>{item.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Who It&apos;s For</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-display font-semibold text-void mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              Built for businesses where one new client covers the investment.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-slate mb-12" style={{ fontSize: '18px', lineHeight: '1.6', maxWidth: '640px' }}>
              If your average client is worth $10K or more, a site that converts costs you nothing.
            </p>
          </AnimateIn>
          <div className="border-t border-slate/10">
            {['B2B Service Companies', 'Contractors & Trades', 'Professional Services'].map((label, i) => (
              <AnimateIn className="flex gap-8 py-6 border-b border-slate/10">
                <span className="font-mono text-cobalt shrink-0 pt-1" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>0{i + 1}</span>
                <p className="font-display font-semibold text-void" style={{ fontSize: '18px' }}>{label}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">The Process</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-display font-semibold text-white mb-16" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>Five steps from strategy to live site.</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-5 gap-6">
            {process.map((step, i) => (
              <AnimateIn>
                <p className="font-mono text-cobalt mb-3" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>{step.num}</p>
                <p className="font-display font-semibold text-white mb-2" style={{ fontSize: '16px' }}>{step.title}</p>
                <p className="text-white/55" style={{ fontSize: '13px', lineHeight: '1.6' }}>{step.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section--short bg-frost px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <Link href="/results/creative-sources" className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-void rounded-2xl p-10">
              <div>
                <p className="eyebrow text-white/55 mb-3">Creative Sources · Commercial Lighting · Atlanta</p>
                <p className="font-display font-semibold text-white mb-2" style={{ fontSize: '20px' }}>Complete redesign + SEO. Page one for every target keyword.</p>
                <p className="text-cobalt text-sm font-medium group-hover:underline">Read the case study →</p>
              </div>
              <p className="font-mono font-bold text-cobalt shrink-0" style={{ fontSize: '42px', letterSpacing: '-0.02em', lineHeight: 1 }}>Page 20 → 1</p>
            </Link>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(21,71,232,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-lg">
              <AnimateIn><p className="eyebrow text-ember mb-6">Ready?</p></AnimateIn>
              <AnimateIn delay={0.1}><h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>Build a site that generates leads.</h2></AnimateIn>
              <AnimateIn delay={0.2}><p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>We&apos;ll audit your current site and show you exactly what&apos;s holding it back.</p></AnimateIn>
            </div>
            <AnimateIn delay={0.3} className="flex flex-col items-start md:items-end gap-4 shrink-0">
              <Button href="/book-a-call" size="lg">Start a Project →</Button>
              <p className="eyebrow text-white/40">15 minutes · No commitment</p>
            </AnimateIn>
          </div>
        </div>
      </section>
    </main>
  )
}
