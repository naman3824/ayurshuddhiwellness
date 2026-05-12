import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '../../../../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

// GET: Fetch comments for a blog post (public, no auth required)
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const snapshot = await adminDb
      .collection('blogs')
      .doc(id)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .get();

    const comments = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userName: data.userName || 'Anonymous',
        text: data.text || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      };
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST: Add a comment (requires Firebase Auth token)
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

    const uid = decodedToken.uid;

    const body = await request.json();
    const { text } = body;

    if (!text?.trim()) {
      return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
    }

    if (text.trim().length > 1000) {
      return NextResponse.json({ error: 'Comment must be under 1000 characters' }, { status: 400 });
    }

    // Fetch the user's display name from Firebase Auth
    let userName = 'Anonymous';
    try {
      const userRecord = await adminAuth.getUser(uid);
      userName = userRecord.displayName || userRecord.email?.split('@')[0] || 'Anonymous';
    } catch {
      // If we can't fetch user info, default to Anonymous
    }

    const commentData = {
      userId: uid,
      userName,
      text: text.trim(),
      createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await adminDb
      .collection('blogs')
      .doc(id)
      .collection('comments')
      .add(commentData);

    return NextResponse.json({
      id: docRef.id,
      userName,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
