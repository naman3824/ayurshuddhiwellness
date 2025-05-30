'use client';

import Link from 'next/link'
import { DarkModeToggle } from './DarkModeToggle'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Home', href: '' },
  { name: 'About', href: 'about' },
  { name: 'Services', href: 'services' },
  { name: 'Gallery', href: 'gallery' },
  { name: 'Contact', href: 'contact' },
]

export function Navbar({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md py-1' : 'shadow-soft py-2'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href={`/${lang}`} 
              className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300 flex items-center"
            >
              <span className="inline-block mr-2 h-8 w-8 rounded-full bg-gradient-wellness"></span>
              Ayur Shuddhi Wellness
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center">
              {navigation.map((link, index) => (
                <Link
                  key={link.name}
                  href={`/${lang}/${link.href}`}
                  className="relative px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-wellness group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <div className="ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                <DarkModeToggle />
              </div>
              <div className="ml-4">
                <Link
                  href={`/${lang}/contact`}
                  className="btn btn-primary"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden animate-slide-up" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((link, index) => (
                <Link
                  key={link.name}
                  href={`/${lang}/${link.href}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 px-3">
                <Link
                  href={`/${lang}/contact`}
                  className="block w-full btn btn-primary text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 