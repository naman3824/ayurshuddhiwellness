import { db } from './firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Example: Add a document to Firestore
 * Usage: await addPost({ title: 'My Post', content: 'Hello world' })
 */
export async function addPost({ title, content, author = 'Admin' }) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      author,
      createdAt: serverTimestamp(),
    });

    console.log('Document written with ID:', docRef.id);
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Error adding document:', error);
    return { error: error.message, success: false };
  }
}
