'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

/**
 * Optimized component to handle different image formats including HEIC
 * Provides lazy loading, WebP support, and performance optimizations
 */
export default function GalleryImage({ 
  src, 
  alt, 
  fill = false, 
  onLoadingComplete, 
  priority = false,
  className = '',
  sizes,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isHeic, setIsHeic] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize HEIC detection for performance
  const isHeicFormat = useMemo(() => {
    return src?.toLowerCase().endsWith('.heic') || src?.toLowerCase().endsWith('.heif');
  }, [src]);

  useEffect(() => {
    setIsHeic(isHeicFormat);
    setError(false);
    setIsLoaded(false);
    setIsLoading(true);
    setImgSrc(src);
  }, [src, isHeicFormat]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    
    // If the image fails to load and it's a HEIC file, show a fallback
    if (isHeicFormat) {
      setError(true);
    }
    
    // Call onLoadingComplete if provided
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  }, [isHeicFormat, onLoadingComplete]);
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setIsLoading(false);
    
    // Call onLoadingComplete if provided
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  // Generate optimized image props
  const imageProps = useMemo(() => {
    const baseProps = {
      src: imgSrc,
      alt: alt || '',
      onError: handleError,
      onLoad: handleLoad,
      priority,
      className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
      ...props
    };

    if (fill) {
      return {
        ...baseProps,
        fill: true,
        sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw',
      };
    }

    return baseProps;
  }, [imgSrc, alt, handleError, handleLoad, priority, className, isLoading, props, fill, sizes]);

  // Error state for HEIC files
  if (error && isHeicFormat) {
    return (
      <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 w-full h-full min-h-[200px] rounded-lg">
        <div className="text-center p-6 max-w-sm">
          <div className="mx-auto mb-4 w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            HEIC Format Not Supported
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This image format is not supported by your browser. Please try converting it to JPG or PNG.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading && !error) {
    return (
      <div className="w-full h-full min-h-[200px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
        <div className="flex items-center justify-center h-full">
          <div className="loading-shimmer w-full h-full rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image {...imageProps} />
      
      {/* Blur placeholder for better UX */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
      )}
    </div>
  );
} 