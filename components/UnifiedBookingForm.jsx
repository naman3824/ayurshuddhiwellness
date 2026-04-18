'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarDatePicker } from './CalendarDatePicker';
import { useAuth } from './AuthProvider';
import { db } from '../lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

// Services data
const services = [
  {
    name: 'Ayurveda',
    description: 'Restore balance and promote natural healing through time-tested therapies and personalized care.',
    price: '₹1,500',
    priceNum: 1500,
    duration: '60 min',
  },
  {
    name: 'Naturopathy',
    description: 'Harness the healing power of nature to restore and maintain your health with natural therapies.',
    price: '₹1,200',
    priceNum: 1200,
    duration: '45 min',
  },
  {
    name: 'Panchakarma',
    description: 'Experience profound detoxification and rejuvenation based on the ancient science of Ayurveda.',
    price: '₹2,500',
    priceNum: 2500,
    duration: '90 min',
  },
  {
    name: 'Pulse Diagnosis (Nadi Pariksha)',
    description: 'Assess your physical, mental, and emotional health through this powerful diagnostic tool.',
    price: '₹800',
    priceNum: 800,
    duration: '30 min',
  },
  {
    name: 'Tongue Diagnosis',
    description: 'Gain valuable insights into your overall health through traditional Ayurvedic assessment.',
    price: '₹800',
    priceNum: 800,
    duration: '30 min',
  },
  {
    name: 'Rakht Mokshan and Leech Therapy',
    description: 'Specialized blood purification treatment that is a vital part of Ayurvedic Panchakarma.',
    price: '₹1,800',
    priceNum: 1800,
    duration: '60 min',
  },
  {
    name: 'Agni Karma',
    description: 'Specialized Ayurvedic treatment using controlled therapeutic heat for chronic pain management.',
    price: '₹1,500',
    priceNum: 1500,
    duration: '45 min',
  },
  {
    name: 'Yoga, Pranayama, and Meditation',
    description: 'Bring balance, strength, and inner peace to your daily life through ancient practices.',
    price: '₹1,000',
    priceNum: 1000,
    duration: '60 min',
  },
  {
    name: 'Depression and Stress Management',
    description: 'Holistic approach to emotional and mental well-being through Ayurveda, Naturopathy, and Yogic practices.',
    price: '₹1,200',
    priceNum: 1200,
    duration: '60 min',
  },
];

// Available time slots
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
  '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
];

