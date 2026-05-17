import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web design, SEO, and lead generation for B2B service companies in Atlanta and the Southeast.',
}

const services = [
  {
    num: '01',
    title: 'Web Design',
    description: 'Most business websites look fine and generate nothing. We build sites with conversion-first architecture — every page structured to turn visitors into inquiries.',
    proof: 'Page 20 → Page 1',
    href: '/services/web-design',
    dark: true,
    bg: 'bg-void',
  },
  {
    num: '02',
    title: 'SEO',
    description: 'Ranking for your business name isn\'t SEO. We target the keywords your buyers search when they have budget and no vendor — technical audits, keyword strategy, local search.',
    proof: '+340% traffic in 90 days',
    href: '/services/seo',
    dark: false,
    bg: 'bg-white',
  },
  {
    num: '03',
    title: 'Lead Generation',
    description: 'You can\'t scale referrals. We identify your ideal buyers, verify the contacts, and deliver them to your inbox — from raw data to full outreach execution.',
    proof: 'From $1,995/month',
    href: '/services/lead-generation',
    dark: false,
    bg: 'bg-frost',
  },
]

export default function ServicesPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">Services</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-8"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}
            >
              We build.
              <br />
              We rank.
              <br />
              We deliver.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              Three services built to compound. A better website ranks better. Better rankings bring qualified traffic. Lead generation captures the buyers who aren&apos;t searching yet.
            </p>
          </AnimateIn>
        </div>
      </section>

      {services.map((s) => (
        <section key={s.num} className={`snap-section ${s.bg} flex flex-col justify-center px-6 py-24`}>
          <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p
                className="font-mono font-bold mb-2 leading-none"
                style={{ fontSize: '80px', letterSpacing: '-0.04em', color: s.dark ? 'rgba(21,71,232,0.18)' : 'rgba(21,71,232,0.1)' }}
              >
                {s.num}
              </p>
              <h2
                className={`font-display font-bold mb-6 ${s.dark ? 'text-white' : 'text-void'}`}
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}
              >
                {s.title}
              </h2>
              <p
                className="mb-8"
                style={{ fontSize: '18px', lineHeight: '1.6', color: s.dark ? 'rgba(255,255,255,0.75)' : 'var(--color-slate)' }}
              >
                {s.description}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link href={s.href} className="text-cobalt font-display font-semibold inline-flex items-center gap-2 group text-base">
                  Explore service <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <span className="eyebrow" style={{ color: s.dark ? 'rgba(255,255,255,0.35)' : 'var(--color-slate)', opacity: 0.6 }}>
                  {s.proof}
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <Link href={s.href} className="block group">
                <div
                  className={`rounded-2xl flex items-center justify-center border transition-all ${s.dark ? 'bg-white/3 border-white/8 group-hover:border-cobalt/30' : 'bg-void/3 border-slate/10 group-hover:border-cobalt/25 group-hover:bg-frost'}`}
                  style={{ aspectRatio: '4/3' }}
                >
                  <div className="text-center px-8">
                    <p className="font-mono font-bold text-cobalt mb-2" style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {s.proof.split(' ').slice(0, 2).join(' ')}
                    </p>
                    <p className="eyebrow" style={{ color: s.dark ? 'rgba(255,255,255,0.35)' : 'var(--color-slate)' }}>
                      Client result
                    </p>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          </div>
        </section>
      ))}

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(21,71,232,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-lg">
              <AnimateIn><p className="eyebrow text-ember mb-6">Ready?</p></AnimateIn>
              <AnimateIn delay={0.1}>
                <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>
                  Not sure which service fits?
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
                  Book a 15-minute call. We&apos;ll tell you honestly what will move the needle fastest for your business.
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
