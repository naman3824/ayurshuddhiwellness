'use client';

import { useState, useEffect } from 'react';

export function TimeSlotSelector({ selectedDate, selectedTime, onSelectTime }) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [morningSlots, setMorningSlots] = useState([]);
  const [afternoonSlots, setAfternoonSlots] = useState([]);
  const [eveningSlots, setEveningSlots] = useState([]);

  // Generate mock time slots for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    // In a real implementation, you would fetch available time slots from an API
    // For now, we'll generate mock time slots
    const mockTimeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
      '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
    ];

    // Randomly make some time slots unavailable
    const availableSlots = mockTimeSlots.filter(() => Math.random() > 0.3);
    setAvailableTimeSlots(availableSlots);

    // Separate time slots by time of day
    setMorningSlots(availableSlots.filter(slot => slot.includes('AM')));
    setAfternoonSlots(availableSlots.filter(slot => slot.includes('12:') || slot.includes('2:') || slot.includes('3:')));
    setEveningSlots(availableSlots.filter(slot => slot.includes('4:') || slot.includes('5:') || slot.includes('6:')));
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select a Time</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Choose an available time slot for {selectedDate}
        </p>
      </div>

      <div className="space-y-6">
        {/* Morning time slots */}
        {morningSlots.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Morning</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {morningSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`
                    py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedTime === time
                      ? 'bg-gradient-wellness text-white shadow-soft'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/30 border border-gray-200 dark:border-gray-700'}
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Afternoon time slots */}
        {afternoonSlots.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Afternoon</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {afternoonSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`
                    py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedTime === time
                      ? 'bg-gradient-wellness text-white shadow-soft'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/30 border border-gray-200 dark:border-gray-700'}
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Evening time slots */}
        {eveningSlots.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Evening</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {eveningSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`
                    py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedTime === time
                      ? 'bg-gradient-wellness text-white shadow-soft'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/30 border border-gray-200 dark:border-gray-700'}
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No available time slots */}
        {availableTimeSlots.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No available time slots for the selected date. Please select a different date.
            </p>
          </div>
        )}
      </div>

      {selectedTime && (
        <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
          <p className="text-sm text-primary-800 dark:text-primary-300">
            <span className="font-medium">Selected time:</span> {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}