'use client';

import { useState, useEffect } from 'react';

export default function AdminMessagePopup() {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages/');
      const data = await response.json();
      
      if (response.ok && data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Error fetching admin messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  const nextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      closePopup();
    }
  };

  const previousMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
    }
  };

  if (isLoading || !isVisible || messages.length === 0) {
    return null;
  }

  const currentMessage = messages[currentMessageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 z-10 bg-gray-800 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90 transition-all"
          aria-label="Close message"
        >
          ✕
        </button>

        {/* Message Content */}
        <div className="p-6">
          {/* Title */}
          {currentMessage.title && (
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pr-8">
              {currentMessage.title}
            </h2>
          )}

          {/* Text Message */}
          {currentMessage.message_type === 'text' && currentMessage.content && (
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {currentMessage.content}
              </p>
            </div>
          )}

          {/* Image Message */}
          {currentMessage.message_type === 'image' && currentMessage.image_url && (
            <div className="flex justify-center">
              <img
                src={currentMessage.image_url}
                alt={currentMessage.title || 'Admin Message'}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Navigation (if multiple messages) */}
        {messages.length > 1 && (
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
            <button
              onClick={previousMessage}
              disabled={currentMessageIndex === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <span className="text-gray-600">
              {currentMessageIndex + 1} of {messages.length}
            </span>
            
            <button
              onClick={nextMessage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {currentMessageIndex < messages.length - 1 ? 'Next' : 'Close'}
            </button>
          </div>
        )}

        {/* Single message close button */}
        {messages.length === 1 && (
          <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
            <button
              onClick={closePopup}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}