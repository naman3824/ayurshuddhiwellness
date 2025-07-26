'use client';

/**
 * Optimized animation utility functions for Ayur Shuddhi Wellness website
 * Provides scroll-based animations and other animation effects with performance focus
 */

// Performance optimized Intersection Observer for scroll animations
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Check if IntersectionObserver is available
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null, // viewport
    rootMargin: '-10% 0px -10% 0px', // Trigger animation slightly before/after element enters viewport
    threshold: 0.15 // 15% of the element must be visible (optimized threshold)
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target;
      
      if (entry.isIntersecting) {
        target.classList.add('is-visible');
        
        // Remove will-change after animation to optimize performance
        setTimeout(() => {
          target.style.willChange = 'auto';
        }, 1000);
        
        // Optional: stop observing after animation is triggered for performance
        if (target.dataset.once === 'true') {
          observer.unobserve(target);
        }
      } else if (target.dataset.once !== 'true') {
        // Only remove the class if the element should animate every time it enters the viewport
        target.classList.remove('is-visible');
        target.style.willChange = 'transform, opacity';
      }
    });
  }, observerOptions);

  // Observe all elements with the animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  return observer;
}

// Optimized staggered animation for multiple elements
export function staggeredAnimation(elements, baseDelay = 100) {
  if (!elements || elements.length === 0) return;
  
  // Use requestAnimationFrame for smoother performance
  requestAnimationFrame(() => {
    elements.forEach((element, index) => {
      element.style.animationDelay = `${index * baseDelay}ms`;
    });
  });
}

// Optimized smooth page transitions
export function initPageTransitions() {
  if (typeof window === 'undefined') return;
  
  document.documentElement.classList.add('page-transition');
  
  // Remove transition class after animation completes to prevent performance issues
  const cleanup = () => {
    document.documentElement.classList.remove('page-transition');
  };
  
  setTimeout(cleanup, 500);
  return cleanup;
}

// Performance optimized parallax effect with throttling
export function initParallaxEffect() {
  if (typeof window === 'undefined') return;
  
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length === 0) return;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    parallaxElements.forEach(element => {
      element.style.transform = 'none';
    });
    return;
  }
  
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
          const speed = parseFloat(element.dataset.speed) || 0.1;
          const yPos = -(scrollY * speed);
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  };
  
  // Use passive listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Optimized performance utility to check for reduced motion
export function shouldReduceMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Debounced resize handler for performance
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced initialization with proper cleanup
export function initAllAnimations() {
  if (shouldReduceMotion()) {
    // Skip animations if user prefers reduced motion
    return () => {};
  }
  
  const scrollObserver = initScrollAnimations();
  const parallaxCleanup = initParallaxEffect();
  const pageTransitionCleanup = initPageTransitions();
  
  // Enhanced cleanup function
  return () => {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }
    if (parallaxCleanup) {
      parallaxCleanup();
    }
    if (pageTransitionCleanup) {
      pageTransitionCleanup();
    }
    
    // Clean up any remaining will-change properties
    const elementsWithWillChange = document.querySelectorAll('[style*="will-change"]');
    elementsWithWillChange.forEach(el => {
      el.style.willChange = 'auto';
    });
  };
}

// Lazy loading utility for images
export function initLazyLoading() {
  if (typeof window === 'undefined') return;
  
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            lazyObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => lazyObserver.observe(img));
    
    return () => lazyObserver.disconnect();
  }
} 