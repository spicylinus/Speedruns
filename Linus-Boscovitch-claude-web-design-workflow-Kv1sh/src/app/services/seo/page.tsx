import type { Metadata } from 'next'
import Link from 'next/link'

import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'SEO That Ranks You for the Keywords That Matter',
  description: 'Technical SEO, keyword strategy, and local search for B2B service companies in Atlanta. Revenue-focused SEO, not vanity metrics.',
}

const pillars = [
  { title: 'Technical Audit', body: 'Every crawl error, speed issue, and structural problem holding your rankings back — found and fixed.' },
  { title: 'Keyword Strategy', body: 'We map buyer intent to search volume, targeting terms that signal purchase readiness.' },
  { title: 'On-Page Optimization', body: 'Every target page optimized: title tags, headers, content structure, internal links.' },
  { title: 'Local SEO', body: 'Google Business Profile, local citations, and geo-targeted content for your market.' },
  { title: 'Content Strategy', body: 'Topic clusters built around your service areas. Content that ranks and converts.' },
  { title: 'Reporting', body: 'Monthly reporting on rankings, traffic, and — most importantly — leads generated.' },
]

export default function SeoPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">SEO</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              SEO That Ranks You<br />for the Keywords<br />That Matter
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl mb-10" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              Ranking for your business name isn&apos;t SEO. We get you in front of buyers actively searching for what you sell.
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
              Ranking for your business name isn&apos;t SEO.
            </h2>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Most businesses rank for their own name. That&apos;s just having a website. Real SEO means showing up when someone who&apos;s never heard of you searches for the service you provide.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              If you&apos;re not on page one for your core services, you&apos;re invisible to buyers who are actively looking.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="rounded-2xl bg-frost border border-cobalt/10 p-10">
              <p className="font-mono font-bold text-cobalt mb-2" style={{ fontSize: '52px', letterSpacing: '-0.03em', lineHeight: 1 }}>Pg 20</p>
              <p className="eyebrow text-slate mb-4">Where most businesses start</p>
              <p className="text-slate text-sm leading-relaxed">Page 20 is effectively invisible. The goal isn&apos;t to climb a few spots — it&apos;s to be on page one for terms your buyers actually use.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Our Approach</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-display font-semibold text-void mb-16" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>Six pillars. One goal: organic revenue.</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-4">
            {pillars.map((item, i) => (
              <AnimateIn className="bg-white rounded-2xl p-6 border border-white hover:border-cobalt/20 transition-colors">
                <h3 className="font-display font-semibold text-void mb-2" style={{ fontSize: '17px' }}>{item.title}</h3>
                <p className="text-slate" style={{ fontSize: '14px', lineHeight: '1.65' }}>{item.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <div className="border border-white/10 rounded-2xl p-10 text-center">
              <p className="eyebrow text-ember mb-6">SEO Diagnostic</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em' }}>
                $197. Find 5 revenue-impacting issues — or you don&apos;t pay.
              </h2>
              <p className="mb-8" style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 2rem' }}>
                We audit your site, your competitors, and your keyword landscape. You get a written report with specific, ranked fixes. If we don&apos;t find at least 5 issues directly impacting your revenue, the diagnostic is free.
              </p>
              <Button href="/book-a-call" size="lg">Book Your SEO Diagnostic →</Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section--short bg-frost px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <Link href="/results/creative-sources" className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-void rounded-2xl p-10">
              <div>
                <p className="eyebrow text-white/55 mb-3">Creative Sources · Commercial Lighting · Atlanta</p>
                <p className="font-display font-semibold text-white mb-2" style={{ fontSize: '20px' }}>+340% organic traffic in 90 days. Page one for every target keyword.</p>
                <p className="text-cobalt text-sm font-medium group-hover:underline">Read the case study →</p>
              </div>
              <p className="font-mono font-bold text-cobalt shrink-0" style={{ fontSize: '42px', letterSpacing: '-0.02em', lineHeight: 1 }}>+340%</p>
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
              <AnimateIn delay={0.1}><h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>Rank for the searches that matter.</h2></AnimateIn>
              <AnimateIn delay={0.2}><p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>Start with the $197 diagnostic. Know exactly where you stand before committing to anything.</p></AnimateIn>
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
