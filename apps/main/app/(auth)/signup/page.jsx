'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebaseClient';
import Link from 'next/link';

const healthGoals = [
  'General Wellness',
  'Stress Relief',
  'Detoxification',
  'Weight Management',
  'Chronic Pain Management',
];

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    healthGoal: '',
    medicalConditions: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 2. Update display name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      // 3. Save extended profile to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        healthGoal: formData.healthGoal || 'General Wellness',
        medicalConditions: formData.medicalConditions || '',
        role: 'user',
        createdAt: serverTimestamp(),
      });

      // 4. Redirect to home
      router.push('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-4xl">🌿</span>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Begin Your Journey
          </h1>
          <p className="text-gray-400 mt-2">
            Create your wellness profile
          </p>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/40 rounded-xl text-red-300 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1.5">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                  placeholder="Min 6 characters"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                  placeholder="Repeat password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-800/80 px-3 text-gray-400">Wellness Profile (Optional)</span>
              </div>
            </div>

            {/* Health Goal */}
            <div>
              <label htmlFor="healthGoal" className="block text-sm font-medium text-gray-300 mb-1.5">
                Primary Health Goal
              </label>
              <select
                id="healthGoal"
                name="healthGoal"
                value={formData.healthGoal}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all appearance-none"
              >
                <option value="" className="bg-gray-800">Select a goal...</option>
                {healthGoals.map((goal) => (
                  <option key={goal} value={goal} className="bg-gray-800">
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            {/* Medical Conditions */}
            <div>
              <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-300 mb-1.5">
                Known Allergies / Medical Conditions
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                rows={3}
                value={formData.medicalConditions}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all resize-none"
                placeholder="e.g., Peanut allergy, Diabetes, High blood pressure..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                Sign In
              </Link>
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center rounded-xl border border-gray-600/60 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-700/50 hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
