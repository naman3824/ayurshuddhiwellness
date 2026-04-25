import { Noto_Sans, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { AnimationProvider } from '../components/AnimationProvider'
import { AuthProvider } from '../components/AuthProvider'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ayurshuddhiwellness.com';

// Load fonts via next/font — self-hosted, zero external requests
const notoSans = Noto_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-noto-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  title: {
    default: 'Ayur Shuddhi Wellness - Holistic Ayurvedic Health Solutions',
    template: '%s | Ayur Shuddhi Wellness',
  },
  description: 'Ayur Shuddhi Wellness offers authentic Ayurvedic treatments, Panchakarma detox, Yoga, and holistic healing therapies. Restore balance and rejuvenate your mind, body, and soul.',
  keywords: ['ayurveda', 'wellness', 'holistic health', 'natural healing', 'indian medicine', 'panchakarma', 'yoga', 'naturopathy'],
  authors: [{ name: 'Ayur Shuddhi Wellness' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Ayur Shuddhi Wellness - Holistic Ayurvedic Health Solutions',
    description: 'Authentic Ayurvedic treatments, Panchakarma detox, Yoga, and holistic healing. Restore balance and rejuvenate your mind, body, and soul.',
    url: SITE_URL,
    siteName: 'Ayur Shuddhi Wellness',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/images/hero/tree.jpg',
        width: 1200,
        height: 630,
        alt: 'Ayur Shuddhi Wellness - Holistic Healing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayur Shuddhi Wellness',
    description: 'Authentic Ayurvedic treatments and holistic healing therapies.',
    images: ['/images/hero/tree.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const themeColor = [
  { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
]

// This is a root layout that wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className="scroll-smooth">
      <body className={`${notoSans.variable} ${poppins.variable} font-sans bg-gray-900 text-gray-100 antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <AnimationProvider>
              <div className="flex flex-col min-h-screen">
                {children}
              </div>
            </AnimationProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}