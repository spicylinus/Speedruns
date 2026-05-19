import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web design, SEO, and lead generation services for B2B service companies in Atlanta and the Southeast.',
}

const services = [
  {
    label: 'Web Design',
    headline: 'Websites built to convert.',
    body: 'We design and build sites that turn visitors into inquiries. Every page is architected for conversion, optimized for search, and built to load fast on any device.',
    href: '/services/web-design',
    bg: 'bg-void',
    textColor: 'text-white',
    subColor: 'text-white/70',
    eyebrowColor: 'text-cobalt',
    cta: 'Start a Web Design Project →',
    cardBg: 'bg-white/5 border border-white/10',
    numColor: 'text-cobalt',
  },
  {
    label: 'SEO',
    headline: 'Rank for keywords that bring revenue.',
    body: 'We run technical audits, keyword strategy, on-page optimization, and local SEO — focused entirely on search terms your buyers actually use when they have budget.',
    href: '/services/seo',
    bg: 'bg-white',
    textColor: 'text-void',
    subColor: 'text-slate',
    eyebrowColor: 'text-cobalt',
    cta: 'Get an SEO Diagnostic →',
    cardBg: 'bg-void/5 border border-void/10',
    numColor: 'text-cobalt',
  },
  {
    label: 'Lead Generation',
    headline: 'Qualified prospects, delivered.',
    body: 'Stop waiting on referrals. We identify your ideal buyers, build targeted outreach, and put decision-makers in your inbox — so your pipeline is always moving.',
    href: '/services/lead-generation',
    bg: 'bg-frost',
    textColor: 'text-void',
    subColor: 'text-slate',
    eyebrowColor: 'text-cobalt',
    cta: 'See Lead Gen Pricing →',
    cardBg: 'bg-white border border-white/60',
    numColor: 'text-cobalt',
  },
]

export default function ServicesPage() {
  return (
    <main>
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Services</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              We build. We rank. We deliver.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Three services working together. Each one designed to move the number that matters most to your business.
            </p>
          </AnimateIn>
        </div>
      </section>

      {services.map((service, i) => (
        <section key={service.label} className={`snap-section ${service.bg} flex flex-col justify-center px-6 py-24`}>
          <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
            <AnimateIn delay={0.1}>
              <p className={`eyebrow ${service.eyebrowColor} mb-4`}>{service.label}</p>
              <h2
                className={`font-heading font-semibold ${service.textColor} mb-6`}
                style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
              >
                {service.headline}
              </h2>
              <p className={`${service.subColor} mb-8`} style={{ fontSize: '18px', lineHeight: '1.6' }}>
                {service.body}
              </p>
              <Button href={service.href} size="lg">
                {service.cta}
              </Button>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <div
                className={`rounded-2xl aspect-video flex items-center justify-center ${service.cardBg}`}
              >
                <span className={`font-heading font-bold ${service.numColor} opacity-20`} style={{ fontSize: '96px' }}>
                  0{i + 1}
                </span>
              </div>
            </AnimateIn>
          </div>
        </section>
      ))}
    </main>
  )
}
