'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '../components/AdminProtection';
import { useAuth } from '../../../components/AuthProvider';
import { db } from '../../../lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function PostMessageContent() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [messageType, setMessageType] = useState('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file selection and preview
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
    setLoading(true);
    setMessage('');

    // Validate
    if (messageType === 'text' && !content.trim()) {
      setMessage('Error: Message content is required.');
      setLoading(false);
      return;
    }
    if (messageType === 'image' && !imagePreview) {
      setMessage('Error: Please select an image.');
      setLoading(false);
      return;
    }

    try {
      const docData = {
        title: title.trim() || '',
        content: content.trim(),
        message_type: messageType,
        image_url: messageType === 'image' ? imagePreview : '',
        createdBy: currentUser?.uid || '',
        createdAt: serverTimestamp(),
        isActive: true,
      };

      await addDoc(collection(db, 'homepage_messages'), docData);

      setMessage('Message posted successfully!');
      // Reset form
      setTitle('');
      setContent('');
      setSelectedFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error posting message:', error);
      setMessage('Error: Failed to create message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-green-400">📝 Post a Message</h1>
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors border border-gray-500"
              >
                ← Back to Dashboard
              </button>
            </div>
            <p className="text-gray-300 mt-2">Create announcements for the homepage</p>
          </div>

          {/* Message Form */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message Type Selection */}
              <div>
                <label className="block text-sm font-medium text-green-400 mb-3">
                  Message Type
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="text"
                      checked={messageType === 'text'}
                      onChange={(e) => setMessageType(e.target.value)}
                      className="mr-3 w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500"
                    />
                    <span className="text-gray-200 font-medium">📄 Text Message</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="image"
                      checked={messageType === 'image'}
                      onChange={(e) => setMessageType(e.target.value)}
                      className="mr-3 w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500"
                    />
                    <span className="text-gray-200 font-medium">🖼️ Image</span>
                  </label>
                </div>
              </div>

              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-green-400 mb-2">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 transition-colors"
                  placeholder="Enter message title..."
                />
              </div>

              {/* Content Field (for text messages) */}
              {messageType === 'text' && (
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-green-400 mb-2">
                    Message Content *
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 transition-colors resize-vertical"
                    placeholder="Enter your announcement message..."
                    required
                  />
                  <p className="text-gray-400 text-xs mt-1">This message will appear as a popup on the homepage</p>
                </div>
              )}

              {/* Image File Upload (for image messages) */}
              {messageType === 'image' && (
                <div>
                  <label htmlFor="imageFile" className="block text-sm font-medium text-green-400 mb-2">
                    Select Image File *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 transition-colors"
                      required
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Choose an image file from your device (max 5MB, formats: JPG, PNG, GIF, WebP)
                  </p>
                  
                  {/* File Info */}
                  {selectedFile && (
                    <div className="mt-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                      <div className="flex items-center text-sm text-gray-300">
                        <span className="text-green-400 mr-2">📁</span>
                        <span className="font-medium">{selectedFile.name}</span>
                        <span className="ml-2 text-gray-400">
                          ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                      <p className="text-sm text-green-400 mb-3 font-medium">🖼️ Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full h-auto max-h-64 rounded-lg border border-gray-600 shadow-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors font-medium shadow-lg border border-green-500 hover:border-green-400"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </span>
                  ) : (
                    '🚀 Post Message'
                  )}
                </button>
              </div>
            </form>

            {/* Status Message */}
            {message && (
              <div className={`mt-6 p-4 rounded-lg border ${
                message.includes('Error') || message.includes('Failed')
                  ? 'bg-red-900 text-red-200 border-red-700'
                  : 'bg-green-900 text-green-200 border-green-700'
              }`}>
                <div className="flex items-center">
                  <span className="mr-2">
                    {message.includes('Error') || message.includes('Failed') ? '❌' : '✅'}
                  </span>
                  {message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminProtection>
  );
}

export default function PostMessage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <PostMessageContent />
    </Suspense>
  );
}