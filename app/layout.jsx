import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { AnimationProvider } from '../components/AnimationProvider'

// Load Inter with optimized configuration for better performance
const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata = {
  title: 'Ayur Shuddhi Wellness',
  description: 'Holistic health solutions through Ayurveda and innovative wellness practices',
  keywords: ['ayurveda', 'wellness', 'holistic health', 'natural healing', 'indian medicine'],
  authors: [{ name: 'Ayur Shuddhi Wellness' }],
  generator: 'Next.js',
  applicationName: 'Ayur Shuddhi Wellness',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ayurshuddhiwellness.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Separate viewport configuration (recommended by Next.js 14+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

// This is a root layout that wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} ${inter.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased`}>
        <ThemeProvider>
          <AnimationProvider>
            <div className="flex flex-col min-h-screen">
              {children}
            </div>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}