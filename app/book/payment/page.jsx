'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  
  useEffect(() => {
    // In a real implementation, you would validate the payment and retrieve booking details
    // For now, we'll just use the URL parameters
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const service = searchParams.get('service');
    
    if (date && time && service) {
      setBookingDetails({
        date,
        time,
        service,
        confirmationNumber: 'AYR' + Math.floor(100000 + Math.random() * 900000)
      });
    } else {
      // If booking details are missing, redirect back to booking page
      router.push('/book');
    }
  }, [searchParams, router]);

  if (!bookingDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Booking Confirmed!
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Your consultation has been successfully scheduled. We look forward to seeing you soon.
          </p>
          
          <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Booking Details</h2>
            
            <div className="grid grid-cols-1 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Confirmation Number</p>
                <p className="font-medium text-gray-900 dark:text-white">{bookingDetails.confirmationNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
                <p className="font-medium text-gray-900 dark:text-white">{bookingDetails.service}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{bookingDetails.date}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                <p className="font-medium text-gray-900 dark:text-white">{bookingDetails.time}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link 
              href="/" 
              className="btn-primary py-2.5 px-5"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}