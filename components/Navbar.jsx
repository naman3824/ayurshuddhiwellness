'use client';

import Link from 'next/link'
import { DarkModeToggle } from './DarkModeToggle'

const navigation = [
  { name: 'Home', href: '' },
  { name: 'About', href: 'about' },
  { name: 'Services', href: 'services' },
  { name: 'Contact', href: 'contact' },
]

export function Navbar({ lang }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              Ayur Shuddhi Wellness
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={`/${lang}/${link.href}`}
                  className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="ml-4">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
} 