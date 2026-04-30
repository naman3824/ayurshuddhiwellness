'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { db } from '../lib/firebaseClient';

function hasRequiredProfileFields(profile) {
  return Boolean(profile?.age) && Boolean(profile?.phone);
}

export default function ProtectedRoute({ children }) {
  const { currentUser, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const lang = params?.lang || 'en-IN';
  const onboardingPath = `/${lang}/onboarding`;
  const isOnboardingRoute = pathname === onboardingPath;
  const [profileCheckLoading, setProfileCheckLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const isGoogleUser = currentUser?.providerData?.some(
    (provider) => provider.providerId === 'google.com'
  );
  const requiresEmailVerification = currentUser && !currentUser.emailVerified && !isGoogleUser;

  useEffect(() => {
    if (!loading && !currentUser) {
      // Redirect to login with the intended destination
      router.push(`/${lang}/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, lang, loading, router, pathname]);

  useEffect(() => {
    if (loading) return;

    if (!currentUser || requiresEmailVerification || !db) {
      setProfileCheckLoading(false);
      setNeedsOnboarding(false);
      return;
    }

    let cancelled = false;

    async function checkProfileCompletion() {
      setProfileCheckLoading(true);

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
        const missingProfileData = !userDoc.exists() || !hasRequiredProfileFields(userData);

        if (cancelled) return;

        setNeedsOnboarding(missingProfileData);

        if (missingProfileData && !isOnboardingRoute) {
          router.replace(onboardingPath);
        }
      } catch {
        if (cancelled) return;

        setNeedsOnboarding(true);
        if (!isOnboardingRoute) {
          router.replace(onboardingPath);
        }
      } finally {
        if (!cancelled) {
          setProfileCheckLoading(false);
        }
      }
    }

    checkProfileCompletion();

    return () => {
      cancelled = true;
    };
  }, [currentUser, isOnboardingRoute, loading, onboardingPath, requiresEmailVerification, router]);

  if (loading || (currentUser && !requiresEmailVerification && profileCheckLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // Show nothing while redirecting
    return null;
  }

  if (requiresEmailVerification) {
    const handleRefreshVerification = async () => {
      await currentUser.reload();
      window.location.reload();
    };

    const handleSignOut = async () => {
      await logout();
      router.push(`/${lang}/login`);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-yellow-500/30 bg-gray-800/90 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-500/10">
            <span className="text-2xl font-bold text-yellow-300">!</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Verify Your Email</h1>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            Please check your inbox and verify your email address before accessing this page.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Signed in as {currentUser.email || 'your account'}
          </p>
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleRefreshVerification}
              className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:from-green-500 hover:to-emerald-500"
            >
              I Verified My Email
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full rounded-xl border border-gray-600/60 px-5 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-700/50 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (needsOnboarding && !isOnboardingRoute) {
    return null;
  }

  return children;
}
