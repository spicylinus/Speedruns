import type { Metadata } from 'next'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { SubscribeForm } from '@/components/blog/SubscribeForm'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Web design, SEO, and lead generation insights for B2B service companies. Practical guides that drive revenue.',
}

const posts = [
  {
    title: 'Best Web Design Companies in Atlanta (2026)',
    excerpt: 'A practical guide to evaluating web design agencies in Atlanta. What to look for, what to avoid, and how to assess whether a studio can actually move revenue.',
    category: 'Web Design',
  },
  {
    title: 'SEO for Commercial AV Integrators: A Complete Guide',
    excerpt: 'How AV integration companies can rank for the commercial installation searches that bring in $50K+ projects. Technical and local SEO specifics for the industry.',
    category: 'SEO',
  },
  {
    title: 'B2B Lead Generation for Construction Companies',
    excerpt: 'Referrals can\'t be your only pipeline. A breakdown of outbound lead generation systems built specifically for commercial contractors and builders.',
    category: 'Lead Generation',
  },
  {
    title: 'Web Design for Contractors: What Actually Drives Leads',
    excerpt: 'Most contractor websites look fine and generate nothing. Here\'s what separates a site that wins jobs from one that just exists.',
    category: 'Web Design',
  },
  {
    title: 'Best SEO Services in Atlanta for Local Businesses',
    excerpt: 'What Atlanta businesses should expect from an SEO engagement, what questions to ask before signing anything, and what results look like in 90 days.',
    category: 'SEO',
  },
  {
    title: 'Lead Generation for Service Businesses: Beyond Referrals',
    excerpt: 'How to build a systematic outbound pipeline when your current growth depends entirely on who remembers to refer you.',
    category: 'Lead Generation',
  },
]

const categoryColors: Record<string, string> = {
  'Web Design': 'bg-cobalt/10 text-cobalt',
  'SEO': 'bg-cobalt/10 text-cobalt',
  'Lead Generation': 'bg-cobalt/10 text-cobalt',
}

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">The Ski Slope Strategy — BOFU first, TOFU second</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Blog
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Practical content on web design, SEO, and lead generation for B2B service companies. We publish what we know works — not what&apos;s trending.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="snap-section bg-white flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimateIn key={post.title} delay={i * 0.08}>
                <div className="bg-frost rounded-xl p-6 h-full flex flex-col border border-frost hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`eyebrow px-2 py-1 rounded text-xs ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="eyebrow text-slate/50 text-xs bg-slate/10 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  </div>
                  <h2
                    className="font-heading font-semibold text-void mb-3 flex-1"
                    style={{ fontSize: '18px', letterSpacing: '-0.01em', lineHeight: '1.3' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-slate" style={{ fontSize: '14px', lineHeight: '1.65' }}>
                    {post.excerpt}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={0.4} className="mt-12">
            <div className="bg-frost rounded-xl p-8 text-center border border-cobalt/20">
              <p className="font-heading font-semibold text-void mb-2" style={{ fontSize: '20px' }}>
                Content publishing begins Q2 2026.
              </p>
              <p className="text-slate mb-6">Subscribe to get notified when new guides are published.</p>
              <SubscribeForm />
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  )
}
