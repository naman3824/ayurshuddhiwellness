'use client';

import { useState, useEffect, useRef } from 'react';

export function CalendarDatePicker({ value, onChange, className = '', error = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update internal state when value prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }, [value]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Check if date is available (not Sunday, not in past)
  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Skip Sundays (0 = Sunday) and past dates
    return date.getDay() !== 0 && date >= today;
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      const dateString = date.toISOString().split('T')[0];
      onChange({ target: { name: 'date', value: dateString } });
      setIsOpen(false);
    }
  };

  // Navigate months
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Format display date
  const formatDisplayDate = (date) => {
    if (!date) return 'Select a date...';
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      {/* Input field that shows selected date */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`form-input text-left flex items-center justify-between ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
      >
        <span className={selectedDate ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
          {formatDisplayDate(selectedDate)}
        </span>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-ivory-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-warm p-4 z-50 animate-fade-in">
          {/* Month/Year header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {months[currentMonth]} {currentYear}
            </h3>
            
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-10"></div>;
              }

              const date = new Date(currentYear, currentMonth, day);
              const isToday = 
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              
              const isSelected = 
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
              
              const isAvailable = isDateAvailable(date);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  disabled={!isAvailable}
                  className={`
                    h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200
                    ${isSelected 
                      ? 'bg-primary-500 text-white shadow-glow' 
                      : isToday
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : isAvailable
                      ? 'text-gray-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20 hover-scale'
                      : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Helper text */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            Sundays are not available for appointments
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
} 