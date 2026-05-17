import type { Metadata } from 'next'

import { AnimateIn } from '@/components/motion/AnimateIn'

export const metadata: Metadata = {
  title: 'Tools & Resources',
  description: 'Tools Social Linus uses for web design, SEO, lead generation, and operations. Affiliate links marked.',
}

const categories = [
  {
    name: 'Web Design & Development',
    tools: [
      { name: 'Elementor Pro', description: 'The page builder we use for rapid, conversion-focused WordPress builds. Visual editing with serious performance when configured correctly.', affiliate: true },
      { name: 'WP Engine', description: 'Managed WordPress hosting built for performance and security. Faster load times mean better conversions and better rankings.', affiliate: true },
      { name: 'Figma', description: 'Our design tool of choice for wireframing and high-fidelity mockups. Collaborative, fast, and the industry standard for good reason.', affiliate: false },
      { name: 'WebP Express', description: 'Automatic WebP conversion for WordPress. One of the fastest ways to cut image load times and improve Core Web Vitals scores.', affiliate: false },
    ],
  },
  {
    name: 'SEO & Analytics',
    tools: [
      { name: 'Rank Math Pro', description: 'Our on-page SEO plugin of choice. Schema markup, redirect management, and local SEO features without the bloat.', affiliate: true },
      { name: 'Ahrefs', description: 'The backbone of our keyword research and competitor analysis. No serious SEO work gets done without it.', affiliate: true },
      { name: 'Google Search Console', description: 'Free, essential, and often underused. Shows you exactly what Google sees and what you\'re actually ranking for.', affiliate: false },
      { name: 'Google Analytics 4', description: 'Traffic, behavior, and conversion tracking. Required for understanding what\'s actually working on any client site.', affiliate: false },
    ],
  },
  {
    name: 'Lead Generation & Outreach',
    tools: [
      { name: 'Apollo.io', description: 'Our primary tool for contact data. Search by industry, company size, role, and location. Verified emails included.', affiliate: true },
      { name: 'Instantly.ai', description: 'Cold email infrastructure that handles sending, warmup, and deliverability. Built specifically for high-volume outbound.', affiliate: true },
      { name: 'Smartlead', description: 'Alternative cold email platform with strong deliverability. We use it for specific client campaigns where mailbox variety matters.', affiliate: true },
      { name: 'ZoomInfo', description: 'Enterprise-grade B2B contact data. More expensive than Apollo, but depth of data justifies it for enterprise targeting.', affiliate: false },
    ],
  },
  {
    name: 'Productivity & Operations',
    tools: [
      { name: 'Notion', description: 'Our entire operation runs here. Client wikis, project tracking, SOPs, and content planning — all in one place.', affiliate: true },
      { name: 'Calendly', description: 'Scheduling that doesn\'t require back-and-forth. Every CTA on this site routes here.', affiliate: true },
      { name: 'Slack', description: 'Client communication and internal coordination. Keeps conversations out of email and organized by project.', affiliate: false },
      { name: 'Zapier', description: 'Automation layer that connects everything else. New lead from a form triggers CRM entry, Slack notification, and Notion page — automatically.', affiliate: true },
    ],
  },
]

export default function ToolsPage() {
  return (
    <main>
      <section className="snap-section bg-void relative overflow-hidden flex flex-col justify-center px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(21,71,232,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimateIn><p className="eyebrow text-ember mb-6">Resources</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}>
              Tools &amp; Resources
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-xl mb-8" style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
              Every tool listed here is something we actively use in client work or our own operations. Nothing is included because of a commission rate.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className="inline-flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 max-w-xl">
              <p className="text-white/55 text-sm leading-relaxed">
                <span className="text-white font-semibold">Disclosure:</span> Some links below are affiliate links. We earn a small commission if you sign up — at no cost to you.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {categories.map((category, catIdx) => (
        <section key={category.name} className={`snap-section flex flex-col justify-center px-6 py-24 ${catIdx % 2 === 0 ? 'bg-white' : 'bg-frost'}`}>
          <div className="max-w-5xl mx-auto w-full">
            <AnimateIn>
              <h2 className="font-display font-semibold text-void mb-12" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>
                {category.name}
              </h2>
            </AnimateIn>
            <div className="grid md:grid-cols-2 gap-4">
              {category.tools.map((tool, i) => (
                <AnimateIn className="bg-white rounded-2xl p-6 border border-slate/8 hover:border-cobalt/20 transition-colors flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-semibold text-void" style={{ fontSize: '18px' }}>{tool.name}</h3>
                    <span className="eyebrow text-cobalt bg-cobalt/8 px-2 py-1 rounded text-xs shrink-0">I Use This</span>
                  </div>
                  <p className="text-slate flex-1 mb-4" style={{ fontSize: '14px', lineHeight: '1.65' }}>{tool.description}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-cobalt text-sm font-medium hover:underline">
                    {tool.affiliate ? '→ Affiliate Link' : '→ Visit Site'}
                    {tool.affiliate && <span className="text-slate/50 text-xs font-normal">(affiliate)</span>}
                  </a>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
