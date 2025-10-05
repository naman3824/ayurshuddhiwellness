'use client';

import { Suspense } from 'react';
import AdminProtection from '../components/AdminProtection';

function ContactTestPage() {

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-green-400">Contact API Test</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Form API Status</h2>
          <p className="text-gray-300 mb-4">
            Contact form API has been disabled. Email functionality has been removed from the system.
          </p>
          
          <div className="p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
            <h4 className="font-medium text-yellow-400 mb-2">API Disabled</h4>
            <p className="text-sm text-yellow-200">
              The contact form API endpoint has been removed. No email functionality is currently available.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Environment Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Supabase URL:</span>
              <span className="text-green-400">✓ Configured</span>
            </div>
            <div className="flex justify-between">
              <span>Supabase Anon Key:</span>
              <span className="text-green-400">✓ Configured</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-red-900/20 border border-red-600 rounded-lg">
            <h4 className="font-medium text-red-400 mb-2">Email Configuration Removed</h4>
            <p className="text-sm text-red-200">
              All email-related functionality has been removed from the system. Contact form submissions will only be saved to the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminContactTestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading contact test...</p>
        </div>
      </div>
    }>
      <AdminProtection>
        <ContactTestPage />
      </AdminProtection>
    </Suspense>
  );
}