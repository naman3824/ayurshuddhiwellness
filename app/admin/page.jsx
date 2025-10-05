import { Suspense } from 'react'
import AdminProtection from './components/AdminProtection'

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            🔒 Admin Panel
          </h1>
          <p className="text-gray-300">
            Ayur Shuddhi Wellness - Administrative Dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">System Status</p>
                <p className="text-2xl font-bold text-green-400">Online</p>
              </div>
              <div className="text-green-400 text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Security</p>
                <p className="text-2xl font-bold text-green-400">Protected</p>
              </div>
              <div className="text-green-400 text-3xl">🛡️</div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Access Level</p>
                <p className="text-2xl font-bold text-yellow-400">Admin</p>
              </div>
              <div className="text-yellow-400 text-3xl">👑</div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            Administrative Functions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>📊</span>
              <span>Analytics</span>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>👥</span>
              <span>User Management</span>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>📝</span>
              <span>Content Management</span>
            </button>
            
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>📅</span>
              <span>Appointments</span>
            </button>
            
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>⚙️</span>
              <span>System Settings</span>
            </button>
            
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>📋</span>
              <span>Reports</span>
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-900 border border-yellow-600 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 text-xl">⚠️</span>
            <div>
              <p className="text-yellow-200 font-medium">Security Notice</p>
              <p className="text-yellow-300 text-sm">
                This admin panel is protected by middleware authentication. 
                Access is granted only with the correct secret key parameter.
              </p>
            </div>
          </div>
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