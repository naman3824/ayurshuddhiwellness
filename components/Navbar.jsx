'use client';

import Link from 'next/link'
import { DarkModeToggle } from './DarkModeToggle'
import { MandalaDecoration } from './MandalaDecoration'
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
    <header className={`relative bg-gradient-to-r from-ivory-100 via-ivory-50 to-sage-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b border-primary-100/20 dark:border-gray-700/50 ${
      scrolled ? 'shadow-warm py-1' : 'shadow-soft py-2'
    }`}>
      {/* Subtle mandala decorations */}
      <MandalaDecoration 
        className="absolute top-2 right-4 text-primary-200 dark:text-primary-800" 
        size="sm" 
        opacity="low" 
      />
      <MandalaDecoration 
        className="absolute bottom-2 left-4 text-accent-200 dark:text-accent-800" 
        size="sm" 
        opacity="low" 
      />
      
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href={`/${lang}`} 
              className="text-2xl font-display font-bold text-gradient-indian hover:scale-105 transition-transform duration-300 flex items-center group"
            >
              <div className="mr-3 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-100 p-1 shadow-soft group-hover:shadow-glow transition-all duration-300">
                <img 
                  src="/images/hero/logo.png" 
                  alt="Ayur Shuddhi Wellness Logo" 
                  className="h-full w-full object-cover rounded-full" 
                />
              </div>
              <span className="hidden sm:inline">Ayur Shuddhi Wellness</span>
              <span className="sm:hidden">ASW</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1" ref={navRef}>
            <div className="flex items-center">
              {navigation.map((link, index) => (
                <Link
                  key={link.name}
                  href={`/${lang}/${link.href}`}
                  className="nav-item relative px-4 py-2 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group animate-fade-in rounded-xl hover:bg-primary-25 dark:hover:bg-gray-700/50"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 1 }}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-saffron group-hover:w-full transition-all duration-500 rounded-full"></span>
                </Link>
              ))}
              <div className="ml-6 border-l border-secondary-200 dark:border-gray-600 pl-6">
                <DarkModeToggle />
              </div>
              <div className="ml-6">
                <Link
                  href="/book"
                  className="btn btn-primary hover-scale"
                >
                  📅 Book Consultation
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <DarkModeToggle />
            <button
              type="button"
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover-scale"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6 transition-transform duration-300 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu with animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-smooth ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="mobile-menu"
          ref={mobileMenuRef}
        >
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 border-t border-primary-200/30 dark:border-gray-600 bg-gradient-to-b from-primary-25 to-white dark:from-gray-700 dark:to-gray-800">
            {navigation.map((link, index) => (
              <Link
                key={link.name}
                href={`/${lang}/${link.href}`}
                className="mobile-nav-item block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover-lift"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms`, opacity: isOpen ? 1 : 0 }}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-6 px-2">
              <Link
                href="/book"
                className="mobile-nav-item block w-full btn btn-primary text-center hover-scale"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${navigation.length * 50}ms`, opacity: isOpen ? 1 : 0 }}
              >
                📅 Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}