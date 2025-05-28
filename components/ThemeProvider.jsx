'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
  isThemeLoaded: false,
});

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // On mount, check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Add transition class before any theme changes
    document.documentElement.classList.add('transition-colors', 'duration-500');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    
    // Mark theme as loaded after initial setup
    setIsThemeLoaded(true);
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only apply system preference if no manual preference is stored
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          setIsDarkMode(true);
          document.documentElement.classList.add('dark');
        } else {
          setIsDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      // Update localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      // Add a brief flash effect for theme change
      const flashElement = document.createElement('div');
      flashElement.className = 'fixed inset-0 bg-white dark:bg-gray-900 z-[9999] pointer-events-none';
      flashElement.style.opacity = '0';
      document.body.appendChild(flashElement);
      
      // Animate the flash
      requestAnimationFrame(() => {
        flashElement.style.transition = 'opacity 150ms ease';
        flashElement.style.opacity = '0.1';
        
        setTimeout(() => {
          // Update document class
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          // Fade out the flash
          flashElement.style.opacity = '0';
          
          // Remove the flash element after animation
          setTimeout(() => {
            document.body.removeChild(flashElement);
          }, 150);
        }, 100);
      });
      
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 