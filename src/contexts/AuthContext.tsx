import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { Database } from '../lib/supabase';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  user: any;
  profile: UserProfile | null;
  session: any;
  loading: boolean;
  signOut: () => Promise<void>;
  hasRole: (role: string | string[]) => boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  isDriver: boolean;
  isCustomer: boolean;
  isPropertySeller: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}