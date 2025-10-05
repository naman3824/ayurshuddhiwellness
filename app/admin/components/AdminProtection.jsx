'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const ADMIN_KEY = 'ayur_admin_2024_secure_key_xyz789'

export default function AdminProtection({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const providedKey = searchParams.get('key')
    
    if (!providedKey || providedKey !== ADMIN_KEY) {
      // Redirect to home page if key is missing or incorrect
      router.replace('/')
      return
    }
    
    setIsAuthorized(true)
    setIsLoading(false)
  }, [searchParams, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Verifying access credentials...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h1>
          <p className="text-gray-300">Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  return children
}