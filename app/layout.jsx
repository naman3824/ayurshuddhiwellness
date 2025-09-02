import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { AnimationProvider } from '../components/AnimationProvider'

// Load Inter with more character sets for better language support
const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata = {
  title: 'Ayur Shuddhi Wellness',
  description: 'Holistic health solutions through Ayurveda and innovative wellness practices',
  keywords: ['ayurveda', 'wellness', 'holistic health', 'natural healing', 'indian medicine'],
  authors: [{ name: 'Ayur Shuddhi Wellness' }],
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