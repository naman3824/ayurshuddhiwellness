'use client';

import { useState } from 'react';
import GalleryImage from './GalleryImage';

export default function ImageGrid({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No images found in the gallery.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {images.map((image) => (
        <div 
          key={image.src}
          className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-w-4 aspect-h-3"
        >
          <div className="w-full h-64 relative">
            <GalleryImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 