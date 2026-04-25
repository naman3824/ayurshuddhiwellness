import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function initAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Server-only FIREBASE_PROJECT_ID takes precedence, falls back to the public one
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // If service account credentials are available, use cert() authentication
  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        // Vercel stores env vars with literal '\n' — convert to real newlines
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  }

  // Fallback: initialize without credentials (works in Google Cloud environments
  // where Application Default Credentials are available)
  return initializeApp({ projectId });
}

const app = initAdmin();
const adminAuth = getAuth(app);
const adminDb = getFirestore(app);

export { adminAuth, adminDb };
