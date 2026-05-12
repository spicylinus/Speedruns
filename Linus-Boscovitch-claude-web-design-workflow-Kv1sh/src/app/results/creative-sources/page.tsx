import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Creative Sources Case Study — Page 20 to Page 1',
  description: 'How Social Linus took Creative Sources from invisible to page one for every target keyword in 90 days.',
}

export default function CreativeSourcesCaseStudyPage() {
  return (
    <main>
      {/* Header */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Case Study · Commercial Lighting · Atlanta</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Creative Sources
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div
              className="font-mono font-bold text-cobalt mb-8"
              style={{ fontSize: '56px', letterSpacing: '-0.02em' }}
            >
              Page 20 → Page 1
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <p className="text-white/70 max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              From invisible to page one for every target keyword — in under 90 days.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Challenge */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">The Challenge</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-void mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Invisible online despite 12 years in business.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Creative Sources had over a decade of experience in commercial lighting — a legitimate, established business with a strong track record. Their problem: no organic traffic, no search visibility, and direct competition with national brands on local Google searches.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              When potential clients searched for commercial lighting services in Atlanta, Creative Sources didn&apos;t appear. Not on page one. Not on page two. Not in the local pack. They were functionally invisible to anyone who hadn&apos;t already heard of them.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* What We Did */}
      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">What We Did</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-void mb-12"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              A complete rebuild — architecture first, then SEO.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'New Website Architecture', body: 'Rebuilt site structure from the ground up. Separate, optimized pages for each service and market segment.' },
              { title: 'Targeted Keyword Strategy', body: 'Identified the commercial lighting search terms that buyers in Atlanta actually use with purchase intent.' },
              { title: 'On-Page SEO at Scale', body: 'Fully optimized 40+ target pages — title tags, headers, content, internal linking, structured data.' },
              { title: 'Local SEO Optimization', body: 'Google Business Profile overhaul, local citation building, and geo-targeted content for the Atlanta market.' },
              { title: 'Content Calendar', body: 'Developed a content plan targeting informational searches that draw buyers in the commercial lighting buying cycle.' },
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
            <p className="eyebrow text-cobalt mb-6">Results</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-white mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Numbers that changed the business.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: 'Page 20 → Page 1', label: 'For every target keyword' },
              { metric: '+340%', label: 'Organic traffic in 90 days' },
              { metric: '40+', label: 'Pages fully optimized' },
            ].map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div
                    className="font-mono font-bold text-cobalt mb-2"
                    style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
                  >
                    {stat.metric}
                  </div>
                  <p className="eyebrow text-white/50">{stat.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={0.4} className="mt-16">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-white/80 text-lg italic mb-4" style={{ lineHeight: '1.6' }}>
                &ldquo;We&apos;ve been in business for over a decade and never ranked for anything. Now we&apos;re getting calls from companies we&apos;ve never met who found us on Google. That didn&apos;t happen before.&rdquo;
              </p>
              <p className="font-display font-semibold text-white text-sm">Creative Sources</p>
              <p className="text-white/50 text-sm">Commercial Lighting, Atlanta GA</p>
            </div>
          </AnimateIn>
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
              See how we can do this for your business.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/80 mb-8" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Book a 15-minute call. We&apos;ll review your current site and show you exactly where the opportunity is.
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
