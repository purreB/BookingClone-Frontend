'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { AuthSession } from '@/lib/types/auth';

const AUTH_STORAGE_KEY = 'bookingclone.auth';

export type AuthUser = {
  userId: string;
  email: string | null;
  fullName: string | null;
  roles: string[] | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isReady: boolean;
  setSession: (session: AuthSession) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as AuthSession;
    if (!data?.expiresAtUtc || !data?.userId) return null;
    if (new Date(data.expiresAtUtc) <= new Date()) {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSessionState(readStoredSession());
    setIsReady(true);
  }, []);

  const setSession = useCallback((next: AuthSession) => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
    setSessionState(next);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setSessionState(null);
  }, []);

  const value = useMemo((): AuthContextValue => {
    const user: AuthUser | null = session
      ? {
          userId: session.userId,
          email: session.email,
          fullName: session.fullName,
          roles: session.roles,
        }
      : null;

    return {
      user,
      accessToken: session?.accessToken ?? null,
      isReady,
      setSession,
      logout,
    };
  }, [session, isReady, setSession, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
