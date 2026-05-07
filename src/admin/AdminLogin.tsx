import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { LogIn, Shield } from 'lucide-react';
import { approvedAdminEmails, auth, googleProvider } from '../firebase';

interface AdminLoginProps {
  onError: (message: string) => void;
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to sign in.';
};

export const AdminLogin = ({ onError }: AdminLoginProps) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    onError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email?.toLowerCase() ?? '';

      console.log('[AdminLogin] Google sign-in completed:', email);

      if (!approvedAdminEmails.includes(email)) {
        await auth.signOut();
        throw new Error('This Google account is not approved for Aurix admin access.');
      }
    } catch (error) {
      const message = getErrorMessage(error);

      console.error('[AdminLogin] Google sign-in failed:', error);
      onError(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-[#fff7c4]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-lg border border-[#d4af37]/20 bg-black/70 p-8 shadow-2xl shadow-black"
        >
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f7e082]">
            <Shield size={26} />
          </div>

          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Aurix Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-[#fff1a8]">Dashboard Login</h1>
          <p className="mt-3 text-sm leading-6 text-[#c9b66f]">
            Sign in with an approved Google account to review and manage club applications.
          </p>

          <button
            type="button"
            disabled={isSigningIn}
            onClick={handleGoogleLogin}
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 font-semibold text-[#fff1a8] hover:bg-[#d4af37]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={18} />
            {isSigningIn ? 'Signing in...' : 'Continue with Google'}
          </button>
        </motion.div>
      </div>
    </main>
  );
};
