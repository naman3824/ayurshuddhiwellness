'use client';

import Link from 'next/link';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

export default function PostCard({ post }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-green-500/40 hover:shadow-[0_0_24px_rgba(34,197,94,0.08)] hover:-translate-y-1"
    >
      {/* Gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Tag + Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-green-400">
            {post.tag}
          </span>
          <span className="text-[11px] text-gray-500">{post.date}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-5 flex-1">
          {post.excerpt}
        </p>

        {/* Action bar */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-800/60">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-400 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <ThumbsUp size={14} />
            <span>{post.likes}</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <ThumbsDown size={14} />
          </button>
          <button
            type="button"
            className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-400 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
