'use client';

/**
 * Animation utility functions — shared across apps.
 */

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;
  if (!('IntersectionObserver' in window)) {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.dataset.once === 'true') observer.unobserve(entry.target);
      } else if (entry.target.dataset.once !== 'true') {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  return observer;
}

export function staggeredAnimation(elements, baseDelay = 100) {
  if (!elements || elements.length === 0) return;
  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * baseDelay}ms`;
  });
}

export function initPageTransitions() {
  if (typeof window === 'undefined') return;
  document.documentElement.classList.add('page-transition');
  setTimeout(() => { document.documentElement.classList.remove('page-transition'); }, 500);
}

export function initParallaxEffect() {
  if (typeof window === 'undefined') return;
  const parallaxElements = document.querySelectorAll('.parallax');
  const handleScroll = () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.1;
      element.style.transform = `translateY(${-(scrollY * speed)}px)`;
    });
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}

export function initAllAnimations() {
  const scrollObserver = initScrollAnimations();
  const parallaxCleanup = initParallaxEffect();
  initPageTransitions();
  return () => {
    if (scrollObserver) scrollObserver.disconnect();
    if (parallaxCleanup) parallaxCleanup();
  };
}
