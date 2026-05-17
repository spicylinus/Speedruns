import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Social Linus. Email, phone, or book a call directly.',
}

export default function ContactPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Contact</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              Let&apos;s talk.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              The fastest path is booking a call directly. If you prefer email, we respond within one business day.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16">
          <AnimateIn>
            <p className="eyebrow text-ember mb-8">Reach us directly</p>
            <div className="space-y-6 mb-12">
              {[
                { label: 'Email', value: 'hello@sociallinus.com', href: 'mailto:hello@sociallinus.com' },
                { label: 'Phone', value: '(404) 555-0100', href: 'tel:+14045550100' },
                { label: 'Location', value: 'Atlanta, GA', href: undefined },
              ].map((item) => (
                <div key={item.label}>
                  <p className="eyebrow text-cobalt mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-display font-medium text-void hover:text-cobalt transition-colors" style={{ fontSize: '18px' }}>{item.value}</a>
                  ) : (
                    <p className="font-display font-medium text-void" style={{ fontSize: '18px' }}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>
            <ContactForm />
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="bg-void rounded-2xl p-10 h-full flex flex-col">
              <p className="eyebrow text-ember mb-6">Fastest path forward</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Book a 15-minute call.
              </h2>
              <p className="mb-8 flex-1" style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
                We&apos;ll look at your current site, your market, and tell you honestly what&apos;s holding you back — no pitch, no pressure.
              </p>
              <div className="space-y-4">
                <Link href="/book-a-call" className="flex items-center justify-center font-medium rounded-xl transition-colors bg-cobalt hover:bg-cobalt-hover text-white px-8 py-4 text-base w-full">
                  Book a Call →
                </Link>
                <p className="eyebrow text-white/40 text-center">15 minutes · No commitment</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  )
}
