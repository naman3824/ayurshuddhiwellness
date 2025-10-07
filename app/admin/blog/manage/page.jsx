'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ManageBlogsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Check admin key
  useEffect(() => {
    const key = searchParams.get('key');
    if (!key) {
      router.push('/');
      return;
    }
    fetchPosts();
  }, [searchParams, router]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog/posts/');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(postId);
      const response = await fetch(`/api/blog/posts/${postId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_key: searchParams.get('key')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove the post from the list
      setPosts(posts.filter(post => post.id !== postId));
      alert('Blog post deleted successfully!');
    } catch (err) {
      alert('Error deleting post: ' + err.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return '';
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Posts</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-400 mb-4 tracking-wide">
            📝 Manage Blog Posts
          </h1>
          <p className="text-gray-300 text-xl">
            View, edit, and delete your blog posts
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href={`/admin?key=${searchParams.get('key')}`}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors border border-gray-600 hover:border-gray-500"
          >
            ← Back to Dashboard
          </Link>
          <Link
            href={`/admin/blog/new?key=${searchParams.get('key')}`}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors border border-purple-500 hover:border-purple-400"
          >
            ✨ Write New Blog
          </Link>
          <button
            onClick={fetchPosts}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border border-blue-500 hover:border-blue-400"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No Blog Posts Found</h3>
            <p className="text-gray-500 mb-6">You haven't created any blog posts yet.</p>
            <Link
              href={`/admin/blog/new?key=${searchParams.get('key')}`}
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Your First Blog Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Post Image */}
                  {post.image_url && (
                    <div className="lg:w-48 lg:h-32 w-full h-48 flex-shrink-0">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-300 mb-3 line-clamp-3">
                          {getExcerpt(post.content)}
                        </p>
                        <div className="text-sm text-gray-400">
                          Published on {formatDate(post.created_at)}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:w-32">
                        <Link
                          href={`/en/blog/${post.id}`}
                          target="_blank"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center text-sm"
                        >
                          👁️ View
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deleteLoading === post.id}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          {deleteLoading === post.id ? '⏳' : '🗑️'} Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400">
            📝 Blog Management - Ayur Shuddhi Wellness
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ManageBlogsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <ManageBlogsPageContent />
    </Suspense>
  );
}