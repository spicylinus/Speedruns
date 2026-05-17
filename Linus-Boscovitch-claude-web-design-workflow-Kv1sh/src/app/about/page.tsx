import type { Metadata } from 'next'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'
import { StatCounter } from '@/components/motion/StatCounter'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Social Linus — 15+ years of web design, 8+ years of SEO. Atlanta-based B2B agency for service companies.',
}

export default function AboutPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">About</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-8" style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              Social Linus
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="flex flex-wrap gap-12">
              {[
                { value: 15, suffix: '+', label: 'Years Web Design' },
                { value: 8, suffix: '+', label: 'Years SEO' },
                { isText: true, displayText: 'ATL', label: 'Atlanta Based', value: 0 },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono font-bold text-cobalt mb-1" style={{ fontSize: '36px', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    <StatCounter value={stat.value} suffix={stat.suffix} isText={stat.isText} displayText={stat.displayText} />
                  </p>
                  <p className="eyebrow text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 items-start">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">The Story</p>
            <h2 className="font-display font-bold text-void mb-8" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              Started in web design. Evolved into something more useful.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="space-y-5 text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              <p>Social Linus started as a web design practice. We built sites for local businesses in Atlanta — good-looking, professionally executed, delivered on time.</p>
              <p>The problem: the sites didn&apos;t rank. Clients had beautiful websites that no one could find. Learning SEO wasn&apos;t optional.</p>
              <p>From there, the pattern was clear. Businesses needed more than a good website. They needed traffic, and they needed leads. Web design became SEO, SEO became content, and eventually we built out a systematic lead generation capability for clients whose deal sizes justified it.</p>
              <p>Today Social Linus is a full-service B2B growth agency. Three services that compound: a better website ranks better, better rankings bring qualified traffic, lead generation captures the buyers who aren&apos;t searching yet.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-6">Philosophy</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <blockquote className="font-display font-bold text-void mb-8" style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em', lineHeight: '1.15', maxWidth: '800px' }}>
              &ldquo;We don&apos;t convince you that you have a problem. We help you see clearly where you stand — and then we fix it.&rdquo;
            </blockquote>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                The best clients already understand that something isn&apos;t working. They don&apos;t need to be sold on digital marketing — they need a clear picture of their specific situation and a direct path forward.
              </p>
              <p className="text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                Every engagement starts the same way: we look at what you have, what you&apos;re missing, and what it would take to get where you want to go. Then we give you an honest answer — even if that answer is that we&apos;re not the right fit.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-ember mb-12">The Founder</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="w-48 h-48 rounded-2xl bg-frost border border-cobalt/10 flex items-center justify-center shrink-0">
                <p className="text-slate/40 font-display font-semibold">Photo</p>
              </div>
              <div>
                <h2 className="font-display font-bold text-void mb-1" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>Shannendoah</h2>
                <p className="eyebrow text-cobalt mb-6">Founder, Social Linus Web Services</p>
                <p className="text-slate mb-4" style={{ fontSize: '18px', lineHeight: '1.6', maxWidth: '520px' }}>
                  15+ years building websites for businesses across Atlanta and the Southeast. 8+ years running SEO campaigns that generate revenue — not just rankings.
                </p>
                <p className="text-slate" style={{ fontSize: '16px', lineHeight: '1.6', maxWidth: '520px' }}>
                  Focused exclusively on B2B service companies where a single new client is worth the investment many times over.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(21,71,232,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-lg">
              <AnimateIn><p className="eyebrow text-ember mb-6">Let&apos;s talk.</p></AnimateIn>
              <AnimateIn delay={0.1}><h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>Tell us about your business.</h2></AnimateIn>
              <AnimateIn delay={0.2}><p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>15 minutes. No pitch. We&apos;ll look at where you are and whether we can help.</p></AnimateIn>
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
