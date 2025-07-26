'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import GalleryImage from './GalleryImage';

export default function Slideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoadCount, setImageLoadCount] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  
  // Memoize image count to prevent unnecessary re-renders
  const imageCount = useMemo(() => images?.length || 0, [images]);
  
  // Set loading state with performance optimization
  useEffect(() => {
    if (imageCount === 0) {
      setIsLoading(false);
      return;
    }
    
    // Only show loading if we have images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Reduced from 500ms for better perceived performance
    
    return () => clearTimeout(timer);
  }, [imageCount]);
  
  // Auto-play functionality with proper cleanup
  useEffect(() => {
    if (!isPlaying || isLoading || imageCount <= 1) {
      return;
    }
    
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, 5000); // Change slide every 5 seconds
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, imageCount, isLoading]);

  // Optimized navigation functions with useCallback to prevent re-renders
  const goToPrevious = useCallback(() => {
    if (imageCount <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageCount - 1 : prevIndex - 1));
  }, [imageCount]);

  const goToNext = useCallback(() => {
    if (imageCount <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
  }, [imageCount]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < imageCount) {
      setCurrentIndex(index);
    }
  }, [imageCount]);

  // Optimized pause/play toggle with useCallback
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => {
      const newState = !prev;
      
      // Clear existing timer when pausing
      if (!newState && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      return newState;
    });
  }, []);

  // Handle image load completion for better UX
  const handleImageLoad = useCallback(() => {
    setImageLoadCount(prev => prev + 1);
  }, []);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case ' ': // Spacebar
          event.preventDefault();
          togglePlayPause();
          break;
        default:
          break;
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [goToPrevious, goToNext, togglePlayPause]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // Early return for empty images
  if (!images || imageCount === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No images to display</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="loading-shimmer w-full h-full rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
      tabIndex={0}
      role="region"
      aria-label="Image slideshow"
      aria-live="polite"
    >
      {/* Main image display */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <GalleryImage
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              fill
              className="object-cover responsive-image"
              onLoadingComplete={handleImageLoad}
              priority={index === 0} // Prioritize first image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows - only show if more than 1 image */}
      {imageCount > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white z-10"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white z-10"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Play/Pause button - only show if more than 1 image */}
      {imageCount > 1 && (
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white z-10"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* Slide indicators - only show if more than 1 image */}
      {imageCount > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white shadow-lg scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
        {currentIndex + 1} / {imageCount}
      </div>
    </div>
  );
} 