'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../lib/firebaseClient';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-4xl">🌿</span>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Reset Password
          </h1>
          <p className="text-gray-400 mt-2">
            We&apos;ll send you reset instructions
          </p>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-xl font-semibold text-green-400 mb-2">Check Your Inbox</h2>
              <p className="text-gray-300 mb-6">
                We&apos;ve sent password reset instructions to <strong className="text-white">{email}</strong>.
              </p>
              <Link
                href="/login"
                className="inline-block py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/40 rounded-xl text-red-300 text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
                  ← Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
