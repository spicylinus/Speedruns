import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Social Linus | Web Design, SEO & Lead Generation — Atlanta, GA',
    template: '%s | Social Linus',
  },
  description: 'Social Linus is an Atlanta-based web design, SEO, and lead generation agency for B2B service companies. 15+ years experience. Real results.',
  metadataBase: new URL('https://sociallinus.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-style="minimalism" suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
