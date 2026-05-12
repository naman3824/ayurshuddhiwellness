'use client';

import { useState, useCallback } from 'react';

export default function ShareButton({ title, text, url, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: title || 'Ayur Shuddhi Wellness',
      text: text || '',
      url: url || window.location.href,
    };

    // Try native Web Share API first (HTTPS only)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or API not available — fall through to clipboard
      }
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Final fallback for old browsers
      const textarea = document.createElement('textarea');
      textarea.value = shareData.url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [title, text, url]);

  return (
    <button
      onClick={handleShare}
      title={copied ? 'Link copied!' : 'Share this post'}
      className={`group relative inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 ${className}`}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs text-green-400 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="text-xs font-medium">Share</span>
        </>
      )}
    </button>
  );
}
