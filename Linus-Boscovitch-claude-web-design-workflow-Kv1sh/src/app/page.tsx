'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { HeroAnimations } from '@/components/motion/HeroAnimations'
import { StatCounter } from '@/components/motion/StatCounter'

const services = [
  {
    num: '01',
    title: 'Web Design',
    description: 'Conversion-first architecture. Every page built to turn visitors into inquiries — not just to look good on Behance.',
    stat: 'Avg 3× lead increase',
    href: '/services/web-design',
  },
  {
    num: '02',
    title: 'SEO',
    description: 'Rank for the terms buyers search when they have budget and no vendor. Not your business name — the category.',
    stat: '$197 diagnostic',
    href: '/services/seo',
  },
  {
    num: '03',
    title: 'Lead Generation',
    description: 'Vetted, verified B2B contacts delivered monthly. From raw data to full outreach execution — you choose the tier.',
    stat: 'From $1,995/mo',
    href: '/services/lead-generation',
  },
]

const stats = [
  { value: 200, suffix: '+', label: 'Businesses Served' },
  { value: 37, suffix: '%', label: 'Avg Lead Increase' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { isText: true, displayText: 'ATL', label: 'Atlanta Based' },
]

const testimonials = [
  {
    quote: 'Social Linus transformed our online presence. We went from invisible to ranking page one in under 90 days.',
    name: 'Naveem Kumar',
    title: 'CEO, Kumar Technical Services',
    featured: true,
  },
  {
    quote: 'The website redesign paid for itself within the first month. We\'re closing more deals online than we ever have.',
    name: 'Victor Montes',
    title: 'Owner, Montes Contracting',
    featured: false,
  },
  {
    quote: 'Professional, fast, and they actually understand B2B. Not just a pretty website — it generates real leads.',
    name: 'Monique Inge',
    title: 'Managing Director, Inge Consulting Group',
    featured: false,
  },
]

export default function HomePage() {
  return (
    <main>
      <HeroAnimations />

      {/* ── HERO ── */}
      <section
        className="snap-section bg-void relative overflow-hidden flex flex-col justify-between px-6 pt-24 pb-16"
      >
        {/* Depth layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 45%, rgba(21,71,232,0.14) 0%, transparent 70%), radial-gradient(ellipse 35% 40% at 10% 90%, rgba(255,77,28,0.08) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Main hero content */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
          <p
            className="hero-animate eyebrow mb-8"
            style={{ opacity: 0, color: 'rgba(255,255,255,0.55)' }}
          >
            Web Design · SEO · Lead Generation — Atlanta &amp; The Southeast
          </p>

          <h1
            className="hero-animate font-display font-bold text-white leading-none mb-8"
            style={{ fontSize: 'clamp(48px, 7vw, 80px)', letterSpacing: '-0.04em', opacity: 0 }}
          >
            Your competitors
            <br />
            are ranking.
            <br />
            <span style={{ color: 'var(--color-cobalt)' }}>You should be too.</span>
          </h1>

          <p
            className="hero-animate max-w-xl mb-10"
            style={{ fontSize: '18px', lineHeight: '1.6', opacity: 0, color: 'rgba(255,255,255,0.75)' }}
          >
            We build sites that generate leads, run SEO that drives revenue, and deliver
            qualified B2B prospects — for companies where every deal matters.
          </p>

          <div className="hero-animate flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
            <Button href="/book-a-call" size="lg">Book a Call →</Button>
            <Button href="/results" variant="ghost" size="lg">See Our Results</Button>
          </div>
        </div>

        {/* Stats bar — bottom of hero */}
        <div className="relative z-10 max-w-5xl mx-auto w-full mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={0.6 + i * 0.1} className="px-6 py-4 first:pl-0 last:pr-0">
                <div className="font-mono font-bold text-cobalt mb-1" style={{ fontSize: '30px', letterSpacing: '-0.02em' }}>
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

      {/* ── SERVICES — Editorial list ── */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between mb-16">
            <div>
              <AnimateIn>
                <p className="eyebrow text-ember mb-4">What We Do</p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2
                  className="font-display font-semibold text-void"
                  style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
                >
                  Three services.
                  <br />
                  One goal: more revenue.
                </h2>
              </AnimateIn>
            </div>
            <AnimateIn delay={0.2} className="hidden md:block">
              <Link href="/services" className="text-cobalt text-sm font-medium hover:underline">
                View all services →
              </Link>
            </AnimateIn>
          </div>

          <div className="border-t border-slate/10">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <Link
                  href={service.href}
                  className="group flex items-start gap-6 md:gap-10 py-8 border-b border-slate/10 hover:border-cobalt/25 transition-colors"
                >
                  <span
                    className="font-mono text-cobalt shrink-0 pt-1"
                    style={{ fontSize: '12px', letterSpacing: '0.1em' }}
                  >
                    {service.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <h3
                        className="font-display font-semibold text-void group-hover:text-cobalt transition-colors"
                        style={{ fontSize: '24px', letterSpacing: '-0.01em' }}
                      >
                        {service.title}
                      </h3>
                      <span className="font-mono text-slate/50 hidden md:block" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {service.stat}
                      </span>
                    </div>
                    <p className="text-slate" style={{ fontSize: '15px', lineHeight: '1.65', maxWidth: '600px' }}>
                      {service.description}
                    </p>
                  </div>
                  <span
                    className="text-cobalt text-xl shrink-0 mt-1 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between mb-16">
            <div>
              <AnimateIn>
                <p className="eyebrow text-ember mb-4">Results</p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2
                  className="font-display font-semibold text-white"
                  style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
                >
                  Real businesses.
                  <br />
                  Measurable outcomes.
                </h2>
              </AnimateIn>
            </div>
            <AnimateIn delay={0.2} className="hidden md:block">
              <Link href="/results" className="text-cobalt text-sm font-medium hover:underline">
                All case studies →
              </Link>
            </AnimateIn>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                href: '/results/creative-sources',
                industry: 'Commercial Lighting · Atlanta',
                metric: 'Page 20 → Page 1',
                body: 'Full website rebuild + SEO overhaul. Page one for every target keyword in 90 days.',
                delay: 0.2,
              },
              {
                href: '/results/ecommerce-beauty-brand',
                industry: 'Beauty & Personal Care · E-commerce',
                metric: '+37%',
                body: 'Average order value increase in 30 days. Same traffic, better site.',
                delay: 0.3,
              },
            ].map((cs) => (
              <AnimateIn key={cs.href} delay={cs.delay}>
                <Link
                  href={cs.href}
                  className="group block h-full bg-white/5 border border-white/8 rounded-2xl p-8 hover:bg-white/8 hover:border-cobalt/30 transition-all"
                >
                  <p className="eyebrow text-white/55 mb-6">{cs.industry}</p>
                  <div
                    className="font-mono font-bold text-cobalt mb-4 leading-none"
                    style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '-0.02em' }}
                  >
                    {cs.metric}
                  </div>
                  <p className="text-white/75 mb-6" style={{ fontSize: '15px', lineHeight: '1.65' }}>
                    {cs.body}
                  </p>
                  <span className="text-cobalt text-sm font-medium group-hover:underline">
                    Read case study →
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-4">What Clients Say</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-display font-semibold text-void mb-16"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Built on results,
              <br />
              backed by people.
            </h2>
          </AnimateIn>

          {/* Featured testimonial */}
          <AnimateIn delay={0.15}>
            <div className="bg-void rounded-2xl p-10 mb-4">
              <p
                className="font-display font-medium text-white mb-8"
                style={{ fontSize: '22px', lineHeight: '1.4', letterSpacing: '-0.01em' }}
              >
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full bg-cobalt/20 border border-cobalt/30 flex items-center justify-center"
                  aria-hidden
                >
                  <span className="font-mono text-cobalt font-bold text-sm">
                    {testimonials[0].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-sm">{testimonials[0].name}</p>
                  <p className="text-white/55 text-sm">{testimonials[0].title}</p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Secondary testimonials */}
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.slice(1).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: 'easeOut' }}
                className="bg-white rounded-2xl p-8"
              >
                <p className="text-void mb-6" style={{ fontSize: '15px', lineHeight: '1.65' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full bg-frost border border-cobalt/20 flex items-center justify-center shrink-0"
                    aria-hidden
                  >
                    <span className="font-mono text-cobalt font-bold" style={{ fontSize: '11px' }}>
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-void text-sm">{t.name}</p>
                    <p className="text-slate text-sm">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — Split layout ── */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(21,71,232,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-lg">
              <AnimateIn>
                <p className="eyebrow text-ember mb-6">Ready?</p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2
                  className="font-display font-bold text-white mb-6"
                  style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}
                >
                  Stop leaving
                  <br />
                  revenue on the table.
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
                  Book a 15-minute call. We&apos;ll look at your current site, your market,
                  and tell you exactly what&apos;s holding you back — no pitch.
                </p>
              </AnimateIn>
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
