import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Sans, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollReset } from '@/components/layout/ScrollReset'

// ─────────────────────────────────────────────────────────────
// GHL CONFIGURATION
// Replace these values with your actual GHL snippet IDs/URLs.
// Find them in GHL → Settings → Integrations → Tracking Scripts
// and Settings → Chat Widget.
// ─────────────────────────────────────────────────────────────
const GHL_TRACKING_LOCATION_ID = 'YOUR_GHL_LOCATION_ID'  // e.g. "abc123XYZ"
const GHL_CHAT_WIDGET_LOCATION_ID = 'YOUR_GHL_LOCATION_ID'  // same location ID
// ─────────────────────────────────────────────────────────────

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Social Linus | Web Design, SEO & Lead Generation — Atlanta, GA',
    template: '%s | Social Linus',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <ScrollReset />
        <Header />
        {children}
        <Footer />

        {/* GHL Site Tracking — only injected when a real location ID is configured */}
        {GHL_TRACKING_LOCATION_ID !== 'YOUR_GHL_LOCATION_ID' && (
          <Script
            id="ghl-tracking"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,b,d,e,a,f){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  a=b.createElement(d);f=b.getElementsByTagName(d)[0];
                  a.async=1;a.src=e;f.parentNode.insertBefore(a,f);
                })(window,document,'script',
                  'https://widgets.leadconnectorhq.com/loader.js',
                  'hl_gtm'
                );
                hl_gtm('init', '${GHL_TRACKING_LOCATION_ID}');
              `,
            }}
          />
        )}

        {/* GHL Chat Widget — only injected when a real location ID is configured */}
        {GHL_CHAT_WIDGET_LOCATION_ID !== 'YOUR_GHL_LOCATION_ID' && (
          <Script
            id="ghl-chat-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(d,s,c){
                  var js,fjs=d.getElementsByTagName(s)[0];
                  if(d.getElementById(c)){return;}
                  js=d.createElement(s);js.id=c;js.async=true;
                  js.src='https://widgets.leadconnectorhq.com/chat-widget/loader.js';
                  js.setAttribute('data-location-id','${GHL_CHAT_WIDGET_LOCATION_ID}');
                  fjs.parentNode.insertBefore(js,fjs);
                })(document,'script','ghl-chat-loader');
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
