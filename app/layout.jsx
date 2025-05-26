import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ayur Shuddhi Wellness',
  description: 'Holistic health solutions through Ayurveda and innovative wellness practices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
} 