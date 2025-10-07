'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AdminProtection from '../components/AdminProtection'
import { 
  testConnection, 
  getAllUsers, 
  getAllPosts, 
  createUser, 
  createPost 
} from '../../../lib/supabaseClient'

function SupabaseTestDashboard() {
  const searchParams = useSearchParams();
  const [connectionStatus, setConnectionStatus] = useState('testing')
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [testResults, setTestResults] = useState([])

  const addTestResult = (test, status, message) => {
    setTestResults(prev => [...prev, { test, status, message, timestamp: new Date().toLocaleTimeString() }])
  }

  const runTests = async () => {
    setLoading(true)
    setTestResults([])
    
    try {
      // Test 1: Connection Test
      addTestResult('Connection Test', 'running', 'Testing Supabase connection...')
      const isConnected = await testConnection()
      if (isConnected) {
        setConnectionStatus('connected')
        addTestResult('Connection Test', 'success', '✅ Supabase connection successful')
      } else {
        setConnectionStatus('failed')
        addTestResult('Connection Test', 'error', '❌ Supabase connection failed')
        return
      }

      // Test 2: Fetch Users
      addTestResult('Fetch Users', 'running', 'Fetching users from database...')
      const usersData = await getAllUsers()
      setUsers(usersData)
      addTestResult('Fetch Users', 'success', `✅ Fetched ${usersData.length} users successfully`)

      // Test 3: Fetch Posts
      addTestResult('Fetch Posts', 'running', 'Fetching posts from database...')
      const postsData = await getAllPosts()
      setPosts(postsData)
      addTestResult('Fetch Posts', 'success', `✅ Fetched ${postsData.length} posts successfully`)

      // Test 4: Create Test User (optional)
      addTestResult('Create Test User', 'running', 'Creating a test user...')
      const testUser = await createUser({
        name: `Test User ${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        phone: '+1234567890'
      })
      
      if (testUser) {
        addTestResult('Create Test User', 'success', `✅ Test user created with ID: ${testUser.id}`)
        // Refresh users list
        const updatedUsers = await getAllUsers()
        setUsers(updatedUsers)
      } else {
        addTestResult('Create Test User', 'warning', '⚠️ Failed to create test user')
      }

      // Test 5: Create Test Post (optional)
      addTestResult('Create Test Post', 'running', 'Creating a test post...')
      const testPost = await createPost({
        title: `Test Post ${Date.now()}`,
        content: 'This is a test post created by the Supabase integration test.',
        image_url: '/images/hero/Tree.jpg'
      })
      
      if (testPost) {
        addTestResult('Create Test Post', 'success', `✅ Test post created with ID: ${testPost.id}`)
        // Refresh posts list
        const updatedPosts = await getAllPosts()
        setPosts(updatedPosts)
      } else {
        addTestResult('Create Test Post', 'warning', '⚠️ Failed to create test post')
      }

    } catch (error) {
      addTestResult('Error', 'error', `❌ Unexpected error: ${error.message}`)
      setConnectionStatus('error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-400'
      case 'failed': return 'text-red-400'
      case 'error': return 'text-red-400'
      case 'testing': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getTestStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'warning': return 'text-yellow-400'
      case 'running': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            🧪 Supabase Integration Test
          </h1>
          <p className="text-gray-300">
            Testing Supabase connection and database operations
          </p>
          
          {/* Connection Status */}
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-gray-400">Connection Status:</span>
            <span className={`font-semibold ${getStatusColor(connectionStatus)}`}>
              {connectionStatus === 'testing' && '🔄 Testing...'}
              {connectionStatus === 'connected' && '✅ Connected'}
              {connectionStatus === 'failed' && '❌ Failed'}
              {connectionStatus === 'error' && '⚠️ Error'}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <nav className="flex space-x-4">
            <a 
              href={`/admin?key=${searchParams.get('key')}`} 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Admin Dashboard
            </a>
            <button 
              onClick={runTests}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? '🔄 Running Tests...' : '🔄 Run Tests Again'}
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Results */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              📋 Test Results
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="bg-gray-700 rounded p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-200">{result.test}</span>
                    <span className="text-xs text-gray-400">{result.timestamp}</span>
                  </div>
                  <p className={`text-sm mt-1 ${getTestStatusColor(result.status)}`}>
                    {result.message}
                  </p>
                </div>
              ))}
              {testResults.length === 0 && (
                <p className="text-gray-400 text-center py-4">No test results yet</p>
              )}
            </div>
          </div>

          {/* Database Data */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              📊 Database Data
            </h2>
            
            {/* Users */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-blue-400 mb-2">
                Users ({users.length})
              </h3>
              <div className="bg-gray-700 rounded p-3 max-h-40 overflow-y-auto">
                {users.length > 0 ? (
                  <div className="space-y-2">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="text-sm">
                        <span className="text-gray-200">{user.name}</span>
                        <span className="text-gray-400 ml-2">({user.email})</span>
                      </div>
                    ))}
                    {users.length > 5 && (
                      <p className="text-gray-400 text-xs">...and {users.length - 5} more</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No users found</p>
                )}
              </div>
            </div>

            {/* Posts */}
            <div>
              <h3 className="text-lg font-medium text-purple-400 mb-2">
                Posts ({posts.length})
              </h3>
              <div className="bg-gray-700 rounded p-3 max-h-40 overflow-y-auto">
                {posts.length > 0 ? (
                  <div className="space-y-2">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.id} className="text-sm">
                        <span className="text-gray-200">{post.title}</span>
                        <p className="text-gray-400 text-xs mt-1">
                          {post.content.substring(0, 50)}...
                        </p>
                      </div>
                    ))}
                    {posts.length > 5 && (
                      <p className="text-gray-400 text-xs">...and {posts.length - 5} more</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No posts found</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900 border border-blue-600 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <span className="text-blue-400 text-xl">ℹ️</span>
            <div>
              <p className="text-blue-200 font-medium">Setup Instructions</p>
              <div className="text-blue-300 text-sm mt-2 space-y-1">
                <p>1. Run the SQL migration in your Supabase SQL Editor:</p>
                <code className="bg-blue-800 px-2 py-1 rounded text-xs">
                  /lib/database-migration.sql
                </code>
                <p>2. Ensure your environment variables are set correctly in .env.local</p>
                <p>3. This test page verifies the integration is working properly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SupabaseTestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading Supabase test...</p>
        </div>
      </div>
    }>
      <AdminProtection>
        <SupabaseTestDashboard />
      </AdminProtection>
    </Suspense>
  )
}