export function UnifiedBookingForm({ preSelectedService }) {
  const { currentUser } = useAuth();

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);

  // Form data across all steps
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    phone: '',
    email: currentUser?.email || '',
    service: preSelectedService || '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  // Selected service details
  const selectedService = services.find(s => s.name === formData.service);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ── Step 1 Validation ──
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time slot';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToReview = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── Step 2: Payment & Firestore save ──
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing (replace with Razorpay in production)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const confirmationNumber = 'AYR' + Math.floor(100000 + Math.random() * 900000);
      const paymentId = 'SIM_' + Date.now();

      // Save booking to Firestore
      try {
        const docRef = await addDoc(collection(db, 'bookings'), {
          userId: currentUser?.uid || '',
          serviceName: formData.service,
          appointmentDate: formData.date,
          appointmentTime: formData.time,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email || currentUser?.email || '',
          status: 'confirmed',
          paymentDetails: {
            paymentId,
            amount: selectedService?.priceNum || 0,
          },
          confirmationNumber,
          createdAt: serverTimestamp(),
        });
        console.log('Booking saved with ID:', docRef.id);

        // Trigger EmailJS Confirmation (booking receipt)
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey && serviceId !== 'your_service_id_here') {
          const templateParams = {
            to_name: formData.name,
            to_email: formData.email || currentUser?.email,
            service: formData.service,
            date: formData.date,
            time: formData.time,
            amount: selectedService?.price,
            confirmationNumber: confirmationNumber,
            timestamp: new Date().toLocaleString()
          };
          
          await emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(() => console.log('Booking receipt sent successfully'))
            .catch((err) => console.error('Failed to send booking receipt', err));
        }

      } catch (firestoreError) {
        console.error('Failed to save booking to Firestore:', firestoreError);
        // Continue — show confirmation even if Firestore fails
      }

      // Move to confirmation step
      setConfirmationData({
        confirmationNumber,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        price: selectedService?.price || '',
      });
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Step Progress Bar ──
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {['Details', 'Review & Pay', 'Confirmed'].map((label, i) => {
        const stepNum = i + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : isActive
                    ? 'bg-green-600/20 border-green-500 text-green-400'
                    : 'bg-gray-700 border-gray-600 text-gray-400'
              }`}>
                {isCompleted ? '✓' : stepNum}
              </div>
              <span className={`mt-1.5 text-xs font-medium ${
                isActive || isCompleted ? 'text-green-400' : 'text-gray-500'
              }`}>{label}</span>
            </div>
            {i < 2 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-2 mb-5 transition-all duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-600'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ══════════════════════════════════════════════
  // STEP 1: Booking Form
  // ══════════════════════════════════════════════
  const renderStep1 = () => (
    <form onSubmit={handleNextToReview} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="form-label">Full Name *</label>
        <input
          type="text" id="name" name="name"
          value={formData.name} onChange={handleInputChange}
          className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="form-label">Phone Number *</label>
        <input
          type="tel" id="phone" name="phone"
          value={formData.phone} onChange={handleInputChange}
          className={`form-input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="form-label">Select Service *</label>
        <select
          id="service" name="service"
          value={formData.service} onChange={handleInputChange}
          className={`form-input ${errors.service ? 'border-red-500 focus:ring-red-500' : ''}`}
        >
          <option value="">Choose a service...</option>
          {services.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} - {s.price} ({s.duration})
            </option>
          ))}
        </select>

        {selectedService && (
          <div className="mt-3 p-4 bg-gray-700/50 rounded-xl border border-primary-200/30">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-white">{selectedService.name}</h4>
                <p className="text-sm text-gray-300 mt-1">{selectedService.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-400">{selectedService.price}</div>
                <div className="text-sm text-gray-400">{selectedService.duration}</div>
              </div>
            </div>
          </div>
        )}
        {errors.service && <p className="mt-1 text-sm text-red-400">{errors.service}</p>}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="form-label">Preferred Date *</label>
        <CalendarDatePicker
          value={formData.date}
          onChange={handleInputChange}
          error={errors.date}
          className="w-full"
        />
      </div>

      {/* Time */}
      <div>
        <label htmlFor="time" className="form-label">Preferred Time *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeSlots.map((time) => (
            <label
              key={time}
              className={`relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                formData.time === time
                  ? 'border-primary-500 bg-primary-900/20 text-primary-300'
                  : 'border-gray-600 bg-gray-800 hover:border-primary-400'
              }`}
            >
              <input
                type="radio" name="time" value={time}
                checked={formData.time === time}
                onChange={handleInputChange}
                className="sr-only"
              />
              <span className="text-sm font-medium">{time}</span>
            </label>
          ))}
        </div>
        {errors.time && <p className="mt-1 text-sm text-red-400">{errors.time}</p>}
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button type="submit" className="w-full btn-primary text-lg py-4">
          Review &amp; Continue →
        </button>
      </div>
    </form>
  );

  // ══════════════════════════════════════════════
  // STEP 2: Review & Payment
  // ══════════════════════════════════════════════
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/60 rounded-2xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Booking Summary</h3>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors text-sm"
              >
                ← Edit Details
              </button>
            </div>

            <div className="space-y-6">
              {/* Personal Info */}
              <div className="border-b border-gray-700 pb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-medium text-white">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="font-medium text-white">{formData.phone}</p>
                  </div>
                  {formData.email && (
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-white">{formData.email}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Service */}
              <div className="border-b border-gray-700 pb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Service</h4>
                {selectedService && (
                  <div className="bg-gray-700/40 rounded-xl p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-semibold text-white">{selectedService.name}</h5>
                      <p className="text-sm text-gray-300 mt-1">{selectedService.description}</p>
                      <span className="inline-block mt-2 text-xs bg-accent-900/30 text-accent-300 px-2.5 py-1 rounded-full">
                        Duration: {selectedService.duration}
                      </span>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-primary-400">{selectedService.price}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Appointment */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Appointment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium text-white">{formatDate(formData.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium text-white">{formData.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl border border-gray-600/50 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Payment Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between"><span className="text-gray-300">Service Fee</span><span className="text-white font-medium">{selectedService?.price}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Platform Fee</span><span className="text-white font-medium">₹0</span></div>
              <div className="border-t border-gray-600 pt-4 flex justify-between">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-primary-400">{selectedService?.price}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full btn-primary text-lg py-4 mb-4 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                '💳 Pay Now'
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              This is a placeholder payment button. No actual payment will be processed.
            </p>

            <div className="mt-6 pt-6 border-t border-gray-600">
              <h4 className="font-medium text-white mb-3">We Accept</h4>
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-lg p-2 shadow-sm"><div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">💳</div></div>
                <div className="bg-white rounded-lg p-2 shadow-sm"><div className="w-8 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">🏦</div></div>
                <div className="bg-white rounded-lg p-2 shadow-sm"><div className="w-8 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded text-white text-xs flex items-center justify-center font-bold">📱</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════
  // STEP 3: Confirmation
  // ══════════════════════════════════════════════
  const renderStep3 = () => (
    <div className="text-center py-8">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-green-900/50 p-5 border border-green-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
      <p className="text-gray-300 text-lg mb-8">
        Your consultation has been successfully scheduled. We look forward to seeing you.
      </p>

      {confirmationData && (
        <div className="max-w-md mx-auto bg-gray-800/60 rounded-2xl border border-gray-700/50 p-6 text-left mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">Confirmation Number</p>
              <p className="font-bold text-green-400 text-lg">{confirmationData.confirmationNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Service</p>
              <p className="font-medium text-white">{confirmationData.service}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-medium text-white">{formatDate(confirmationData.date)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="font-medium text-white">{confirmationData.time}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Amount Paid</p>
              <p className="font-medium text-white">{confirmationData.price}</p>
            </div>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="inline-block btn-primary py-3 px-8 text-lg"
      >
        Return to Home
      </Link>
    </div>
  );

  // ── Main Render ──
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-accent-900/10 rounded-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-white mb-3">
            {currentStep === 3 ? '' : 'Book Your Consultation'}
          </h2>
          {currentStep < 3 && (
            <p className="text-gray-300 text-lg">
              Take the first step towards holistic wellness
            </p>
          )}
        </div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>
    </div>
  );
}