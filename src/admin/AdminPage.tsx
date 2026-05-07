import { useCallback, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { AlertTriangle } from 'lucide-react';
import { approvedAdminEmails, auth } from '../firebase';
import { AdminDashboard } from './AdminDashboard';
import { AdminLogin } from './AdminLogin';
import { LoadingSkeleton } from './components/LoadingSkeleton';

export const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState('');

  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const email = currentUser?.email?.toLowerCase() ?? '';
      const isApproved = Boolean(currentUser && approvedAdminEmails.includes(email));

      console.log('[AdminPage] Auth state changed:', { email, isApproved });

      if (currentUser && !isApproved) {
        await auth.signOut();
        setUser(null);
        setError('This Google account is not approved for Aurix admin access.');
      } else {
        setUser(currentUser);
      }

      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 py-10 text-[#fff7c4]">
        <div className="mx-auto max-w-7xl">
          <LoadingSkeleton />
        </div>
      </main>
    );
  }

  return (
    <>
      {error && (
        <div className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 items-start gap-3 rounded-lg border border-red-400/30 bg-red-950/90 p-4 text-sm text-red-100 shadow-2xl shadow-black">
          <AlertTriangle className="mt-0.5 shrink-0 text-red-300" size={18} />
          <p>{error}</p>
        </div>
      )}

      {user ? <AdminDashboard user={user} onError={handleError} /> : <AdminLogin onError={handleError} />}
    </>
  );
};
