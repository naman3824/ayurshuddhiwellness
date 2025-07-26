'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { UnifiedBookingForm } from '../../components/UnifiedBookingForm';
import { MandalaPattern } from '../../components/MandalaDecoration';

function BookingContent() {
  const searchParams = useSearchParams();
  const [preSelectedService, setPreSelectedService] = useState('');

  useEffect(() => {
    // Check for service parameter in URL and pre-select it
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setPreSelectedService(serviceParam);
    }
  }, [searchParams]);

  return (
    <div className="bg-gradient-to-br from-ivory-100 via-ivory-50 to-sage-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <MandalaPattern />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            {/* Go Back Button */}
            <div className="mb-8 flex justify-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 animated-underline"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Back
              </button>
            </div>
            
            <h1 className="text-4xl font-display font-bold tracking-tight text-gradient-indian sm:text-6xl page-hero">
              Book Your <span className="text-gradient-saffron">Consultation</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 page-content" style={{ animationDelay: '200ms' }}>
              Schedule a personalized consultation with our expert practitioners to begin your wellness journey.
            </p>
          </div>
        </div>
      </div>

      {/* Unified booking form section */}
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 page-section">
        <UnifiedBookingForm preSelectedService={preSelectedService} />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="bg-gradient-to-br from-ivory-100 via-ivory-50 to-sage-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading booking form...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}