'use client';

import { useState, useEffect } from 'react';

export function CalendarSelector({ selectedDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate the number of days to show from the previous month
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    
    // Generate array of days for the calendar
    const days = [];
    
    // Add days from the previous month
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(year, month - 1, lastDayOfPrevMonth - i + 1);
      days.push({
        date,
        day: lastDayOfPrevMonth - i + 1,
        isCurrentMonth: false,
        isAvailable: false,
      });
    }
    
    // Add days from the current month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      // Check if the date is in the future and is a weekday (Mon-Fri)
      const isAvailable = date >= today && date.getDay() !== 0 && date.getDay() !== 6;
      
      days.push({
        date,
        day: i,
        isCurrentMonth: true,
        isAvailable,
      });
    }
    
    // Add days from the next month to complete the calendar grid
    const daysToAdd = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= daysToAdd; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        isCurrentMonth: false,
        isAvailable: false,
      });
    }
    
    setCalendarDays(days);
  }, [currentMonth]);

  // Function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Function to handle date selection
  const handleDateSelect = (day) => {
    if (day.isAvailable) {
      onSelectDate(formatDate(day.date));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select a Date</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Choose an available date for your consultation
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft overflow-hidden">
        {/* Calendar header */}
        <div className="flex items-center justify-between px-6 py-4 bg-primary-50 dark:bg-primary-900/30">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Calendar grid */}
        <div className="p-4">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isSelected = selectedDate === formatDate(day.date);
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  disabled={!day.isAvailable}
                  className={`
                    py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                    ${day.isAvailable && !isSelected ? 'hover:bg-primary-50 dark:hover:bg-primary-900/30 text-gray-900 dark:text-white' : ''}
                    ${isSelected ? 'bg-gradient-wellness text-white shadow-soft' : ''}
                    ${!day.isAvailable && day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                    ${!day.isAvailable ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {day.day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
          <p className="text-sm text-primary-800 dark:text-primary-300">
            <span className="font-medium">Selected date:</span> {selectedDate}
          </p>
        </div>
      )}
    </div>
  );
}