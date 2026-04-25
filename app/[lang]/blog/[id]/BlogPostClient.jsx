'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { MandalaDecoration } from '../../../../components/MandalaDecoration';
import BlogEngagement from '../../../../components/BlogEngagement';
import ShareButton from '../../../../components/ShareButton';

export default function BlogPostClient({ id, lang }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/blogs/${id}`);
      if (!res.ok) throw new Error('Blog post not found');
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-400 border-t-transparent mx-auto mb-3"></div>
            <p className="mt-4 text-gray-400">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-400 mb-8">
              {error || 'The blog post you are looking for does not exist.'}
            </p>
            <Link 
              href={`/${lang}/blog`}
              className="btn btn-primary"
            >
              ← Back to Blog
            </Link>
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

      <div className="relative container mx-auto px-4 py-8">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Link 
            href={`/${lang}/blog`}
            className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors duration-300"
          >
            <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {post.image_url && (
            <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-warm">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-indian mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {post.authorName?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{post.authorName || 'Author'}</p>
                  <p className="text-sm">Author</p>
                </div>
              </div>
              <div className="h-6 w-px bg-gray-600"></div>
              <time dateTime={post.createdAt} className="text-sm">
                {formatDate(post.createdAt)}
              </time>
              <div className="h-6 w-px bg-gray-600"></div>
              <ShareButton
                title={post.title}
                text={`Check out this article: ${post.title}`}
                url={typeof window !== 'undefined' ? window.location.href : ''}
              />
            </div>
          </header>

          {/* Content — rendered with Tailwind Typography */}
          <div className="bg-gray-800 rounded-2xl shadow-soft p-8 md:p-12">
            <div 
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white
                prose-headings:font-display prose-headings:font-bold
                prose-p:text-gray-300
                prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary-400
                prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-gray-300
                prose-ol:text-gray-300
                prose-li:text-gray-300
                prose-blockquote:border-primary-700
                prose-blockquote:bg-primary-900/20
                prose-blockquote:rounded-lg prose-blockquote:p-4
                prose-code:text-primary-400
                prose-code:bg-primary-900/30
                prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-img:rounded-xl prose-img:shadow-lg
                prose-hr:border-gray-600"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />
          </div>

          {/* Engagement: Likes, Dislikes, Comments */}
          <BlogEngagement blogId={id} />

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Published on {formatDate(post.createdAt)}
              </div>
              <Link 
                href={`/${lang}/blog`}
                className="btn btn-outline"
              >
                View All Posts
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
