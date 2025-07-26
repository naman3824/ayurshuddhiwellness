'use client';

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { DarkModeToggle } from './DarkModeToggle'
import { staggeredAnimation } from '../utils/animations'

export default function Navbar({ dict, lang = 'en-IN' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Memoize navigation items to prevent unnecessary re-renders
  const navigation = useMemo(() => [
    { name: dict?.nav?.home || 'Home', href: `/${lang}` },
    { name: dict?.nav?.services || 'Services', href: `/${lang}/services` },
    { name: dict?.nav?.gallery || 'Gallery', href: `/${lang}/gallery` },
    { name: dict?.nav?.about || 'About', href: `/${lang}/about` },
    { name: dict?.nav?.contact || 'Contact', href: `/${lang}/contact` },
  ], [dict, lang]);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          setScrolled(isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized navigation animation with proper cleanup
  useEffect(() => {
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll('.nav-item');
      
      if (navItems.length > 0) {
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
          staggeredAnimation(navItems, 50);
          
          // Make nav items visible with optimized timing
          navItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
            }, index * 50 + 100);
          });
        });
      }
    }
  }, [navigation]);

  // Optimized mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current && isOpen) {
      const mobileNavItems = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
      
      if (mobileNavItems.length > 0) {
        requestAnimationFrame(() => {
          staggeredAnimation(mobileNavItems, 50);
          
          // Animate mobile nav items
          mobileNavItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, index * 50 + 50);
          });
        });
      }
    }
  }, [isOpen]);

  // Optimized close menu handler
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Toggle menu with proper state management
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Handle link click with menu close
  const handleLinkClick = useCallback((href) => {
    closeMenu();
    if (href !== pathname) {
      router.push(href);
    }
  }, [closeMenu, pathname, router]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeMenu]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link 
            href={`/${lang}`}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Ayur Shuddhi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden md:flex items-center space-x-8">
            {navigation.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`nav-item opacity-0 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${
                  pathname === link.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {link.name}
              </button>
            ))}
            
            {/* Book Now Button */}
            <Link
              href="/book"
              className="nav-item opacity-0 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{ transitionDelay: `${navigation.length * 100}ms` }}
            >
              {dict?.nav?.book || 'Book Now'}
            </Link>

            {/* Dark Mode Toggle */}
            <div className="nav-item opacity-0" style={{ transitionDelay: `${(navigation.length + 1) * 100}ms` }}>
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-6 py-4 space-y-2">
              {navigation.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`mobile-nav-item opacity-0 translate-x-4 block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile Book Button */}
              <Link
                href="/book"
                onClick={closeMenu}
                className="mobile-nav-item opacity-0 translate-x-4 block w-full text-center bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-lg text-base font-semibold hover:shadow-lg transition-all duration-200 mt-4"
              >
                {dict?.nav?.book || 'Book Now'}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}