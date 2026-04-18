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
      <div className="border border-gray-600 rounded-xl bg-gray-800/50 min-h-[400px] flex items-center justify-center">
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle featured image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage('Error: Please select a valid image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Error: Image must be smaller than 5MB.');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validate
    if (!title.trim()) {
      setMessage('Error: Title is required.');
      setIsLoading(false);
      return;
    }

    // Strip HTML and check if content is empty
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    if (!textContent) {
      setMessage('Error: Blog content is required.');
      setIsLoading(false);
      return;
    }

    try {
      // Sanitize the HTML content to prevent XSS
      const sanitizedContent = DOMPurify.sanitize(content, {
        ADD_TAGS: ['img'],
        ADD_ATTR: ['src', 'alt', 'class', 'target', 'rel', 'href'],
      });

      // Build the blog document
      const blogData = {
        title: title.trim(),
        content: sanitizedContent,
        authorId: currentUser?.uid || '',
        authorName: currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Anonymous',
        authorEmail: currentUser?.email || '',
        image_url: imagePreview || '', // base64 for now; upgrade to Storage URL later
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'blogs'), blogData);
      console.log('Blog post saved with ID:', docRef.id);

      setMessage('Blog post published successfully! Redirecting...');
      setTimeout(() => router.push('/en/blog'), 1500);
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage('Error: Failed to publish blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Blog Post</h1>
            <p className="text-gray-400">
              Write and publish a new blog post. Use the rich text editor for formatting.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your blog post title..."
                required
              />
            </div>

            {/* Featured Image */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image (Optional)
              </label>
              <input
                type="file"
                id="featuredImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-400 mt-2">Max 5MB, image files only</p>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Featured image preview"
                    className="max-w-xs max-h-48 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Blog Content *
              </label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>✨ Publish Blog Post</span>
                )}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('Error')
                  ? 'bg-red-900/50 border border-red-700 text-red-300'
                  : 'bg-green-900/50 border border-green-700 text-green-300'
              }`}>
                {message}
              </div>
            )}
          </form>
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