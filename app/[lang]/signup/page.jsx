'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../../components/AuthProvider';

function getSignupErrorMessage(error) {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/operation-not-allowed':
      return 'Email signup is not enabled for this Firebase project.';
    default:
      return error?.message || 'Could not create your account. Please try again.';
  }
}

export default function LocalizedSignupPage() {
  const { registerWithEmail } = useAuth();
  const params = useParams();
  const lang = params?.lang || 'en-IN';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateAccount = async () => {
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password || !age || !phoneNumber.trim()) {
      setErrorMessage('Please complete all required fields.');
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

    setIsSubmitting(true);
    try {
      await registerWithEmail({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        age,
        phone: phoneNumber.trim(),
        healthConditions: healthConditions.trim(),
      });

      setFullName('');
      setEmail('');
      setPassword('');
      setAge('');
      setPhoneNumber('');
      setHealthConditions('');
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(getSignupErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl items-center">
        <div className="w-full">
          <div className="mb-8 text-center">
            <Link href={`/${lang}`} className="inline-block text-4xl">
              <span>ASW</span>
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-wide text-white">
              Create Your Wellness Account
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Tell us a little about yourself so we can personalize your care.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700/50 bg-gray-800/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            {isSuccess ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">Account created successfully!</h2>
                <p className="mb-8 text-gray-400">
                  We've sent a verification link to your email. Please verify your identity, then sign in.
                </p>
                <Link
                  href={`/${lang}/login`}
                  className="inline-block rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 font-semibold text-white transition-all hover:from-green-500 hover:to-emerald-500"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <p className="mb-5 rounded-xl border border-red-500/30 bg-red-950/50 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                  </p>
                )}

                <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                  <div>
                    <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
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
                        placeholder="Create a password"
                        autoComplete="new-password"
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
                    onClick={handleCreateAccount}
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:from-green-500 hover:to-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link
                    href={`/${lang}/login`}
                    className="font-semibold text-green-400 transition-colors hover:text-green-300"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
