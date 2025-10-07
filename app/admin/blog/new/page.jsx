'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminProtection from '../../components/AdminProtection';
import { validateFileClient, secureFileToBase64 } from '../../../../utils/secureFileUpload';
import { CSRFManager } from '../../../../utils/csrf';

function NewBlogPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Initialize CSRF token
  useEffect(() => {
    const initCSRF = async () => {
      try {
        const response = await fetch('/api/csrf/');
        const data = await response.json();
        if (data.success) {
          setCsrfToken(data.token);
          CSRFManager.setToken(data.token);
        }
      } catch (error) {
        console.error('Failed to initialize CSRF token:', error);
      }
    };
    
    initCSRF();
  }, []);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateFileClient(file);
      if (!validation.success) {
        setMessage(`Error: File validation failed: ${validation.error}`);
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setMessage(''); // Clear any previous error messages
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validate required fields
    if (!title.trim() || !content.trim()) {
      setMessage('Error: Title and content are required');
      setIsLoading(false);
      return;
    }

    try {
      let imageData = null;
      let filename = null;
      let mimeType = null;
      
      // If file selected, convert to base64
      if (selectedFile) {
        imageData = await secureFileToBase64(selectedFile);
        filename = selectedFile.name;
        mimeType = selectedFile.type;
      }

      const response = await fetch('/api/blog/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_key: searchParams.get('key'),
          title: title.trim(),
          content: content.trim(),
          image_url: imageData,
          filename,
          mimeType,
          csrf_token: csrfToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Blog post created successfully!');
        // Reset form
        setTitle('');
        setContent('');
        setSelectedFile(null);
        setImagePreview('');
        
        // Reset file input
        const fileInput = document.getElementById('featuredImage');
        if (fileInput) fileInput.value = '';

        // Redirect to blog listing after a short delay
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        setMessage(`Error: ${data.error || 'Failed to create blog post'}`);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage('Error: Failed to create blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Simple formatting functions for the textarea
  const insertFormatting = (format) => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText || 'bold text'}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText || 'italic text'}</em>`;
        break;
      case 'h2':
        formattedText = `<h2>${selectedText || 'Heading 2'}</h2>`;
        break;
      case 'h3':
        formattedText = `<h3>${selectedText || 'Heading 3'}</h3>`;
        break;
      case 'p':
        formattedText = `<p>${selectedText || 'paragraph text'}</p>`;
        break;
      case 'ul':
        formattedText = `<ul><li>${selectedText || 'list item'}</li></ul>`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Blog Post</h1>
            <p className="text-gray-400">Write and publish a new blog post for your website.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your blog post title..."
                required
              />
            </div>

            {/* Featured Image */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image (Optional)
              </label>
              <input
                type="file"
                id="featuredImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-400 mt-2">
                Upload a featured image for your blog post (max 5MB, image files only)
              </p>
              
              {/* Image Preview */}
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

            {/* Content Editor */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Blog Content *
              </label>
              
              {/* Simple Formatting Toolbar */}
              <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-700 rounded-lg border border-gray-600">
                <button
                  type="button"
                  onClick={() => insertFormatting('bold')}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm font-bold"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('italic')}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm italic"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('h2')}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('h3')}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm"
                  title="Heading 3"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('p')}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm"
                  title="Paragraph"
                >
                  P
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('ul')}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm"
                  title="Bullet List"
                >
                  UL
                </button>
              </div>

              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Write your blog content here... You can use HTML tags for formatting."
                required
              />
              <p className="text-sm text-gray-400 mt-2">
                You can use HTML tags for formatting. Use the toolbar buttons above to insert common formatting.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Publish Blog Post</span>
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
    </AdminProtection>
  );
}

export default function NewBlogPost() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <NewBlogPostContent />
    </Suspense>
  );
}