'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { useAuth } from '../../../../components/AuthProvider';
import { db } from '../../../../lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import DOMPurify from 'dompurify';

// Dynamically import the editor to avoid SSR issues with Tiptap
const RichTextEditor = dynamic(
  () => import('../../../../components/RichTextEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">Loading editor...</div>
      </div>
    ),
  }
);

function NewBlogPostContent() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!title.trim()) {
      setMessage('Error: Title is required.');
      setIsLoading(false);
      return;
    }

    const textContent = content.replace(/<[^>]*>/g, '').trim();
    if (!textContent) {
      setMessage('Error: Blog content is required.');
      setIsLoading(false);
      return;
    }

    try {
      const sanitizedContent = DOMPurify.sanitize(content, {
        ADD_TAGS: ['img'],
        ADD_ATTR: ['src', 'alt', 'class', 'target', 'rel', 'href'],
      });

      const blogData = {
        title: title.trim(),
        content: sanitizedContent,
        authorId: currentUser?.uid || '',
        authorName: currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Anonymous',
        authorEmail: currentUser?.email || '',
        image_url: '', // featured images are now inline via Cloudinary
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'blogs'), blogData);

      setMessage('Published! Redirecting...');
      setTimeout(() => router.push('/en/blog'), 1200);
    } catch {
      setMessage('Error: Failed to publish. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        {/* Top bar */}
        <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              Back
            </button>

            <div className="flex items-center gap-3">
              {message && (
                <span className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                  {message}
                </span>
              )}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                    Publishing...
                  </>
                ) : (
                  'Publish'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Editor area */}
        <div className="max-w-3xl mx-auto px-4 pt-12 pb-32">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-4xl sm:text-5xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-600 mb-8 leading-tight"
          />

          {/* Divider */}
          <div className="w-16 h-0.5 bg-gray-700 mb-8"></div>

          {/* Content editor */}
          <RichTextEditor content={content} onChange={setContent} />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function NewBlogPost() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-400 border-t-transparent mx-auto mb-3"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <NewBlogPostContent />
    </Suspense>
  );
}