'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import AdminProtection from '../components/AdminProtection'

function AdminSettings() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            ⚙️ Admin Settings
          </h1>
          <p className="text-gray-300">
            System configuration and administrative settings
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <nav className="flex space-x-4">
            <button 
              onClick={() => router.push('/admin')}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </nav>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              General Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Site Title
                </label>
                <input 
                  type="text" 
                  defaultValue="Ayur Shuddhi Wellness"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Contact Email
                </label>
                <input 
                  type="email" 
                  defaultValue="info@ayurshuddhiwellness.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Security Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Authentication
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Firebase Auth — Session Cookie Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading admin settings...</p>
        </div>
      </div>
    }>
      <AdminProtection>
        <AdminSettings />
      </AdminProtection>
    </Suspense>
  )
}