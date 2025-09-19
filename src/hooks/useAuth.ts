import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, db, isMockMode, mockSupabase } from '../lib/supabase';
import { mockUser } from '../lib/mockData';
import type { Database } from '../lib/supabase';

type UserProfile = Database['public']['Tables']['users']['Row'];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMockMode) {
      // Mock mode - check localStorage for user
      const mockUserData = localStorage.getItem('mock_user');
      if (mockUserData) {
        const userData = JSON.parse(mockUserData);
        setUser(userData);
        setProfile(userData);
        setSession({ user: userData, access_token: 'mock-token' } as any);
      }
      setLoading(false);
    } else {
      // Real Supabase mode
      supabase!.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase!.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
            setLoading(false);
          }
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    if (isMockMode) {
      setProfile(mockUser as any);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (isMockMode) {
      localStorage.removeItem('mock_user');
      setUser(null);
      setProfile(null);
      setSession(null);
    } else {
      const { error } = await supabase!.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    }
  };

  const hasRole = (requiredRole: string | string[]) => {
    if (!profile) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(profile.role);
    }
    
    return profile.role === requiredRole;
  };

  return {
    user,
    profile,
    session,
    loading,
    signOut,
    hasRole,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isSeller: profile?.role === 'seller',
    isDriver: profile?.role === 'driver',
    isCustomer: profile?.role === 'customer',
    isPropertySeller: profile?.role === 'property_seller',
    isMockMode,
  };
}