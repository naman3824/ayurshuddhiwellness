'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebaseClient';

function hasRequiredProfileFields(profile) {
  return Boolean(profile?.age) && Boolean(profile?.phone);
}

const AuthContext = createContext({
  currentUser: null,
  loading: true,
  isAdmin: false,
  registerWithEmail: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

async function syncUserProfile(user, existingUser = {}, userExists = false) {
  if (!db) {
    throw new Error('Firestore is not configured.');
  }

  const userRef = doc(db, 'users', user.uid);
  const baseProfile = {
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
  };

  if (!userExists) {
    baseProfile.uid = user.uid;
    baseProfile.email = user.email || '';
    baseProfile.role = existingUser.role || 'user';
    baseProfile.createdAt = existingUser.createdAt || serverTimestamp();
  }

  await setDoc(userRef, baseProfile, { merge: true });
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user && db) {
        // Fetch the user's role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.role === 'admin');
          } else {
            setIsAdmin(false);
          }
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async (lang = 'en-IN') => {
    if (!auth) {
      throw new Error('Firebase Auth is not configured.');
    }

    if (!db) {
      throw new Error('Firestore is not configured.');
    }

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userRef = doc(db, 'users', result.user.uid);
    const userDoc = await getDoc(userRef);
    const existingUser = userDoc.exists() ? userDoc.data() : {};
    const needsOnboarding = !userDoc.exists() || !hasRequiredProfileFields(existingUser);

    await syncUserProfile(result.user, existingUser, userDoc.exists());
    router.push(`/${lang}/${needsOnboarding ? 'onboarding' : 'profile'}`);

    return { result, needsOnboarding };
  };

  const registerWithEmail = async ({
    fullName,
    email,
    password,
    age,
    phone,
    healthConditions,
  }) => {
    if (!auth) {
      throw new Error('Firebase Auth is not configured.');
    }

    if (!db) {
      throw new Error('Firestore is not configured.');
    }

    let userCredential;

    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      await sendEmailVerification(user);
      await updateProfile(user, { displayName: fullName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: fullName,
        displayName: fullName,
        email: user.email || email,
        age: age ? Number(age) : null,
        phone,
        healthConditions,
        role: 'user',
        createdAt: serverTimestamp(),
      });

      return userCredential;
    } finally {
      if (userCredential) {
        try {
          await signOut(auth);
        } catch {
          // Keep the original signup result/error if sign-out cleanup fails.
        }
      }
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch {
      // Logout failed silently
    }
  };

  const value = useMemo(() => ({
    currentUser,
    loading,
    isAdmin,
    registerWithEmail,
    loginWithGoogle,
    logout,
  }), [currentUser, loading, isAdmin]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
