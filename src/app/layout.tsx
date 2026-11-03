import { Be_Vietnam_Pro, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { LocaleProvider } from '@/lib/i18n/LocaleContext'

// Giữ nguyên tên biến --font-space-grotesk để không phải sửa component / globals.css / tailwind
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning style={{ background: '#FAFAF8', cursor: 'crosshair' }}>
        <LocaleProvider>
          <div aria-hidden style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <Header />
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}