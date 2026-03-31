'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function AdminProtection({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const validateKey = async () => {
      const providedKey = searchParams.get('key')
      
      if (!providedKey) {
        router.replace('/')
        return
      }

      try {
        // Validate key with server
        const response = await fetch('/api/admin/validate-key/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: providedKey }),
        });

        if (response.ok) {
          // Check if response is actually JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.valid) {
              setIsAuthorized(true)
            } else {
              router.replace('/')
              return
            }
          } else {
            setIsAuthorized(true) // Fallback for non-JSON success response
          }
        } else {
          router.replace('/')
          return
        }
      } catch (error) {
        console.error('Key validation failed:', error)
        router.replace('/')
        return
      }
      
      setIsLoading(false)
    }

    validateKey()
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