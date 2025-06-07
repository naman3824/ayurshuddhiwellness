'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CalendarSelector } from './CalendarSelector';
import { TimeSlotSelector } from './TimeSlotSelector';
import { ServiceSelector } from './ServiceSelector';

// Client component that uses useSearchParams
function BookingStepsClient() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  // Check for service parameter in URL and pre-select it
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
      // Optionally, you can automatically advance to the service step
      // setCurrentStep(3);
    }
  }, [searchParams]);

  // Function to handle moving to the next step
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of the booking section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Function to handle moving to the previous step
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of the booking section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Check if the current step is complete and the next button should be enabled
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return selectedDate !== null;
      case 2:
        return selectedTime !== null;
      case 3:
        return selectedService !== null;
      default:
        return false;
    }
  };

  // When we reach the final step and it's complete, show the payment button
  if (currentStep === 4 && !showPaymentButton && isStepComplete()) {
    setShowPaymentButton(true);
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 md:p-8">
      {/* Step tracker */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step === currentStep
                    ? 'bg-gradient-wellness text-white'
                    : step < currentStep
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                } transition-all duration-300`}
              >
                {step < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step === currentStep
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {step === 1
                  ? 'Date'
                  : step === 2
                  ? 'Time'
                  : step === 3
                  ? 'Service'
                  : 'Payment'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-wellness rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <CalendarSelector
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}

        {currentStep === 2 && (
          <TimeSlotSelector
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        )}

        {currentStep === 3 && (
          <ServiceSelector
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review Your Booking</h2>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedDate}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedTime}</p>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Service</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedService}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg">
              <p className="text-sm text-primary-800 dark:text-primary-300">
                Click "Proceed to Payment" to confirm your booking. You will be redirected to our secure payment gateway.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        {currentStep > 1 ? (
          <button
            onClick={handlePreviousStep}
            className="btn-secondary py-2 px-4"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < 4 ? (
          <button
            onClick={handleNextStep}
            disabled={!isStepComplete()}
            className={`btn-primary py-2 px-6 ${!isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        ) : (
          <Link
            href="/book/payment"
            className={`btn-primary py-2 px-6 ${!isStepComplete() ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Proceed to Payment
          </Link>
        )}
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export function BookingSteps() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading booking form...</div>}>
      <BookingStepsClient />
    </Suspense>
  );
}