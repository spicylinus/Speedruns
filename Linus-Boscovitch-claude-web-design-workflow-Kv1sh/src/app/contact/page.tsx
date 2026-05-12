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
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Contact</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Contact
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              The fastest way to get started is to book a 15-minute call. If you prefer email, we respond within one business day.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Contact Content */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left — Contact Info + Form */}
            <AnimateIn>
              <div>
                <h2
                  className="font-display font-semibold text-void mb-8"
                  style={{ fontSize: '24px', letterSpacing: '-0.01em' }}
                >
                  Get in touch
                </h2>
                <div className="space-y-4 mb-10">
                  <div>
                    <p className="eyebrow text-cobalt mb-1">Email</p>
                    <a href="mailto:hello@sociallinus.com" className="text-void hover:text-cobalt transition-colors">
                      hello@sociallinus.com
                    </a>
                  </div>
                  <div>
                    <p className="eyebrow text-cobalt mb-1">Phone</p>
                    <a href="tel:+14045550100" className="text-void hover:text-cobalt transition-colors">
                      (404) 555-0100
                    </a>
                  </div>
                  <div>
                    <p className="eyebrow text-cobalt mb-1">Location</p>
                    <p className="text-void">Atlanta, GA</p>
                  </div>
                </div>

                <ContactForm />
              </div>
            </AnimateIn>

            {/* Right — Book a Call */}
            <AnimateIn delay={0.2}>
              <div className="bg-void rounded-2xl p-10 h-full flex flex-col justify-center text-center">
                <p className="eyebrow text-cobalt mb-6">Fastest Path Forward</p>
                <h2
                  className="font-display font-semibold text-white mb-4"
                  style={{ fontSize: '28px', letterSpacing: '-0.02em' }}
                >
                  Book a 15-minute call
                </h2>
                <p className="text-white/70 mb-8" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  Pick a time that works. We&apos;ll review your current situation and tell you honestly whether we can help.
                </p>
                <Link
                  href="/book-a-call"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-colors bg-cobalt hover:bg-cobalt-hover text-white px-8 py-4 text-base"
                >
                  Book a Call →
                </Link>
                <p className="text-white/30 text-sm mt-4">No commitment. 15 minutes.</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </main>
  )
}
