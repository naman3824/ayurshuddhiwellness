'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MandalaDecoration } from '../../../components/MandalaDecoration';

export default function BlogPage({ params }) {
  const { lang } = use(params);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content, maxLength = 200) => {
    if (!content) return '';
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-red-400">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative Elements */}
      <MandalaDecoration 
        className="absolute top-20 right-10 text-primary-800" 
        size="lg" 
        opacity="low" 
      />
      <MandalaDecoration 
        className="absolute bottom-20 left-10 text-accent-800" 
        size="md" 
        opacity="low" 
      />

      <div className="relative container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-indian mb-6">
            Our Blog
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover insights on wellness, Ayurveda, and holistic health practices to enhance your journey to well-being.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-400">
              Check back soon for wellness insights and Ayurvedic wisdom.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-gray-800 rounded-2xl shadow-soft hover:shadow-warm transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                {/* Featured Image */}
                {post.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                    <Link href={`/${lang}/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {getExcerpt(post.content)}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-700">A</span>
                      </div>
                      <span>Admin</span>
                    </div>
                    <time dateTime={post.created_at}>
                      {formatDate(post.created_at)}
                    </time>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <Link 
                      href={`/${lang}/blog/${post.id}`}
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors duration-300"
                    >
                      Read more
                      <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}