import { adminDb } from '../../../../lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing blog id' }, { status: 400 });
    }

    const docSnap = await adminDb.collection('blogs').doc(id).get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const data = docSnap.data();

    return NextResponse.json({
      id: docSnap.id,
      title: data.title || '',
      content: data.content || '',
      image_url: data.image_url || '',
      authorName: data.authorName || '',
      authorEmail: data.authorEmail || '',
      status: data.status || '',
      createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
