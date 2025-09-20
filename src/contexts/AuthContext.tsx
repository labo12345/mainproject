@@ .. @@
 import React, { createContext, useContext } from 'react';
 import { useAuth } from '../hooks/useAuth';
-import { User, Session } from '@supabase/supabase-js';
 import type { Database } from '../lib/supabase';
 
 type UserProfile = Database['public']['Tables']['users']['Row'];
@@ -15,7 +14,6 @@ interface AuthContextType {
   isDriver: boolean;
   isCustomer: boolean;
   isPropertySeller: boolean;
-  isMockMode: boolean;
 }
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);