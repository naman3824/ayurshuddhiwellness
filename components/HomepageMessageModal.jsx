'use client';

import { useState, useEffect } from 'react';

export default function HomepageMessageModal({ messages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    // Show the newest message
    const latest = messages[0];

    // Check sessionStorage to prevent showing the same message again this session
    try {
      const dismissedId = sessionStorage.getItem('dismissedMessageId');
      if (dismissedId === latest.id) return;
    } catch {
      // sessionStorage unavailable (SSR / incognito restrictions) — show anyway
    }

    setActiveMessage(latest);
    setIsOpen(true);
  }, [messages]);

  const handleClose = () => {
    setIsOpen(false);
    if (activeMessage) {
      try {
        sessionStorage.setItem('dismissedMessageId', activeMessage.id);
      } catch {
        // sessionStorage unavailable
      }
    }
  };

  if (!isOpen || !activeMessage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-lg bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border border-primary-700/40 rounded-2xl shadow-2xl overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/80 hover:bg-red-600 text-gray-300 hover:text-white transition-all duration-200"
          aria-label="Close announcement"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-900/50 text-primary-300 border border-primary-700/40">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
              Announcement
            </span>
          </div>

          {/* Title */}
          {activeMessage.title && (
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
              {activeMessage.title}
            </h2>
          )}

          {/* Body: image or text */}
          {activeMessage.message_type === 'image' && activeMessage.image_url ? (
            <div className="rounded-xl overflow-hidden border border-gray-700/50">
              <img
                src={activeMessage.image_url}
                alt={activeMessage.title || 'Announcement'}
                className="w-full object-cover max-h-72"
              />
            </div>
          ) : (
            activeMessage.content && (
              <p className="text-gray-300 leading-relaxed text-base">
                {activeMessage.content}
              </p>
            )
          )}

          {/* Footer with date */}
          {activeMessage.createdAt && (
            <p className="mt-5 text-xs text-gray-500">
              {new Date(activeMessage.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
