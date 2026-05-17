import type { Metadata } from 'next'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { SubscribeForm } from '@/components/blog/SubscribeForm'
import { PostGrid } from '@/components/blog/PostGrid'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Web design, SEO, and lead generation insights for B2B service companies. Practical guides that drive revenue.',
}

const posts = [
  { title: 'Best Web Design Companies in Atlanta (2026)', excerpt: 'A practical guide to evaluating web design agencies in Atlanta — what to look for, what to avoid, and how to assess whether a studio can actually move revenue.', category: 'Web Design', target: 'web design Atlanta' },
  { title: 'SEO for Commercial AV Integrators: A Complete Guide', excerpt: 'How AV integration companies can rank for the commercial installation searches that bring in $50K+ projects. Technical and local SEO specifics for the industry.', category: 'SEO', target: 'SEO for AV integrators' },
  { title: 'B2B Lead Generation for Construction Companies', excerpt: 'Referrals can\'t be your only pipeline. A breakdown of outbound lead generation systems built specifically for commercial contractors and builders.', category: 'Lead Generation', target: 'B2B lead generation construction' },
  { title: 'Web Design for Contractors: What Actually Drives Leads', excerpt: 'Most contractor websites look fine and generate nothing. Here\'s what separates a site that wins jobs from one that just exists.', category: 'Web Design', target: 'web design for contractors' },
  { title: 'Best SEO Services in Atlanta for Local Businesses', excerpt: 'What Atlanta businesses should expect from an SEO engagement, what questions to ask before signing, and what results look like in 90 days.', category: 'SEO', target: 'SEO services Atlanta' },
  { title: 'Lead Generation for Service Businesses: Beyond Referrals', excerpt: 'How to build a systematic outbound pipeline when your current growth depends entirely on who remembers to refer you.', category: 'Lead Generation', target: 'lead generation service businesses' },
]

export default function BlogPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Blog</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              BOFU first.
              <br />
              TOFU second.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              We publish what we know works — revenue-driving content before audience-building content. Practical guides for B2B service companies.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow text-ember mb-3">Phase 1 — BOFU</p>
                <h2 className="font-display font-semibold text-void" style={{ fontSize: '28px', letterSpacing: '-0.02em' }}>Coming Q2 2026</h2>
              </div>
              <p className="text-slate text-sm">6 posts in production</p>
            </div>
          </AnimateIn>
          <PostGrid posts={posts} />

          <AnimateIn delay={0.4} className="mt-12">
            <div className="bg-void rounded-2xl p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <p className="font-display font-semibold text-white mb-2" style={{ fontSize: '20px' }}>Get notified when posts publish.</p>
                <p className="text-white/55 text-sm">New guides land every two weeks starting Q2 2026.</p>
              </div>
              <div className="w-full md:w-auto md:min-w-80">
                <SubscribeForm />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  )
}
