import type { Metadata } from 'next'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Social Linus — 15+ years of web design and 8+ years of SEO. Atlanta-based B2B agency for service companies.',
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">About</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              About Social Linus
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="flex flex-wrap gap-8 text-white/60">
              {[
                { stat: '15+', label: 'Years in Web Design' },
                { stat: '8+', label: 'Years Running SEO' },
                { stat: 'ATL', label: 'Atlanta Based' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div
                    className="font-mono font-bold text-cobalt"
                    style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
                  >
                    {item.stat}
                  </div>
                  <p className="eyebrow text-white/40 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Story */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">The Story</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="font-heading font-semibold text-void mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Started in web design. Evolved into something more useful.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="space-y-4 text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              <p>
                Social Linus started as a web design practice. We built sites for local businesses in Atlanta — good-looking, professionally executed, delivered on time.
              </p>
              <p>
                The problem: the sites didn&apos;t rank. Clients had beautiful websites that no one could find. We had to learn SEO — not just the basics, but the technical and strategic depth that actually moves rankings for competitive search terms.
              </p>
              <p>
                From there, the pattern was clear. Businesses needed more than a good website. They needed traffic, and they needed leads. Web design became SEO, SEO became content, and eventually we built out a systematic lead generation capability for clients whose deal sizes justified it.
              </p>
              <p>
                Today Social Linus is a full-service B2B growth agency. We handle three things — web design, SEO, and lead generation — and we do them in a way that compounds. A better website ranks better. Better rankings bring qualified traffic. A lead generation system captures the ones who aren&apos;t searching yet.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Philosophy */}
      <section className="snap-section bg-frost flex flex-col justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Philosophy</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <blockquote
              className="font-heading font-semibold text-void mb-8"
              style={{ fontSize: '28px', letterSpacing: '-0.02em', lineHeight: '1.3' }}
            >
              &ldquo;We don&apos;t convince you that you have a problem. We help you see clearly where you stand — and then we fix it.&rdquo;
            </blockquote>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="space-y-4 text-slate" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              <p>
                The best clients are ones who already understand that something isn&apos;t working. They don&apos;t need to be sold on the concept of digital marketing. They need a clear picture of their specific situation and a direct path forward.
              </p>
              <p>
                That&apos;s how every engagement starts. We look at what you have, what you&apos;re missing, and what it would take to get where you want to go. Then we give you an honest answer — even if that answer is that we&apos;re not the right fit.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Founder */}
      <section className="snap-section--short bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-slate/10 rounded-2xl flex items-center justify-center">
                  <span className="text-slate/40 font-heading font-semibold text-lg">Photo</span>
                </div>
              </div>
              <div>
                <p className="font-heading font-bold text-void text-2xl mb-1">Shannendoah</p>
                <p className="eyebrow text-cobalt mb-4">Founder, Social Linus</p>
                <p className="text-slate" style={{ fontSize: '16px', lineHeight: '1.65' }}>
                  15+ years in web design. 8+ years running SEO campaigns. Based in Atlanta, working with B2B service companies across the Southeast.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="snap-section bg-void flex flex-col justify-center items-center text-center px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <AnimateIn>
            <h2
              className="font-heading font-semibold text-white mb-6"
              style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
            >
              Let&apos;s talk about your business.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="text-white/70 mb-10" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              15 minutes. No pitch. We&apos;ll look at where you are and whether we can help.
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
