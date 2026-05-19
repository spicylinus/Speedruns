'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const servicesLinks = [
  { label: 'Web Design', href: '/services/web-design' },
  { label: 'SEO', href: '/services/seo' },
  { label: 'Lead Generation', href: '/services/lead-generation' },
]

const navLinks = [
  { label: 'Services', href: '/services', dropdown: servicesLinks },
  { label: 'Results', href: '/results' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-void border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-heading font-700 text-xl text-white tracking-tight">
          Social Linus
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            if (link.dropdown) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isActive ? 'text-cobalt' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-void border border-white/10 rounded-lg shadow-lg overflow-hidden">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-cobalt' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center">
          <Link
            href="/book-a-call"
            className="bg-cobalt hover:bg-cobalt-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Book a Call →
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-void border-t border-white/10 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="block py-3 text-white/80 hover:text-white text-sm font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="pl-4 space-y-1">
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block py-2 text-white/60 hover:text-white text-sm transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <Link
              href="/book-a-call"
              className="block bg-cobalt hover:bg-cobalt-hover text-white text-sm font-medium px-5 py-3 rounded-lg text-center transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Book a Call →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
