import { Button } from '@/components/ui/Button'

export function HeroAnimated() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <p
        className="eyebrow mb-6 hero-item"
        style={{ color: 'rgba(255,255,255,0.55)', animationDelay: '0s' }}
      >
        Web Design · SEO · Lead Generation — Atlanta &amp; The Southeast
      </p>
      <h1
        className="font-heading font-bold text-white mb-6 leading-none hero-item"
        style={{ fontSize: '72px', letterSpacing: '-0.04em', animationDelay: '0.12s' }}
      >
        Your competitors are ranking.
        <br />
        You should be too.
      </h1>
      <p
        className="text-white/75 mb-10 max-w-2xl hero-item"
        style={{ fontSize: '18px', lineHeight: '1.6', animationDelay: '0.26s' }}
      >
        We build websites that generate leads, run SEO that drives revenue, and deliver qualified prospects to B2B service companies where every deal matters.
      </p>
      <div
        className="flex flex-wrap gap-4 hero-item"
        style={{ animationDelay: '0.4s' }}
      >
        <Button href="/book-a-call" size="lg">Book a Call →</Button>
        <Button href="/results" variant="ghost" size="lg">See Our Results</Button>
      </div>
    </div>
  )
}
