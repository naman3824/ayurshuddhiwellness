'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';

export default function MyBookingsPage() {
  const { currentUser, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const lang = params?.lang || 'en-IN';

  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace(`/${lang}/login`);
    }
  }, [currentUser, loading, router, lang]);

  useEffect(() => {
    if (!currentUser) return;

    async function fetchBookings() {
      setFetching(true);
      try {
        const token = await currentUser.getIdToken();
        const res = await fetch('/api/bookings/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setBookings(data.bookings || []);
        } else {
          setError(data.error || 'Failed to load bookings.');
        }
      } catch {
        setError('Could not connect to the server.');
      } finally {
        setFetching(false);
      }
    }

    fetchBookings();
  }, [currentUser]);

  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this appointment? This action cannot be undone.'
    );
    if (!confirmed) return;

    setDeletingId(bookingId);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`/api/bookings/user?id=${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete booking.');
      }
    } catch {
      alert('Could not connect to the server.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'border-green-500/30 bg-green-500/10 text-green-300';
      case 'cancelled':
        return 'border-red-500/30 bg-red-500/10 text-red-300';
      case 'completed':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-300';
      default:
        return 'border-gray-500/30 bg-gray-500/10 text-gray-300';
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-white sm:text-4xl">
              My Bookings
            </h1>
            <p className="mt-2 text-gray-400">
              {bookings.length} appointment{bookings.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:from-green-500 hover:to-emerald-500"
          >
            + New Booking
          </Link>
        </div>

        {error && (
          <p className="mb-6 rounded-xl border border-red-500/30 bg-red-950/60 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-700/70 bg-gray-800/80 p-12 text-center backdrop-blur-sm">
            <svg
              className="mx-auto h-16 w-16 text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500 mb-6">
              You haven&apos;t made any appointments yet. Book a consultation to get started on your wellness journey.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:from-green-500 hover:to-emerald-500"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-gray-700/70 bg-gray-800/80 p-5 sm:p-6 backdrop-blur-sm transition-all hover:border-gray-600/70"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Booking Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {booking.serviceName}
                      </h3>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(booking.appointmentDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {booking.appointmentTime || '—'}
                      </span>
                      {booking.durationMinutes > 0 && (
                        <span className="text-gray-500">{booking.durationMinutes} min</span>
                      )}
                    </div>

                    {booking.confirmationNumber && (
                      <p className="text-xs text-gray-500">
                        Confirmation: <span className="font-mono text-gray-400">{booking.confirmationNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex shrink-0 gap-2 sm:flex-col">
                    <Link
                      href="/book"
                      className="flex-1 sm:flex-none rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-2.5 text-center text-xs font-semibold text-green-300 transition-all hover:bg-green-500/20"
                    >
                      Modify Booking
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(booking.id)}
                      disabled={deletingId === booking.id}
                      className="flex-1 sm:flex-none rounded-xl border border-red-500/30 px-4 py-2.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === booking.id ? 'Deleting...' : 'Delete Appointment'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Profile */}
        <div className="mt-8 text-center">
          <Link
            href={`/${lang}/profile`}
            className="inline-flex items-center rounded-xl border border-gray-600/60 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-700/50 hover:text-white"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
