'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '../components/AdminProtection';
import { db } from '../../../lib/firebaseClient';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

function ManageBookingsContent() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBookingId, setExpandedBookingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const q = query(
        collection(db, 'bookings'),
        orderBy('appointmentDate', 'asc')
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setBookings(fetched);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedBookingId((prev) => (prev === id ? null : id));
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';
    // Handle Firestore Timestamp objects
    if (value?.toDate) return value.toDate().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    return new Date(value).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTimestamp = (value) => {
    if (!value) return 'N/A';
    if (value?.toDate) return value.toDate().toLocaleString('en-IN');
    return new Date(value).toLocaleString('en-IN');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
      case 'cancelled': return 'bg-red-600/20 text-red-400 border-red-500/30';
      case 'completed': return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">
                  📅 Manage Bookings
                </h1>
                <p className="text-gray-400">
                  All customer appointment bookings sorted by date
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={fetchBookings}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors border border-cyan-500 font-medium text-sm"
                >
                  🔄 Refresh
                </button>
                <button
                  onClick={() => router.push('/admin')}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors border border-gray-600 font-medium text-sm"
                >
                  ← Dashboard
                </button>
              </div>
            </div>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-300">
              <p className="font-medium">Failed to load bookings</p>
              <p className="text-sm mt-1">{error}</p>
              <button
                onClick={fetchBookings}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-gray-300 text-lg">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No Bookings Found</h3>
              <p className="text-gray-500">There are no appointment bookings yet.</p>
            </div>
          ) : (
            /* Accordion List */
            <>
              <p className="text-sm text-gray-400 mb-4">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} found</p>
              <div className="space-y-3">
                {bookings.map((booking) => {
                  const isExpanded = expandedBookingId === booking.id;
                  return (
                    <div
                      key={booking.id}
                      className={`bg-gray-800 rounded-xl border transition-all duration-300 overflow-hidden ${
                        isExpanded
                          ? 'border-cyan-500 shadow-lg shadow-cyan-500/10'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {/* Summary Row (always visible) */}
                      <button
                        onClick={() => toggleExpand(booking.id)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-700/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Date badge */}
                          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex flex-col items-center justify-center">
                            <span className="text-xs text-cyan-400 font-medium leading-none">
                              {formatDate(booking.appointmentDate).split(' ')[1]?.replace(',', '')}
                            </span>
                            <span className="text-lg font-bold text-cyan-300 leading-none mt-0.5">
                              {formatDate(booking.appointmentDate).split(' ')[0]}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold truncate">
                              {booking.serviceName || 'Unknown Service'}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                              <span>🕐 {booking.appointmentTime || 'N/A'}</span>
                              <span>•</span>
                              <span>{formatDate(booking.appointmentDate)}</span>
                            </div>
                          </div>

                          {/* Status badge */}
                          <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                            {booking.status || 'Unknown'}
                          </span>
                        </div>

                        {/* Chevron */}
                        <svg
                          className={`w-5 h-5 text-gray-400 ml-3 flex-shrink-0 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Expanded Details */}
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-gray-700">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* User ID */}
                            <DetailItem label="User ID" value={booking.userId || booking.uid || 'N/A'} />

                            {/* User Name */}
                            <DetailItem label="Customer Name" value={booking.userName || booking.name || 'N/A'} />

                            {/* Service */}
                            <DetailItem label="Service" value={booking.serviceName || 'N/A'} />

                            {/* Appointment Date */}
                            <DetailItem label="Appointment Date" value={formatDate(booking.appointmentDate)} />

                            {/* Appointment Time */}
                            <DetailItem label="Appointment Time" value={booking.appointmentTime || 'N/A'} />

                            {/* Status */}
                            <DetailItem label="Booking Status" value={booking.status || 'N/A'} />

                            {/* Payment Amount */}
                            <DetailItem
                              label="Payment Amount"
                              value={booking.amount ? `₹${booking.amount}` : 'N/A'}
                            />

                            {/* Razorpay Payment ID */}
                            <DetailItem
                              label="Razorpay Payment ID"
                              value={booking.razorpayPaymentId || booking.paymentId || 'N/A'}
                              mono
                            />

                            {/* Created At */}
                            <DetailItem
                              label="Booked On"
                              value={formatTimestamp(booking.createdAt)}
                              fullWidth
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminProtection>
  );
}

/** Reusable detail row for the expanded accordion panel */
function DetailItem({ label, value, mono = false, fullWidth = false }) {
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm text-gray-200 ${mono ? 'font-mono' : ''} break-all`}>
        {value}
      </p>
    </div>
  );
}

export default function ManageBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading...</p>
          </div>
        </div>
      }
    >
      <ManageBookingsContent />
    </Suspense>
  );
}
