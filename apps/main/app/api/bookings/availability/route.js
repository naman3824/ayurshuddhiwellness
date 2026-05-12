import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Missing required query parameter: date' },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Expected YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    // Query bookings for the given date using Admin SDK (bypasses security rules)
    const snapshot = await adminDb
      .collection('bookings')
      .where('appointmentDate', '==', date)
      .get();

    // Sanitize: return ONLY time + duration, strip all PII
    const slots = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.status !== 'cancelled') // Skip cancelled bookings
      .map((data) => ({
        appointmentTime: data.appointmentTime || '',
        durationMinutes: data.durationMinutes || 30,
      }));

    return NextResponse.json({ slots, date });
  } catch (error) {
    console.error('Error fetching booking availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
