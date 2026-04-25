'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

// ─── Toast Component ───
function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    info: 'bg-blue-900/90 border-blue-500 text-blue-200',
    success: 'bg-green-900/90 border-green-500 text-green-200',
    error: 'bg-red-900/90 border-red-500 text-red-200',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg border backdrop-blur-sm shadow-2xl transition-all animate-slide-up ${colors[type]}`}>
      {message}
    </div>
  );
}

// ─── Time Ago Helper ───
function timeAgo(dateString) {
  if (!dateString) return '';
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function BlogEngagement({ blogId }) {
  const { currentUser } = useAuth();
  const [engagement, setEngagement] = useState({ likes: 0, dislikes: 0, userLiked: false, userDisliked: false });
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  // Fetch engagement counts
  useEffect(() => {
    const fetchEngagement = async () => {
      try {
        const userId = currentUser?.uid || '';
        const res = await fetch(`/api/blogs/${blogId}/engagement?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setEngagement(data);
        }
      } catch {
        // Silently fail — counts will show 0
      }
    };
    fetchEngagement();
  }, [blogId, currentUser]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await fetch(`/api/blogs/${blogId}/comments`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        }
      } catch {
        // Silently fail
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [blogId]);

  // ── Like/Dislike handler (sends Auth token) ──
  const handleVote = async (action) => {
    if (!currentUser) {
      showToast('Please log in to interact with posts', 'error');
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`/api/blogs/${blogId}/engagement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        const data = await res.json();
        setEngagement(data);
      } else {
        showToast('Failed to update. Please try again.', 'error');
      }
    } catch {
      showToast('Something went wrong.', 'error');
    }
  };

  // ── Comment submit handler (sends Auth token) ──
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please log in to comment', 'error');
      return;
    }
    if (!commentText.trim()) return;

    try {
      setSubmitting(true);
      const token = await currentUser.getIdToken();
      const res = await fetch(`/api/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]);
        setCommentText('');
        showToast('Comment posted!', 'success');
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to post comment', 'error');
      }
    } catch {
      showToast('Something went wrong.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10 space-y-8">
      {/* ── Like / Dislike Bar ── */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleVote('like')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
            engagement.userLiked
              ? 'bg-green-900/40 border-green-500 text-green-400'
              : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-400'
          }`}
        >
          <svg className="w-5 h-5" fill={engagement.userLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
          <span className="text-sm font-semibold">{engagement.likes}</span>
        </button>

        <button
          onClick={() => handleVote('dislike')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
            engagement.userDisliked
              ? 'bg-red-900/40 border-red-500 text-red-400'
              : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400'
          }`}
        >
          <svg className="w-5 h-5 rotate-180" fill={engagement.userDisliked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
          <span className="text-sm font-semibold">{engagement.dislikes}</span>
        </button>
      </div>

      {/* ── Comments Section ── */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6">
          Comments {comments.length > 0 && <span className="text-gray-500 font-normal text-base">({comments.length})</span>}
        </h3>

        {/* Comment form */}
        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">
                  {currentUser.displayName?.charAt(0)?.toUpperCase() || currentUser.email?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  maxLength={1000}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-500 resize-none transition-colors"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{commentText.length}/1000</span>
                  <button
                    type="submit"
                    disabled={submitting || !commentText.trim()}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-semibold"
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
            <p className="text-gray-400 mb-2">Log in to join the conversation</p>
            <Link href="/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              Sign in →
            </Link>
          </div>
        )}

        {/* Comment list */}
        {loadingComments ? (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-400 border-t-transparent mx-auto"></div>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="space-y-5">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-300">
                    {comment.userName?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{comment.userName}</span>
                    <span className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed break-words">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
