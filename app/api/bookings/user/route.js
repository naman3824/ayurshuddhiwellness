import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '../../../../lib/firebaseAdmin';

// GET /api/bookings/user — fetch bookings for the authenticated user
export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const snapshot = await adminDb
      .collection('bookings')
      .where('userId', '==', uid)
      .get();

    const bookings = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          serviceName: data.serviceName || '',
          appointmentDate: data.appointmentDate || '',
          appointmentTime: data.appointmentTime || '',
          durationMinutes: data.durationMinutes || 0,
          customerName: data.customerName || '',
          status: data.status || 'confirmed',
          confirmationNumber: data.confirmationNumber || '',
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        };
      })
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// DELETE /api/bookings/user?id=xxx — delete a booking by ID (only if owned by user)
export async function DELETE(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing booking id' }, { status: 400 });
    }

    // Verify ownership before deleting
    const bookingRef = adminDb.collection('bookings').doc(bookingId);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (bookingDoc.data().userId !== uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await bookingRef.delete();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
