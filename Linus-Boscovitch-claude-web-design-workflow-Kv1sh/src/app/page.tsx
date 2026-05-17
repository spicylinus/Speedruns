'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { HeroAnimations } from '@/components/motion/HeroAnimations'
import { StatCounter } from '@/components/motion/StatCounter'

const services = [
  {
    title: 'Web Design',
    description: 'Websites that work as hard as you do. Built to convert, not just to impress.',
    href: '/services/web-design',
  },
  {
    title: 'SEO',
    description: 'Rank for the keywords that bring in revenue, not vanity metrics.',
    href: '/services/seo',
  },
  {
    title: 'Lead Generation',
    description: 'Qualified prospects delivered to your inbox. No platform to learn.',
    href: '/services/lead-generation',
  },
]

const testimonials = [
  {
    quote: 'Social Linus transformed our online presence. We went from invisible to ranking page one in under 90 days.',
    name: 'Naveem Kumar',
    title: 'CEO, Kumar Technical Services',
  },
  {
    quote: 'The website redesign paid for itself within the first month. We\'re closing more deals online than we ever have.',
    name: 'Victor Montes',
    title: 'Owner, Montes Contracting',
  },
  {
    quote: 'Professional, fast, and they actually understand B2B. Not just a pretty website — it generates real leads.',
    name: 'Monique Inge',
    title: 'Managing Director, Inge Consulting Group',
  },
]

export default function HomePage() {
  return (
    <main>
      <HeroAnimations />

      {/* Section 1 — Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <p className="hero-animate eyebrow mb-6" style={{ opacity: 0, color: 'rgba(255,255,255,0.55)' }}>
            Web Design · SEO · Lead Generation — Atlanta &amp; The Southeast
          </p>
          <h1
            className="hero-animate font-display font-bold text-white mb-6 leading-none"
            style={{ fontSize: '72px', letterSpacing: '-0.04em', opacity: 0 }}
          >
            Your competitors are ranking.
            <br />
            You should be too.
          </h1>
          <p
            className="hero-animate mb-10 max-w-2xl"
            style={{ fontSize: '18px', lineHeight: '1.6', opacity: 0, color: 'rgba(255,255,255,0.75)' }}
          >
            We build websites that generate leads, run SEO that drives revenue, and deliver qualified prospects to B2B service companies where every deal matters.
          </p>
          <div className="hero-animate flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <Button href="/book-a-call" size="lg">Book a Call →</Button>
            <Button href="/results" variant="ghost" size="lg">See Our Results</Button>
          </div>
        </div>
      </section>

      {/* Section 2 — Social Proof Bar */}
      <section className="snap-section--short bg-void px-6 py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { value: 200, suffix: '+', label: 'Businesses Served' },
              { value: 37, suffix: '%', label: 'Avg Lead Increase' },
              { value: 15, suffix: '+', label: 'Years Experience' },
              { isText: true, displayText: 'ATL', label: 'Atlanta Based' },
            ].map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1} className="px-8 py-8 text-center first:pl-0 last:pr-0">
                <div className="stat-number text-cobalt mb-2">
                  <StatCounter
                    value={stat.value ?? 0}
                    suffix={stat.suffix}
                    isText={stat.isText}
                    displayText={stat.displayText}
                  />
                </div>
                <p className="eyebrow text-white/55">{stat.label}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Services Overview */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-4">What We Do</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-void mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Three services. One goal: more revenue.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="bg-frost border border-frost rounded-xl p-8 hover:shadow-lg transition-shadow group"
              >
                <h3
                  className="font-display font-medium text-void mb-3"
                  style={{ fontSize: '24px', letterSpacing: '-0.01em' }}
                >
                  {service.title}
                </h3>
                <p className="text-slate mb-6" style={{ fontSize: '15px', lineHeight: '1.65' }}>
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-cobalt text-sm font-medium group-hover:underline"
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Results Preview */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-4">Results</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-white mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Real businesses. Measurable outcomes.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimateIn delay={0.2}>
              <Link
                href="/results/creative-sources"
                className="block bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors group"
              >
                <p className="eyebrow text-white/55 mb-4">Commercial Lighting · Atlanta</p>
                <div
                  className="font-mono font-bold text-cobalt mb-3"
                  style={{ fontSize: '42px', letterSpacing: '-0.02em' }}
                >
                  Page 20 → Page 1
                </div>
                <p className="text-white/75 text-sm leading-relaxed">
                  Complete website redesign + SEO overhaul. Page one for every target keyword.
                </p>
                <p className="text-cobalt text-sm font-medium mt-4 group-hover:underline">Read case study →</p>
              </Link>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <Link
                href="/results/ecommerce-beauty-brand"
                className="block bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors group"
              >
                <p className="eyebrow text-white/55 mb-4">Beauty &amp; Personal Care · E-commerce</p>
                <div
                  className="font-mono font-bold text-cobalt mb-3"
                  style={{ fontSize: '42px', letterSpacing: '-0.02em' }}
                >
                  +37%
                </div>
                <p className="text-white/75 text-sm leading-relaxed">
                  Average order value increase in 30 days after site redesign.
                </p>
                <p className="text-cobalt text-sm font-medium mt-4 group-hover:underline">Read case study →</p>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Section 5 — Testimonials */}
      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <h2
              className="font-display font-semibold text-void mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              What clients say
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <p className="text-void mb-6" style={{ fontSize: '15px', lineHeight: '1.65' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-display font-semibold text-void text-sm">{t.name}</p>
                  <p className="text-slate text-sm mt-1">{t.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Final CTA */}
      <section className="snap-section bg-void flex flex-col justify-center items-center text-center px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <AnimateIn>
            <h2
              className="font-display font-semibold text-cobalt mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Stop leaving revenue on the table.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/75 mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Book a 15-minute call. We&apos;ll review your current site, your goals, and whether we&apos;re the right fit.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <Button href="/book-a-call" size="lg">Book a Call →</Button>
          </AnimateIn>
        </div>
      </section>
    </main>
  )
}
