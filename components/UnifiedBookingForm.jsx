'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MandalaPattern } from './MandalaDecoration';
import { CalendarDatePicker } from './CalendarDatePicker';

// Services data (matching the structure from ServiceSelector)
const services = [
  {
    name: 'Ayurveda',
    description: 'Restore balance and promote natural healing through time-tested therapies and personalized care.',
    price: '₹1,500',
    duration: '60 min',
  },
  {
    name: 'Naturopathy',
    description: 'Harness the healing power of nature to restore and maintain your health with natural therapies.',
    price: '₹1,200',
    duration: '45 min',
  },
  {
    name: 'Panchakarma',
    description: 'Experience profound detoxification and rejuvenation based on the ancient science of Ayurveda.',
    price: '₹2,500',
    duration: '90 min',
  },
  {
    name: 'Pulse Diagnosis (Nadi Pariksha)',
    description: 'Assess your physical, mental, and emotional health through this powerful diagnostic tool.',
    price: '₹800',
    duration: '30 min',
  },
  {
    name: 'Tongue Diagnosis',
    description: 'Gain valuable insights into your overall health through traditional Ayurvedic assessment.',
    price: '₹800',
    duration: '30 min',
  },
  {
    name: 'Rakht Mokshan and Leech Therapy',
    description: 'Specialized blood purification treatment that is a vital part of Ayurvedic Panchakarma.',
    price: '₹1,800',
    duration: '60 min',
  },
  {
    name: 'Agni Karma',
    description: 'Specialized Ayurvedic treatment using controlled therapeutic heat for chronic pain management.',
    price: '₹1,500',
    duration: '45 min',
  },
  {
    name: 'Yoga, Pranayama, and Meditation',
    description: 'Bring balance, strength, and inner peace to your daily life through ancient practices.',
    price: '₹1,000',
    duration: '60 min',
  },
  {
    name: 'Depression and Stress Management',
    description: 'Holistic approach to emotional and mental well-being through Ayurveda, Naturopathy, and Yogic practices.',
    price: '₹1,200',
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
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: preSelectedService || '',
    date: '',
    time: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get selected service details for price display
  const selectedServiceDetails = services.find(s => s.name === formData.service);

  // Generate available dates (next 30 days, excluding Sundays)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to review page with booking data
      const bookingData = {
        ...formData,
        serviceDetails: selectedServiceDetails
      };
      
      // Store in sessionStorage for the review page
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
      
      router.push('/book/review');
    } catch (error) {
      // Handle booking submission error silently in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Booking submission error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-ivory-100 via-ivory-50 to-sage-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-warm border border-primary-100/20 dark:border-gray-700/50 overflow-hidden">
      <MandalaPattern />
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gradient-indian mb-4">
            Book Your Consultation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fill in your details below to schedule your wellness journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="form-label">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Service Selection */}
          <div>
            <label htmlFor="service" className="form-label">
              Select Service *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`form-input ${errors.service ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="">Choose a service...</option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} - {service.price} ({service.duration})
                </option>
              ))}
            </select>
            
            {/* Service Price Display */}
            {selectedServiceDetails && (
              <div className="mt-3 p-4 bg-primary-50 dark:bg-gray-700/50 rounded-xl border border-primary-200/30">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {selectedServiceDetails.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {selectedServiceDetails.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {selectedServiceDetails.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedServiceDetails.duration}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {errors.service && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service}</p>
            )}
          </div>

          {/* Date Selection with Interactive Calendar */}
          <div>
            <label htmlFor="date" className="form-label">
              Preferred Date *
            </label>
            <CalendarDatePicker
              value={formData.date}
              onChange={handleInputChange}
              error={errors.date}
              className="w-full"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label htmlFor="time" className="form-label">
              Preferred Time *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <label
                  key={time}
                  className={`relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.time === time
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-primary-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="time"
                    value={time}
                    checked={formData.time === time}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{time}</span>
                </label>
              ))}
            </div>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.time}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary text-lg py-4 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
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
                  <span>Processing...</span>
                </div>
              ) : (
                'Review & Continue →'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 