import type { Metadata } from 'next'
import { AnimateIn } from '@/components/motion/AnimateIn'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Book a 15-minute call with Social Linus. No pitch — just an honest look at your situation.',
}

export default function BookACallPage() {
  return (
    <main className="min-h-screen bg-void relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 55% at 80% 45%, rgba(21,71,232,0.13) 0%, transparent 70%), radial-gradient(ellipse 30% 40% at 15% 85%, rgba(255,77,28,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12">
            <AnimateIn>
              <p className="eyebrow text-ember mb-6">Book a Call</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
                Let&apos;s Talk
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
                Pick a time that works. 15 minutes. No pitch — just an honest look at your situation.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.3}>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden" style={{ minHeight: '520px' }}>
              <div className="flex flex-col items-center justify-center h-full p-16 text-center" style={{ minHeight: '520px' }}>
                <div className="w-16 h-16 rounded-full bg-cobalt/20 border border-cobalt/30 flex items-center justify-center mb-6">
                  <span style={{ fontSize: '24px' }}>📅</span>
                </div>
                <p className="eyebrow text-cobalt mb-4">Calendly Embed</p>
                <p className="font-display font-semibold text-white mb-3" style={{ fontSize: '22px', letterSpacing: '-0.01em' }}>
                  Scheduling Calendar
                </p>
                <p className="text-white/55 text-sm max-w-sm leading-relaxed mb-8">
                  Replace this block with your Calendly inline embed code. Paste the Calendly widget script here to enable direct booking.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center justify-center font-medium rounded-xl transition-colors bg-cobalt hover:bg-cobalt-hover text-white px-8 py-4 text-base"
                >
                  Open Calendly →
                </a>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.4} className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              Prefer email?{' '}
              <a href="mailto:hello@sociallinus.com" className="text-white/55 hover:text-white transition-colors underline">
                hello@sociallinus.com
              </a>
            </p>
          </AnimateIn>
        </div>
      </div>
    </main>
  )
}
