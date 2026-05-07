import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createOrUpdateUserProfile, loginWithEmail, loginWithGoogle, logout, signUpStudent } from '../lib/auth';
import { UserProfile, UserRole } from '../types';

interface SignUpInput {
  fullName: string;
  email: string;
  password: string;
  year: string;
  domain: string;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (input: SignUpInput) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const nextProfile = await createOrUpdateUserProfile(currentUser);
        setProfile(nextProfile);
      } catch (error) {
        console.error('[AuthContext] Failed to load user profile:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      signUp: async (input) => {
        await signUpStudent(input);
      },
      login: async (email, password) => {
        await loginWithEmail(email, password);
      },
      googleLogin: async () => {
        await loginWithGoogle();
      },
      signOut: logout,
      hasRole: (role) => profile?.role === role,
    }),
    [loading, profile, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
