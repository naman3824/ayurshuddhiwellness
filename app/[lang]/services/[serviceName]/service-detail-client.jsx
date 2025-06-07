'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toUrlSlug } from '../../../../utils/urlUtils';

// Function to render markdown-like formatting
const renderFormattedText = (text) => {
  if (!text) return null;
  
  return text.split('\n\n').map((paragraph, i) => (
    <p key={i} className="mb-4">
      {paragraph.includes('**') 
        ? paragraph.split('**').map((part, j) => 
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )
        : paragraph
      }
    </p>
  ));
};

export function ServiceDetailClient({ service, params }) {
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Service Not Found</h1>
          <p className="mb-8">The service you're looking for doesn't exist or has been moved.</p>
          <Link href={`/${params.lang}/services`} className="btn-primary py-2 px-4 rounded-md">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section with service image */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl text-gradient">
              {service.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Service content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Service image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px] md:h-auto">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Service description */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-primary-400">
              About {service.name}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {renderFormattedText(service.detailedDescription || service.description)}
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${params.lang}/services`} className="btn-secondary py-2 px-4 rounded-md inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Back to Services
              </Link>
              
              <Link 
                href={`/book?service=${encodeURIComponent(service.name)}`} 
                className="btn-primary py-2 px-4 rounded-md inline-flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}