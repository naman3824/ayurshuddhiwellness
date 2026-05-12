'use client';

import { useEffect } from 'react';
import { initAllAnimations } from '../utils/animations';

export function AnimationProvider({ children }) {
  useEffect(() => {
    // Initialize all animations and get cleanup function
    const cleanup = initAllAnimations();
    
    // Return cleanup function to be called on unmount
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  return <>{children}</>;
} 