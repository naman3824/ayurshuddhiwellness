'use client';

import Link from 'next/link'
import { DarkModeToggle } from './DarkModeToggle'
import { useState, useEffect, useRef } from 'react'
import { staggeredAnimation } from '../utils/animations'

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
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Apply staggered animation to nav items
  useEffect(() => {
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll('.nav-item');
      staggeredAnimation(navItems, 50);
      
      // Make sure nav items are visible after animation is applied
      setTimeout(() => {
        navItems.forEach(item => {
          item.style.opacity = 1;
        });
      }, navigation.length * 50 + 100);
    }
  }, []);
  
  // Handle mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current && isOpen) {
      const mobileNavItems = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
      staggeredAnimation(mobileNavItems, 50);
      
      // Make mobile nav items visible
      setTimeout(() => {
        mobileNavItems.forEach(item => {
          item.style.opacity = 1;
          item.style.transform = 'translateX(0)';
        });
      }, mobileNavItems.length * 50 + 50);
    }
  }, [isOpen]);

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
          <div className="hidden md:flex items-center space-x-1" ref={navRef}>
            <div className="flex items-center">
              {navigation.map((link, index) => (
                <Link
                  key={link.name}
                  href={`/${lang}/${link.href}`}
                  className="nav-item relative px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 1 }}
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
                  href="/book"
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
                <svg className="h-6 w-6 transition-transform duration-300 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
        
        {/* Mobile menu with animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-smooth ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="mobile-menu"
          ref={mobileMenuRef}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
            {navigation.map((link, index) => (
              <Link
                key={link.name}
                href={`/${lang}/${link.href}`}
                className="mobile-nav-item block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms`, opacity: isOpen ? 1 : 0 }}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <Link
                href="/book"
                className="mobile-nav-item block w-full btn btn-primary text-center"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${navigation.length * 50}ms`, opacity: isOpen ? 1 : 0 }}
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}