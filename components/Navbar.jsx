'use client';

import Link from 'next/link'
import Image from 'next/image'
import { MandalaDecoration } from './MandalaDecoration'
import { useState, useEffect, useRef } from 'react'
import { staggeredAnimation } from '../utils/animations'
import { useAuth } from './AuthProvider'

const navigation = [
  { name: 'Home', href: '' },
  { name: 'About', href: 'about' },
  { name: 'Services', href: 'services' },
  { name: 'Gallery', href: 'gallery' },
  { name: 'Blog', href: 'blog' },
  { name: 'Contact', href: 'contact' },
]

export function Navbar({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const { currentUser, isAdmin, logout } = useAuth();
  
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

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
  };

  return (
    <header className={`relative bg-gradient-to-b from-gray-800/70 to-gray-900/70 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b border-gray-700/50 ${
      scrolled ? 'shadow-warm' : ''
    }`}>
      <MandalaDecoration 
        className="absolute top-2 right-4 text-primary-800" 
        size="sm" 
        opacity="low" 
      />
      <MandalaDecoration 
        className="absolute bottom-2 left-4 text-accent-800" 
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
                <Image 
                  src="/images/hero/logo.png" 
                  alt="Ayur Shuddhi Wellness Logo" 
                  width={40} 
                  height={40} 
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
                  href={link.href ? `/${lang}/${link.href}` : `/${lang}`}
                  className="nav-item relative px-4 py-2 text-base font-semibold text-gray-200 hover:text-primary-400 transition-all duration-300 group animate-fade-in rounded-xl hover:bg-gray-700/50"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 1 }}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-saffron group-hover:w-full transition-all duration-500 rounded-full"></span>
                </Link>
              ))}
              <div className="ml-6 flex items-center gap-3">
                <Link
                  href="/book"
                  className="btn btn-primary hover-scale"
                >
                  📅 Book Consultation
                </Link>
                {currentUser ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-200 hover:bg-gray-700/50 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                        {currentUser.displayName?.charAt(0)?.toUpperCase() || currentUser.email?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-700">
                          <p className="text-sm text-white font-medium truncate">{currentUser.displayName || 'User'}</p>
                          <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="block w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-gray-700/50 transition-colors"
                          >
                            🛡️ Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50 transition-colors"
                        >
                          🚪 Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-semibold text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/10 transition-all duration-300"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              type="button"
              className="p-2 rounded-xl text-gray-200 hover:bg-gray-700 hover:text-primary-400 transition-all duration-300 hover-scale"
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
            isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="mobile-menu"
          ref={mobileMenuRef}
        >
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 border-t border-gray-600 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
            {navigation.map((link, index) => (
              <Link
                key={link.name}
                href={link.href ? `/${lang}/${link.href}` : `/${lang}`}
                className="mobile-nav-item block px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:bg-gray-700 hover:text-primary-400 transition-all duration-300 hover-lift"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms`, opacity: isOpen ? 1 : 0 }}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-2 space-y-2">
              <Link
                href="/book"
                className="mobile-nav-item block w-full btn btn-primary text-center hover-scale"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${navigation.length * 50}ms`, opacity: isOpen ? 1 : 0 }}
              >
                📅 Book Consultation
              </Link>
              {currentUser ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="mobile-nav-item block w-full px-4 py-3 rounded-xl text-center text-sm font-semibold text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-all"
                      onClick={() => setIsOpen(false)}
                      style={{ animationDelay: `${(navigation.length + 1) * 50}ms`, opacity: isOpen ? 1 : 0 }}
                    >
                      🛡️ Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="mobile-nav-item block w-full px-4 py-3 rounded-xl text-center text-sm font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all"
                    style={{ animationDelay: `${(navigation.length + (isAdmin ? 2 : 1)) * 50}ms`, opacity: isOpen ? 1 : 0 }}
                  >
                    🚪 Sign Out ({currentUser.displayName || currentUser.email?.split('@')[0]})
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="mobile-nav-item block w-full px-4 py-3 rounded-xl text-center text-sm font-semibold text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-all"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${(navigation.length + 1) * 50}ms`, opacity: isOpen ? 1 : 0 }}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}