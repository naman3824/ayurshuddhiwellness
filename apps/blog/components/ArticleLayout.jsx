'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Send, MessageCircle } from 'lucide-react';

const dummyComments = [
  {
    id: 1,
    author: 'Priya Sharma',
    avatar: 'P',
    date: '2 days ago',
    text: "This was incredibly informative! I've been curious about Ayurveda for a while and this article answered so many of my questions.",
  },
  {
    id: 2,
    author: 'Rahul Verma',
    avatar: 'R',
    date: '5 days ago',
    text: 'The Dosha table was really helpful. I think I might be a Pitta-Kapha type. Would love to see a follow-up article on diet recommendations for each Dosha!',
  },
];

export default function ArticleLayout({ children }) {
  const [likes, setLikes] = useState(24);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(dummyComments);

  const handleLike = () => {
    if (liked) {
      setLikes((l) => l - 1);
      setLiked(false);
    } else {
      setLikes((l) => l + (disliked ? 2 : 1));
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setLikes((l) => l + 1);
      setDisliked(false);
    } else {
      setLikes((l) => l - (liked ? 2 : 1));
      setDisliked(true);
      setLiked(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        author: 'You',
        avatar: 'Y',
        date: 'Just now',
        text: commentText.trim(),
      },
      ...prev,
    ]);
    setCommentText('');
  };

  return (
    <div className="min-h-screen">
      {/* Back nav */}
      <header className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 flex items-center gap-3">
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1.5"
          >
            ← Back to Blog
          </a>
        </div>
      </header>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="prose-custom">{children}</div>

        {/* ── Engagement bar ────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-gray-800/60">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                liked
                  ? 'bg-green-500/15 text-green-400 ring-1 ring-green-500/30'
                  : 'text-gray-400 hover:text-green-400 hover:bg-gray-800'
              }`}
            >
              <ThumbsUp size={16} />
              <span>{likes}</span>
            </button>
            <button
              type="button"
              onClick={handleDislike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                disliked
                  ? 'bg-red-500/15 text-red-400 ring-1 ring-red-500/30'
                  : 'text-gray-400 hover:text-red-400 hover:bg-gray-800'
              }`}
            >
              <ThumbsDown size={16} />
            </button>
            <button
              type="button"
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-blue-400 hover:bg-gray-800 transition-all"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* ── Comments section ──────────────────────────────── */}
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle size={18} className="text-green-400" />
            <h3 className="text-lg font-bold text-white">
              Comments ({comments.length})
            </h3>
          </div>

          {/* New comment form */}
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                Y
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 pr-12 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-green-400 transition-colors disabled:opacity-30"
                  disabled={!commentText.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-5">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-4 rounded-xl bg-gray-900/50 border border-gray-800/40"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-bold text-white">
                  {comment.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-200">
                      {comment.author}
                    </span>
                    <span className="text-[11px] text-gray-600">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
