import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '../../../../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

// GET: Fetch like/dislike counts and user's current vote status
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || '';

    const docRef = adminDb.collection('blogs').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const data = docSnap.data();
    const likes = data.likes || [];
    const dislikes = data.dislikes || [];

    return NextResponse.json({
      likes: likes.length,
      dislikes: dislikes.length,
      userLiked: userId ? likes.includes(userId) : false,
      userDisliked: userId ? dislikes.includes(userId) : false,
    });
  } catch (error) {
    console.error('Error fetching engagement:', error);
    return NextResponse.json({ error: 'Failed to fetch engagement' }, { status: 500 });
  }
}

// POST: Toggle like or dislike (requires Firebase Auth token)
export async function POST(request, { params }) {
  try {
    const { id } = await params;

    // ── Verify Firebase Auth token ──
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const uid = decodedToken.uid; // Trusted UID from verified token

    const body = await request.json();
    const { action } = body;

    if (!['like', 'dislike'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const docRef = adminDb.collection('blogs').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const data = docSnap.data();
    const likes = data.likes || [];
    const dislikes = data.dislikes || [];

    if (action === 'like') {
      if (likes.includes(uid)) {
        // Already liked → remove like (toggle off)
        await docRef.update({ likes: FieldValue.arrayRemove(uid) });
      } else {
        // Add like, remove dislike if present
        const updates = { likes: FieldValue.arrayUnion(uid) };
        if (dislikes.includes(uid)) {
          updates.dislikes = FieldValue.arrayRemove(uid);
        }
        await docRef.update(updates);
      }
    } else {
      if (dislikes.includes(uid)) {
        // Already disliked → remove dislike (toggle off)
        await docRef.update({ dislikes: FieldValue.arrayRemove(uid) });
      } else {
        // Add dislike, remove like if present
        const updates = { dislikes: FieldValue.arrayUnion(uid) };
        if (likes.includes(uid)) {
          updates.likes = FieldValue.arrayRemove(uid);
        }
        await docRef.update(updates);
      }
    }

    // Return updated counts
    const updatedSnap = await docRef.get();
    const updatedData = updatedSnap.data();
    const updatedLikes = updatedData.likes || [];
    const updatedDislikes = updatedData.dislikes || [];

    return NextResponse.json({
      likes: updatedLikes.length,
      dislikes: updatedDislikes.length,
      userLiked: updatedLikes.includes(uid),
      userDisliked: updatedDislikes.includes(uid),
    });
  } catch (error) {
    console.error('Error updating engagement:', error);
    return NextResponse.json({ error: 'Failed to update engagement' }, { status: 500 });
  }
}
