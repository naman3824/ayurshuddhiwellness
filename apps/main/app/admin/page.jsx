'use client';

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'
import AdminProtection from './components/AdminProtection'

function AdminDashboard() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-400 mb-4 tracking-wide">
            🌿 Admin Panel
          </h1>
          <p className="text-gray-300 text-xl">
            Manage your Ayur Shuddhi Wellness platform
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Post a Message */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-green-500/20 hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-bold text-green-400 mb-3">Post a Message</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">Create announcements and notifications for the homepage</p>
              <button
                onClick={() => router.push('/admin/post-message')}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold border border-green-500 hover:border-green-400 shadow-lg"
              >
                🚀 Create Message
              </button>
            </div>
          </div>

          {/* Manage Content */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-6">📋</div>
              <h2 className="text-2xl font-bold text-blue-400 mb-3">Manage Content</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">View, edit, and delete messages & blog posts</p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/admin/manage-messages')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold border border-blue-500 hover:border-blue-400 shadow-lg"
                >
                  📊 Manage Messages
                </button>
                <button
                  onClick={() => router.push('/admin/blog/manage')}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold border border-purple-500 hover:border-purple-400 shadow-lg"
                >
                  📝 Manage Blogs
                </button>
              </div>
            </div>
          </div>

          {/* Write a Blog */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-purple-500/20 hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-6">✍️</div>
              <h2 className="text-2xl font-bold text-purple-400 mb-3">Write a Blog</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">Create engaging blog posts for your audience</p>
              <button
                onClick={() => router.push('/admin/blog/new')}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold border border-purple-500 hover:border-purple-400 shadow-lg"
              >
                ✨ Write Blog
              </button>
            </div>
          </div>

          {/* Manage Bookings */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-6">📅</div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">Manage Bookings</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">View and manage all customer appointment bookings</p>
              <button
                onClick={() => router.push('/admin/bookings')}
                className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold border border-cyan-500 hover:border-cyan-400 shadow-lg"
              >
                📋 View Bookings
              </button>
            </div>
          </div>
        </div>

        {/* Footer with Logout */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors font-medium border border-gray-500/30 hover:border-gray-500/50"
            >
              ← Go Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors font-medium border border-red-500/30 hover:border-red-500/50"
            >
              🚪 Sign Out
            </button>
          </div>
          <p className="text-gray-400">
            🌿 Ayur Shuddhi Wellness Admin Dashboard
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    }>
      <AdminProtection>
        <AdminDashboard />
      </AdminProtection>
    </Suspense>
  )
}