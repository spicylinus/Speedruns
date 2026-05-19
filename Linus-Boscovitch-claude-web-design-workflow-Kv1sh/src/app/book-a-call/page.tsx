import type { Metadata } from 'next'
import { AnimateIn } from '@/components/motion/AnimateIn'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Book a 15-minute call with Social Linus. No pitch — just an honest look at your situation.',
}

export default function BookACallPage() {
  return (
    <main className="min-h-screen bg-void flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full text-center mb-12">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Schedule</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Let&apos;s Talk
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Pick a time that works. 15 minutes. No pitch — just an honest look at your situation.
            </p>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.3} className="w-full max-w-3xl">
          <div
            className="bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center"
            style={{ minHeight: '500px', padding: '60px 40px' }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-cobalt/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cobalt text-2xl">📅</span>
              </div>
              <p className="eyebrow text-cobalt mb-3">Calendly Embed</p>
              <p
                className="font-heading font-semibold text-white mb-4"
                style={{ fontSize: '24px', letterSpacing: '-0.01em' }}
              >
                Scheduling Calendar
              </p>
              <p className="text-white/50 text-sm max-w-md" style={{ lineHeight: '1.6' }}>
                The Calendly scheduling widget will be embedded here. To configure: replace this placeholder with your Calendly inline embed script or use a Next.js-compatible Calendly component.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors bg-cobalt hover:bg-cobalt-hover text-white px-8 py-4 text-base mt-4"
            >
              Open Calendly →
            </a>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.4} className="mt-12 text-center">
          <p className="text-white/30 text-sm">
            Prefer email?{' '}
            <a href="mailto:hello@sociallinus.com" className="text-white/50 hover:text-white transition-colors underline">
              hello@sociallinus.com
            </a>
          </p>
        </AnimateIn>
      </div>
    </main>
  )
}
