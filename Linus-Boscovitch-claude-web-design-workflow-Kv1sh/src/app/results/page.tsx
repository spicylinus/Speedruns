import type { Metadata } from 'next'
import Link from 'next/link'

import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'
import { caseStudies } from '@/data/caseStudies'

export const metadata: Metadata = {
  title: 'Results',
  description: 'Real results from real B2B businesses. Case studies in web design, SEO, and lead generation from Social Linus.',
}

export default function ResultsPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Results</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              Real businesses.
              <br />
              Measurable outcomes.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              Every engagement starts with a clear goal and ends with numbers you can verify. Here&apos;s what that looks like.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="border-t border-slate/10">
            {caseStudies.map((cs, i) => {
              const displayName = cs.anonymous ? cs.industry : cs.client
              const industryLine = [cs.industry, cs.location].filter(Boolean).join(' · ')
              const isAvailable = cs.status === 'published'
              return (
                <AnimateIn
                >
                  {isAvailable ? (
                    <Link href={`/results/${cs.slug}`} className="group flex flex-col md:flex-row items-start md:items-center gap-6 py-10 border-b border-slate/10 hover:border-cobalt/25 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="eyebrow text-cobalt mb-2">{industryLine}</p>
                        <h2 className="font-display font-semibold text-void mb-2" style={{ fontSize: '24px', letterSpacing: '-0.01em' }}>{displayName}</h2>
                        <p className="text-slate text-sm leading-relaxed max-w-lg">{cs.challenge}</p>
                      </div>
                      <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                        <p className="font-mono font-bold text-cobalt" style={{ fontSize: '36px', letterSpacing: '-0.02em', lineHeight: 1 }}>{cs.heroMetric}</p>
                        <p className="eyebrow text-slate">{cs.heroMetricLabel}</p>
                        <p className="text-cobalt text-sm font-medium group-hover:underline mt-1">Read case study →</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 py-10 border-b border-slate/10">
                      <div className="flex-1 min-w-0">
                        <p className="eyebrow text-slate mb-2">{industryLine}</p>
                        <h2 className="font-display font-semibold text-void mb-2" style={{ fontSize: '24px', letterSpacing: '-0.01em' }}>{displayName}</h2>
                        <p className="text-slate text-sm leading-relaxed max-w-lg">{cs.challenge}</p>
                      </div>
                      <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                        <p className="font-mono font-bold text-slate/40" style={{ fontSize: '28px', letterSpacing: '-0.02em', lineHeight: 1 }}>In Progress</p>
                        <p className="eyebrow text-slate/40">Case study pending</p>
                      </div>
                    </div>
                  )}
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(21,71,232,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-lg">
              <AnimateIn><p className="eyebrow text-ember mb-6">Your turn.</p></AnimateIn>
              <AnimateIn delay={0.1}><h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>See how this looks for your business.</h2></AnimateIn>
              <AnimateIn delay={0.2}><p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>Book a 15-minute call. We&apos;ll show you where the opportunity is in your specific market.</p></AnimateIn>
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
