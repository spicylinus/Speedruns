import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { caseStudies, getCaseStudy } from '@/data/caseStudies'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) return {}
  const title = cs.anonymous ? `${cs.industry} Case Study` : `${cs.client} Case Study`
  return {
    title,
    description: `${cs.challenge} ${cs.heroMetric} ${cs.heroMetricLabel}.`,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  const displayName = cs.anonymous ? cs.industry : cs.client
  const industryLine = [cs.industry, cs.location].filter(Boolean).join(' · ')

  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">
              Case Study · {industryLine}{cs.anonymous && ' · Anonymized'}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              {displayName}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className={`font-mono font-bold mb-6 leading-none ${cs.status === 'in-progress' ? 'text-white/40' : 'text-cobalt'}`} style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.03em' }}>
              {cs.heroMetric}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <p className="max-w-xl" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              {cs.challenge}
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 items-start">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">The Challenge</p>
            <h2 className="font-display font-bold text-void mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              {cs.challenge}
            </h2>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              {cs.challengeDetail}
            </p>
            {cs.status === 'in-progress' && cs.inProgressNote && (
              <div className="mt-8 bg-frost border border-cobalt/20 rounded-2xl p-6">
                <p className="eyebrow text-cobalt mb-3">Engagement Status</p>
                <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.6' }}>{cs.inProgressNote}</p>
              </div>
            )}
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="rounded-2xl bg-void p-10">
              <p className="eyebrow text-white/55 mb-4">{cs.heroMetricLabel}</p>
              <p className="font-mono font-bold text-cobalt leading-none" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.03em' }}>
                {cs.heroMetric}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {cs.whatWeDid.length > 0 && (
        <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
          <div className="max-w-5xl mx-auto w-full">
            <AnimateIn><p className="eyebrow text-ember mb-6">What We Did</p></AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-display font-semibold text-void mb-16" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>The work, step by step.</h2>
            </AnimateIn>
            <div className="grid md:grid-cols-2 gap-4">
              {cs.whatWeDid.map((item, i) => (
                <AnimateIn className="bg-white rounded-2xl p-6 border border-white hover:border-cobalt/20 transition-colors">
                  <h3 className="font-display font-semibold text-void mb-2" style={{ fontSize: '17px' }}>{item.title}</h3>
                  <p className="text-slate" style={{ fontSize: '14px', lineHeight: '1.65' }}>{item.body}</p>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {cs.results.length > 0 && (
        <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
          <div className="max-w-5xl mx-auto w-full">
            <AnimateIn><p className="eyebrow text-ember mb-6">Results</p></AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-display font-semibold text-white mb-16" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>Numbers that changed the business.</h2>
            </AnimateIn>
            <div className={`grid gap-8 ${cs.results.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} mb-16`}>
              {cs.results.map((stat, i) => (
                <AnimateIn key={stat.label} delay={i * 0.1}>
                  <div className="border-t-2 border-cobalt pt-6">
                    <p className="font-mono font-bold text-cobalt mb-2" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1 }}>{stat.metric}</p>
                    <p className="eyebrow text-white/55">{stat.label}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {cs.testimonial && (
              <AnimateIn delay={0.3}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
                  <p className="font-display font-medium text-white mb-8" style={{ fontSize: '20px', lineHeight: '1.5', letterSpacing: '-0.01em' }}>
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cobalt/20 border border-cobalt/30 flex items-center justify-center shrink-0">
                      <span className="font-mono text-cobalt font-bold text-sm">{cs.testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-white text-sm">{cs.testimonial.name}</p>
                      <p className="text-white/55 text-sm">{cs.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>
        </section>
      )}

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(21,71,232,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-lg">
              <AnimateIn><p className="eyebrow text-ember mb-6">Your turn.</p></AnimateIn>
              <AnimateIn delay={0.1}><h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>See how we can do this for your business.</h2></AnimateIn>
              <AnimateIn delay={0.2}><p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>Book a 15-minute call. We&apos;ll review your current situation and show you where the opportunity is.</p></AnimateIn>
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
