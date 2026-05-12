'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useAuth } from '../../../components/AuthProvider';
import { db } from '../../../lib/firebaseClient';

const RECENT_LOGIN_WINDOW_MS = 5 * 60 * 1000;
const RECENT_LOGIN_REQUIRED_MESSAGE =
  'For your security, please sign out and sign back in before deleting your account.';

function hasRequiredProfileFields(profile) {
  return Boolean(profile?.age) && Boolean(profile?.phone);
}

export default function ProfilePage() {
  const { currentUser, loading, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  
  // Form State
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  
  // Bookings State
  const [userBookings, setUserBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingError, setBookingError] = useState('');
  
  // UI State
  const [activeTab, setActiveTab] = useState('settings');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [deleteError, setDeleteError] = useState('');
  
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'en-IN';

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/');
    }
  }, [currentUser, loading, router]);

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

        if (!hasRequiredProfileFields(userData)) {
          router.replace(`/${lang}/onboarding`);
          return;
        }

        setProfile(userData);
        setPhoneNumber(userData?.phone || '');
        setDisplayName(userData?.displayName || userData?.name || currentUser.displayName || '');
        setAge(userData?.age ? String(userData.age) : '');
      } catch {
        setProfile(null);
        setPhoneNumber('');
        setDisplayName('');
        setAge('');
      } finally {
        setProfileLoading(false);
      }
    }

    fetchProfile();
  }, [currentUser, lang, router]);

  useEffect(() => {
    async function fetchBookings() {
      if (activeTab !== 'bookings' || !currentUser || !db) return;

      setLoadingBookings(true);
      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid)
        );
        const snapshot = await getDocs(bookingsQuery);
        const bookingsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserBookings(bookingsList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingError("Failed to load your bookings. Please try again.");
      } finally {
        setLoadingBookings(false);
      }
    }

    fetchBookings();
  }, [activeTab, currentUser]);

  const updateProfile = async () => {
    if (!currentUser || !db) return;

    if (phoneNumber && !/^\d{10}$/.test(phoneNumber.trim())) {
      setStatusMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    if (age) {
      const ageNum = Number(age);
      if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
        setStatusMessage('Please enter a valid age between 1 and 120.');
        return;
      }
    }

    setIsSaving(true);
    setStatusMessage('');
    setDeleteError('');

    try {
      const profileUpdate = {
        phone: phoneNumber.trim(),
        displayName: displayName.trim(),
        age: age ? Number(age) : null,
      };

      if (!profile?.role) {
        profileUpdate.role = 'user';
      }

      await setDoc(doc(db, 'users', currentUser.uid), profileUpdate, { merge: true });
      setProfile((currentProfile) => ({
        ...(currentProfile || {}),
        ...profileUpdate,
      }));
      setStatusMessage('Profile updated successfully.');
    } catch {
      setStatusMessage('Could not save your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!currentUser || !db) return;

    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setUserBookings((prevBookings) => prevBookings.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser || !db) return;

    const confirmed = window.confirm(
      'Are you sure you want to completely delete your account and all data? This cannot be undone.'
    );

    if (!confirmed) return;

    setIsDeleting(true);
    setStatusMessage('');
    setDeleteError('');

    try {
      const tokenResult = await currentUser.getIdTokenResult(true);
      const authTimeMs = tokenResult.authTime ? new Date(tokenResult.authTime).getTime() : NaN;
      const hasFreshSession =
        Number.isFinite(authTimeMs) && Date.now() - authTimeMs <= RECENT_LOGIN_WINDOW_MS;

      if (!hasFreshSession) {
        window.alert(RECENT_LOGIN_REQUIRED_MESSAGE);
        setDeleteError(RECENT_LOGIN_REQUIRED_MESSAGE);
        return;
      }

      await deleteDoc(doc(db, 'users', currentUser.uid));
      await deleteUser(currentUser);
      router.replace('/');
    } catch (err) {
      if (err?.code === 'auth/requires-recent-login') {
        window.alert(RECENT_LOGIN_REQUIRED_MESSAGE);
        setDeleteError(RECENT_LOGIN_REQUIRED_MESSAGE);
      } else {
        setDeleteError('Could not delete your account. Please try again.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const currentDisplayName = profile?.displayName || profile?.name || currentUser.displayName || 'Ayur Shuddhi Member';
  const email = profile?.email || currentUser.email || 'Not available';
  const photoURL = profile?.photoURL || currentUser.photoURL;
  const fallbackInitial = currentDisplayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-gray-400">
            View your account details and manage your session.
          </p>
        </div>

        <section className="rounded-2xl border border-gray-700/70 bg-gray-800/80 shadow-2xl backdrop-blur-sm overflow-hidden">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/30 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-green-400/40 bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shrink-0">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={currentDisplayName}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                    {fallbackInitial}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{currentDisplayName}</h2>
                <p className="mt-1 text-sm text-green-200">{email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="flex flex-col space-y-2 border-b border-gray-700/70 bg-gray-900/40 p-4 md:w-64 md:border-b-0 md:border-r">
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'border border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border border-transparent text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                Profile Settings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                  activeTab === 'bookings'
                    ? 'border border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border border-transparent text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                My Bookings
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 sm:p-8">
              {activeTab === 'bookings' ? (
                <div className="space-y-4">
                  <h3 className="mb-6 text-xl font-bold text-white">Upcoming Bookings</h3>
                  {loadingBookings ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-green-400 border-t-transparent"></div>
                      <p className="text-sm text-gray-400">Loading your appointments...</p>
                    </div>
                  ) : bookingError ? (
                    <div className="rounded-xl border border-red-500/30 bg-red-950/30 py-12 text-center">
                      <p className="text-red-400">{bookingError}</p>
                    </div>
                  ) : userBookings.length === 0 ? (
                    <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 py-12 text-center">
                      <p className="text-gray-400">You have no upcoming bookings.</p>
                      <Link
                        href={`/${lang}/services`}
                        className="mt-4 inline-block rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-2 text-sm font-semibold text-green-400 transition-all hover:bg-green-500/20"
                      >
                        Explore Services
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col justify-between space-y-4 rounded-xl border border-gray-700/50 bg-gray-800/50 p-5 shadow-lg transition-all hover:border-green-500/30 sm:flex-row sm:items-center sm:space-y-0"
                        >
                          <div>
                            <p className="text-lg font-semibold text-white">
                              {booking.serviceName || 'Wellness Service'}
                            </p>
                            <p className="mb-3 text-sm text-gray-400">
                              {booking.date} at {booking.time}
                            </p>
                            <span className="inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                              {booking.status || 'Confirmed'}
                            </span>
                          </div>
                          <div className="flex shrink-0 gap-3 sm:flex-col sm:items-end sm:gap-2">
                            <Link
                              href={`/${lang}/book?editId=${booking.id}`}
                              className="flex-1 rounded-lg border border-gray-500/40 px-4 py-2 text-center text-sm font-semibold text-gray-300 transition-all hover:bg-gray-700/50 hover:text-white sm:flex-none"
                            >
                              Modify
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="flex-1 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 sm:flex-none"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="displayName" className="mb-1.5 block text-sm font-medium text-gray-300">
                        Username
                      </label>
                      <input
                        id="displayName"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        readOnly
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-gray-600/30 bg-gray-800/50 px-4 py-3 text-gray-500 opacity-70"
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
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-medium text-gray-300">
                        Mobile Number
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {statusMessage && (
                    <p className={`mt-2 text-sm ${statusMessage.startsWith('Could') ? 'text-red-300' : 'text-green-300'}`}>
                      {statusMessage}
                    </p>
                  )}

                  <div className="mt-8 space-y-3 pt-4 border-t border-gray-700/50">
                    <button
                      type="button"
                      onClick={updateProfile}
                      disabled={isSaving}
                      className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:from-green-500 hover:to-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition-all hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400/60"
                    >
                      Sign Out
                    </button>
                  </div>

                  <div className="mt-6 border-t border-gray-700/70 pt-6">
                    {deleteError && (
                      <p className="mb-3 text-sm text-red-300">
                        {deleteError}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="w-full rounded-xl border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-500 transition-all hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-400/60 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting ? 'Deleting Account...' : 'Delete Account'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
