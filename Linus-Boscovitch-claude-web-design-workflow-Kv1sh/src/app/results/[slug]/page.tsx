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
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">
              Case Study · {industryLine}
              {cs.anonymous && ' · Anonymized by request'}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              {displayName}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div
              className={`font-mono font-bold mb-8 ${cs.status === 'in-progress' ? 'text-white/55' : 'text-cobalt'}`}
              style={{ fontSize: '56px', letterSpacing: '-0.02em' }}
            >
              {cs.heroMetric}
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <p className="max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              {cs.challenge}
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
              {cs.challenge}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              {cs.challengeDetail}
            </p>
          </AnimateIn>

          {cs.status === 'in-progress' && cs.inProgressNote && (
            <AnimateIn delay={0.3} className="mt-10">
              <div className="bg-frost border border-cobalt/20 rounded-xl p-6">
                <p className="eyebrow text-cobalt mb-3">Engagement Status</p>
                <p className="text-slate" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  {cs.inProgressNote}
                </p>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* What We Did */}
      {cs.whatWeDid.length > 0 && (
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
                The work, step by step.
              </h2>
            </AnimateIn>
            <div className="grid md:grid-cols-2 gap-6">
              {cs.whatWeDid.map((item, i) => (
                <AnimateIn key={item.title} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-6">
                    <h3
                      className="font-display font-medium text-void mb-3"
                      style={{ fontSize: '18px' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.65' }}>
                      {item.body}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {cs.results.length > 0 && (
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
                Numbers that changed the business.
              </h2>
            </AnimateIn>
            <div className={`grid gap-8 ${cs.results.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {cs.results.map((stat, i) => (
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

            {cs.testimonial && (
              <AnimateIn delay={0.4} className="mt-16">
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <p className="text-white/75 text-lg italic mb-4" style={{ lineHeight: '1.6' }}>
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </p>
                  <p className="font-display font-semibold text-white text-sm">{cs.testimonial.name}</p>
                  <p className="text-white/55 text-sm">{cs.testimonial.role}</p>
                </div>
              </AnimateIn>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="snap-section--short bg-cobalt px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2
              className="font-display font-semibold text-white mb-6"
              style={{ fontSize: '28px', letterSpacing: '-0.02em' }}
            >
              See how we can do this for your business.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/80 mb-8" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Book a 15-minute call. We&apos;ll review your current situation and show you where the opportunity is.
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
