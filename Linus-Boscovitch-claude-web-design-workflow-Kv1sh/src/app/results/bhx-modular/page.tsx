import type { Metadata } from 'next'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'BHX Modular Case Study',
  description: 'BHX Modular case study — website redesign and B2B lead generation for a modular construction company.',
}

export default function BhxModularPage() {
  return (
    <main>
      {/* Header */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Case Study · Modular Construction</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              BHX Modular
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div
              className="font-mono font-bold text-white/40 mb-8"
              style={{ fontSize: '42px', letterSpacing: '-0.02em' }}
            >
              In Progress
            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <p className="text-white/70 max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              This case study is currently being documented. Check back soon.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Brief */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">The Engagement</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-heading font-semibold text-void mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Modular construction for commercial developers. Website redesign + B2B lead generation underway.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              BHX Modular builds modular structures for commercial developers — a high-value B2B market with long sales cycles and significant deal sizes. Their challenge: a website that doesn&apos;t communicate the quality of their work, and a pipeline that depends entirely on existing relationships.
            </p>
            <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              We&apos;re currently executing a full website redesign and deploying a B2B lead generation system targeted at commercial developers, property management companies, and general contractors in the Southeast. Results will be documented as they come in.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="snap-section--short bg-frost px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2
              className="font-heading font-semibold text-void mb-6"
              style={{ fontSize: '28px', letterSpacing: '-0.02em' }}
            >
              Want to see what this looks like for your business?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-slate mb-8" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Book a 15-minute call. No pitch — just an honest conversation about where you stand.
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
