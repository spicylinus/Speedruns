import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-void text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/web-design" className="text-sm hover:text-white transition-colors">Web Design</Link></li>
              <li><Link href="/services/seo" className="text-sm hover:text-white transition-colors">SEO</Link></li>
              <li><Link href="/services/lead-generation" className="text-sm hover:text-white transition-colors">Lead Generation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About</Link></li>
              <li><Link href="/results" className="text-sm hover:text-white transition-colors">Results</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@sociallinus.com" className="text-sm hover:text-white transition-colors">
                  hello@sociallinus.com
                </a>
              </li>
              <li>
                <a href="tel:+14045550100" className="text-sm hover:text-white transition-colors">
                  (404) 555-0100
                </a>
              </li>
              <li>
                <Link href="/book-a-call" className="text-sm text-cobalt hover:text-white transition-colors font-medium">
                  Book a Call →
                </Link>
              </li>
              <li className="text-sm text-white/40">Atlanta, GA</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">© 2026 Social Linus Web Services. All rights reserved.</p>
          <Link href="/" className="font-heading font-semibold text-white text-sm">
            Social Linus
          </Link>
        </div>
      </div>
    </footer>
  )
}
