'use client';

import { useState } from 'react';
import { BookingSteps } from '../../components/BookingSteps';

export default function BookingPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl animate-fade-in">
              Book Your <span className="text-gradient">Consultation</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Schedule a personalized consultation with our expert practitioners to begin your wellness journey.
            </p>
          </div>
        </div>
      </div>

      {/* Booking steps section */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <BookingSteps />
      </div>
    </div>
  );
}