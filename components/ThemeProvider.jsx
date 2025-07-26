'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

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
    
    // Add transition class before any theme changes - optimized for performance
    const documentElement = document.documentElement;
    documentElement.classList.add('transition-colors', 'duration-300');
    
    let shouldBeDark = false;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      shouldBeDark = true;
      setIsDarkMode(true);
      documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      documentElement.classList.remove('dark');
    }
    
    // Mark theme as loaded after initial setup
    setIsThemeLoaded(true);
    
    // Listen for system preference changes with optimized handler
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      // Only apply system preference if no manual preference is stored
      if (!localStorage.getItem('theme')) {
        const newDarkMode = e.matches;
        setIsDarkMode(newDarkMode);
        
        // Use requestAnimationFrame for smoother DOM updates
        requestAnimationFrame(() => {
          if (newDarkMode) {
            documentElement.classList.add('dark');
          } else {
            documentElement.classList.remove('dark');
          }
        });
      }
    };
    
    // Use modern event listener approach
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      
      // Update localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      // Optimized theme transition without excessive DOM manipulation
      const documentElement = document.documentElement;
      
      // Use CSS transitions instead of manual animation for better performance
      requestAnimationFrame(() => {
        if (newMode) {
          documentElement.classList.add('dark');
        } else {
          documentElement.classList.remove('dark');
        }
        
        // Add a subtle visual feedback without creating DOM elements
        documentElement.style.transform = 'scale(0.999)';
        
        requestAnimationFrame(() => {
          documentElement.style.transform = '';
        });
      });
      
      return newMode;
    });
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until loaded
  if (!isThemeLoaded) {
    return (
      <ThemeContext.Provider value={{ isDarkMode: false, toggleDarkMode, isThemeLoaded: false }}>
        <div className="invisible-initial">
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 