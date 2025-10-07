'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  isDarkMode: true, // Always true since we only support dark mode
  isThemeLoaded: false,
});

export function ThemeProvider({ children }) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Always set dark mode
    document.documentElement.classList.add('dark');
    
    // Remove any existing light mode classes
    document.documentElement.classList.remove('light');
    
    // Mark theme as loaded
    setIsThemeLoaded(true);
    
    // Clean up any existing theme preference in localStorage since we only support dark mode
    localStorage.removeItem('theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode: true, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}