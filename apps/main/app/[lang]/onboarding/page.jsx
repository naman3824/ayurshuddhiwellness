'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../components/AuthProvider';
import { db } from '../../../lib/firebaseClient';

function hasRequiredProfileFields(profile) {
  return Boolean(profile?.age) && Boolean(profile?.phone);
}

export default function GoogleOnboardingPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'en-IN';

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace(`/${lang}/login?redirect=/${lang}/onboarding`);
    }
  }, [currentUser, lang, loading, router]);

  useEffect(() => {
    async function fetchProfile() {
      if (!currentUser || !db) {
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        if (hasRequiredProfileFields(userData)) {
          router.replace(`/${lang}/profile`);
          return;
        }

        setProfile(userData);
        setAge(userData?.age ? String(userData.age) : '');
        setPhoneNumber(userData?.phone || '');
        setHealthConditions(userData?.healthConditions || '');
      } catch {
        setErrorMessage('Could not load your onboarding details. Please refresh and try again.');
      } finally {
        setProfileLoading(false);
      }
    }

    fetchProfile();
  }, [currentUser, lang, router]);

  const handleSubmit = async () => {
    if (!currentUser || !db) return;

    setErrorMessage('');

    if (!age || !phoneNumber.trim()) {
      setErrorMessage('Please enter your age and phone number to continue.');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setErrorMessage('Please enter a valid 10-digit phone number without spaces or dashes.');
      return;
    }

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      setErrorMessage('Please enter a valid age between 1 and 120.');
      return;
    }

    setIsSaving(true);
    try {
      await setDoc(
        doc(db, 'users', currentUser.uid),
        {
          uid: currentUser.uid,
          name: currentUser.displayName || profile?.name || '',
          displayName: currentUser.displayName || profile?.displayName || '',
          email: currentUser.email || profile?.email || '',
          photoURL: currentUser.photoURL || profile?.photoURL || '',
          age: Number(age),
          phone: phoneNumber.trim(),
          healthConditions: healthConditions.trim(),
          role: profile?.role || 'user',
        },
        { merge: true }
      );

      router.replace(`/${lang}/profile`);
    } catch {
      setErrorMessage('Could not save your onboarding details. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-green-400 border-t-transparent"></div>
          <p className="text-sm text-gray-400">Preparing your onboarding...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const displayName = currentUser.displayName || profile?.displayName || profile?.name || 'Google User';
  const email = currentUser.email || profile?.email || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl items-center">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-wide text-white">
              Complete Your Wellness Profile
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              We need a few more details before you continue.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700/50 bg-gray-800/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            {errorMessage && (
              <p className="mb-5 rounded-xl border border-red-500/30 bg-red-950/50 px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </p>
            )}

            <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="displayName" className="mb-1.5 block text-sm font-medium text-gray-300">
                    Google Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-gray-600/40 bg-gray-900/60 px-4 py-3 text-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                    Google Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-gray-600/40 bg-gray-900/60 px-4 py-3 text-gray-400"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="age" className="mb-1.5 block text-sm font-medium text-gray-300">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    min="1"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    placeholder="Age"
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="healthConditions" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Persisting Health Conditions <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <textarea
                  id="healthConditions"
                  value={healthConditions}
                  onChange={(event) => setHealthConditions(event.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  placeholder="Share any ongoing concerns, allergies, or wellness goals."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving}
                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:from-green-500 hover:to-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? 'Saving Profile...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
