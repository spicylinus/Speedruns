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
      {
        name: 'Elementor Pro',
        description: 'The page builder we use for rapid, conversion-focused WordPress builds. Visual editing with serious performance when configured correctly.',
        affiliate: true,
      },
      {
        name: 'WP Engine',
        description: 'Managed WordPress hosting built for performance and security. Faster load times mean better conversions and better rankings.',
        affiliate: true,
      },
      {
        name: 'Figma',
        description: 'Our design tool of choice for wireframing and high-fidelity mockups. Collaborative, fast, and the industry standard for good reason.',
        affiliate: false,
      },
      {
        name: 'WebP Express',
        description: 'Automatic WebP conversion for WordPress. One of the fastest ways to cut image load times and improve Core Web Vitals scores.',
        affiliate: false,
      },
    ],
  },
  {
    name: 'SEO & Analytics',
    tools: [
      {
        name: 'Rank Math Pro',
        description: 'Our on-page SEO plugin of choice. Schema markup, redirect management, and local SEO features that cover everything needed without bloat.',
        affiliate: true,
      },
      {
        name: 'Ahrefs',
        description: 'The backbone of our keyword research and competitor analysis. No serious SEO work gets done without it.',
        affiliate: true,
      },
      {
        name: 'Google Search Console',
        description: 'Free, essential, and often underused. Search Console shows you exactly what Google sees and what you\'re ranking for.',
        affiliate: false,
      },
      {
        name: 'Google Analytics 4',
        description: 'Traffic, behavior, and conversion tracking. Required for understanding what\'s actually working on any client site.',
        affiliate: false,
      },
    ],
  },
  {
    name: 'Lead Generation & Outreach',
    tools: [
      {
        name: 'Apollo.io',
        description: 'Our primary tool for contact data. Search by industry, company size, role, and location. Verified emails included.',
        affiliate: true,
      },
      {
        name: 'Instantly.ai',
        description: 'Cold email infrastructure that handles sending, warmup, and deliverability. Built specifically for high-volume outbound.',
        affiliate: true,
      },
      {
        name: 'Smartlead',
        description: 'Alternative cold email platform with strong deliverability. We use it for specific client campaigns where mailbox variety matters.',
        affiliate: true,
      },
      {
        name: 'ZoomInfo',
        description: 'Enterprise-grade B2B contact data. More expensive than Apollo, but depth of data justifies it for enterprise targeting.',
        affiliate: false,
      },
    ],
  },
  {
    name: 'Productivity & Operations',
    tools: [
      {
        name: 'Notion',
        description: 'Our entire operation runs here. Client wikis, project tracking, SOPs, and content planning — all in one place.',
        affiliate: true,
      },
      {
        name: 'Calendly',
        description: 'Scheduling that doesn\'t require back-and-forth. Every CTA on this site routes here.',
        affiliate: true,
      },
      {
        name: 'Slack',
        description: 'Client communication and internal coordination. Keeps conversations out of email and organized by project.',
        affiliate: false,
      },
      {
        name: 'Zapier',
        description: 'Automation layer that connects everything else. New lead from a form goes into the CRM, triggers a Slack notification, and creates a Notion page — without touching it.',
        affiliate: true,
      },
    ],
  },
]

export default function ToolsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateIn>
            <p className="eyebrow text-cobalt mb-6">Resources</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: '48px', letterSpacing: '-0.03em' }}
            >
              Tools &amp; Resources
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-white/70 max-w-2xl mb-6" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Every tool listed here is something we actively use in client work or our own operations. Nothing is included because of a commission rate.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className="inline-block bg-white/10 border border-white/20 rounded-lg px-4 py-3">
              <p className="text-white/70 text-sm">
                <strong className="text-white">Disclosure:</strong> Some links below are affiliate links. We earn a small commission if you sign up — at no cost to you. We only list tools we use.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Tool Categories */}
      {categories.map((category, catIndex) => (
        <section
          key={category.name}
          className={`snap-section flex flex-col justify-center px-6 py-24 ${
            catIndex % 2 === 0 ? 'bg-white' : 'bg-frost'
          }`}
        >
          <div className="max-w-5xl mx-auto w-full">
            <AnimateIn>
              <h2
                className="font-display font-semibold text-void mb-12"
                style={{ fontSize: '32px', letterSpacing: '-0.02em' }}
              >
                {category.name}
              </h2>
            </AnimateIn>
            <div className="grid md:grid-cols-2 gap-6">
              {category.tools.map((tool, i) => (
                <AnimateIn key={tool.name} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-6 border border-slate/10 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3
                        className="font-display font-medium text-void"
                        style={{ fontSize: '18px' }}
                      >
                        {tool.name}
                      </h3>
                      <span className="eyebrow text-cobalt bg-cobalt/10 px-2 py-1 rounded text-xs shrink-0">
                        I Use This
                      </span>
                    </div>
                    <p className="text-slate flex-1 mb-4" style={{ fontSize: '15px', lineHeight: '1.65' }}>
                      {tool.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-cobalt text-sm font-medium hover:underline"
                    >
                      {tool.affiliate ? '→ Affiliate Link' : '→ Visit Site'}
                      {tool.affiliate && (
                        <span className="text-xs text-slate/60 font-normal">(affiliate)</span>
                      )}
                    </a>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
