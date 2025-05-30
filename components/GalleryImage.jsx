'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Component to handle different image formats including HEIC
 * For HEIC images, it will display a fallback message if the browser doesn't support HEIC
 */
export default function GalleryImage({ src, alt, fill = false, onLoadingComplete, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isHeic, setIsHeic] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the image is a HEIC file
    if (src.toLowerCase().endsWith('.heic')) {
      setIsHeic(true);
    }
  }, [src]);

  const handleError = () => {
    // If the image fails to load and it's a HEIC file, show a fallback
    if (isHeic) {
      setError(true);
    }
    
    // Call onLoadingComplete if provided
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  };
  
  const handleLoad = () => {
    setIsLoaded(true);
    
    // Call onLoadingComplete if provided
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 w-full h-full">
        <div className="text-center p-4">
          <p className="text-gray-600 dark:text-gray-300">
            This image is in HEIC format which is not supported by your browser.
          </p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        onError={handleError}
        onLoadingComplete={handleLoad}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onLoadingComplete={handleLoad}
      {...props}
    />
  );
} 