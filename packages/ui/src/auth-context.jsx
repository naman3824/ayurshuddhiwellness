'use client';

import { createContext, useContext } from 'react';

/**
 * Shared AuthContext definition.
 * The actual AuthProvider (with Firebase logic) lives in apps/main.
 * This module is consumed by packages/ui components (Navbar, etc.)
 * so they can call useAuth() without depending on the app directly.
 */
export const AuthContext = createContext({
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
