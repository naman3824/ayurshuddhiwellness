'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../../components/AuthProvider';
import { auth } from '../../../lib/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';

function getGoogleSignInErrorMessage(error) {
  switch (error?.code) {
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked. Please allow popups and try again.';
    case 'auth/popup-closed-by-user':
      return 'The sign-in popup was closed before completing sign-in.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for Firebase sign-in.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled for this Firebase project.';
    case 'auth/internal-error':
      return 'Google sign-in could not start. Please check Firebase Auth settings and try again.';
    default:
      return 'Google sign-in failed. Please try again.';
  }
}

function getEmailAuthErrorMessage(error) {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check and try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a moment and try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Contact support for help.';
    default:
      return error?.message || 'Authentication failed. Please try again.';
  }
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

export default function LocalizedLoginPage() {
  const { loginWithGoogle } = useAuth();
  const params = useParams();
  const router = useRouter();
  const lang = params?.lang || 'en-IN';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setIsSigningIn(true);

    try {
      await loginWithGoogle(lang);
    } catch (error) {
      setAuthError(getGoogleSignInErrorMessage(error));
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignIn = async () => {
    setAuthError('');

    if (!email.trim() || !password) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`/${lang}`);
    } catch (error) {
      setAuthError(getEmailAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center">
        <div className="w-full">
          <div className="mb-8 text-center">
            <Link href={`/${lang}`} className="inline-block text-4xl">
              <span>ASW</span>
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-wide text-white">
              Sign In
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Continue your wellness journey
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700/50 bg-gray-800/80 p-8 shadow-2xl backdrop-blur-sm">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn || isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-600/70 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <GoogleIcon />
              {isSigningIn ? 'Opening Google...' : 'Continue with Google'}
            </button>

            {authError && (
              <p className="mt-4 rounded-xl border border-red-500/30 bg-red-950/60 px-4 py-3 text-sm text-red-200">
                {authError}
              </p>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/50"></div>
              </div>
              <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wide">
                <span className="bg-gray-800 px-3 text-gray-500">OR</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoading || isSigningIn}
                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:from-green-500 hover:to-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Please wait...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                href={`/${lang}/signup`}
                className="font-semibold text-green-400 transition-colors hover:text-green-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
