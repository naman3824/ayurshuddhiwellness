'use client';

/**
 * Animation utility functions for Ayur Shuddhi Wellness website
 * Provides scroll-based animations and other animation effects
 */

// Intersection Observer for scroll animations
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
    rootMargin: '0px',
    threshold: 0.1 // 10% of the element must be visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Optional: stop observing after animation is triggered
        if (entry.target.dataset.once === 'true') {
          observer.unobserve(entry.target);
        }
      } else if (entry.target.dataset.once !== 'true') {
        // Only remove the class if the element should animate every time it enters the viewport
        entry.target.classList.remove('is-visible');
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

// Staggered animation for multiple elements
export function staggeredAnimation(elements, baseDelay = 100) {
  if (!elements || elements.length === 0) return;
  
  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * baseDelay}ms`;
  });
}

// Smooth page transitions
export function initPageTransitions() {
  if (typeof window === 'undefined') return;
  
  document.documentElement.classList.add('page-transition');
  
  // Remove transition class after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove('page-transition');
  }, 500);
}

// Parallax effect for background elements
export function initParallaxEffect() {
  if (typeof window === 'undefined') return;
  
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.1;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Export a function that initializes all animations
export function initAllAnimations() {
  const scrollObserver = initScrollAnimations();
  const parallaxCleanup = initParallaxEffect();
  initPageTransitions();
  
  // Return cleanup function
  return () => {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }
    if (parallaxCleanup) {
      parallaxCleanup();
    }
  };
} 