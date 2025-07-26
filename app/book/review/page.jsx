'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MandalaPattern } from '../../../components/MandalaDecoration';

export default function ReviewPaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get booking data from sessionStorage
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      // Redirect back to booking if no data
      router.push('/book');
    }
  }, [router]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear booking data and redirect to confirmation
      sessionStorage.removeItem('bookingData');
      router.push('/book/payment'); // Reuse existing payment confirmation page
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = () => {
    router.push('/book');
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const { serviceDetails } = bookingData;

  return (
    <div className="bg-gradient-to-br from-ivory-100 via-ivory-50 to-sage-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <MandalaPattern />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center page-hero">
            <h1 className="text-4xl font-display font-bold tracking-tight text-gradient-indian sm:text-6xl">
              Review & Payment
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 page-content">
              Please review your booking details before proceeding to payment.
            </p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 page-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Booking Summary */}
          <div className="lg:col-span-2">
            <div className="relative bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-warm border border-primary-100/20 dark:border-gray-700/50 overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                    Booking Summary
                  </h2>
                  <button
                    onClick={handleEdit}
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                  >
                    Edit Details
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{bookingData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                        <p className="font-medium text-gray-900 dark:text-white">{bookingData.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Service Details
                    </h3>
                    <div className="bg-primary-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {serviceDetails.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {serviceDetails.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-900/20 dark:text-accent-300">
                              Duration: {serviceDetails.duration}
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {serviceDetails.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Appointment Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(bookingData.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                        <p className="font-medium text-gray-900 dark:text-white">{bookingData.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-warm border border-primary-200/30 dark:border-gray-600/50 overflow-hidden">
                <div className="p-8">
                  <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">
                    Payment Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Service Fee</span>
                      <span className="font-medium text-gray-900 dark:text-white">{serviceDetails.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Platform Fee</span>
                      <span className="font-medium text-gray-900 dark:text-white">₹0</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Amount</span>
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{serviceDetails.price}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full btn-primary text-lg py-4 mb-4 ${
                      isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      '💳 Pay Now'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    This is a placeholder payment button. No actual payment will be processed.
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      We Accept
                    </h4>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white rounded-lg p-2 shadow-sm border">
                        <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">
                          💳
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 shadow-sm border">
                        <div className="w-8 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          🏦
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 shadow-sm border">
                        <div className="w-8 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          📱
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200 animated-underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 