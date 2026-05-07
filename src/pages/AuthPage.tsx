import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Chrome, LogIn, UserPlus } from 'lucide-react';
import { Toast } from '../components/ui/Toast';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  mode: 'login' | 'signup';
  admin?: boolean;
}

const domains = ['Tech', 'PR & Outreach', 'Media & Design', 'Hardware', 'Marketing'];
const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Other'];

export const AuthPage = ({ mode, admin = false }: AuthPageProps) => {
  const { user, profile, login, signUp, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const isSignup = mode === 'signup';
  const title = admin ? 'Admin Login' : isSignup ? 'Student Signup' : 'Student Login';

  if (user && profile) {
    return <Navigate to={profile.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setToast('');

    try {
      if (isSignup) {
        await signUp({ fullName, email, password, year, domain });
      } else {
        await login(email, password);
      }

      const redirectTo = admin ? '/admin' : (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed.';

      console.error('[AuthPage] Auth failed:', error);
      setToast(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setToast('');

    try {
      await googleLogin();
      navigate(admin ? '/admin' : '/dashboard', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Google login failed.';

      console.error('[AuthPage] Google auth failed:', error);
      setToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-[#fff7c4]">
      <Toast message={toast} type="error" onClose={() => setToast('')} />
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="w-full rounded-lg border border-[#d4af37]/20 bg-black/75 p-8 shadow-2xl shadow-black"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[#d4af37]">Aurix Club</p>
          <h1 className="mt-3 text-3xl font-bold text-[#fff1a8]">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-[#c9b66f]">
            Access the Aurix innovation platform for events, applications, and club operations.
          </p>

          <div className="mt-8 space-y-4">
            {isSignup && (
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                placeholder="Full name"
                className="h-12 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-4 text-sm outline-none placeholder:text-[#8a7a47] focus:border-[#d4af37]/60"
              />
            )}

            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              placeholder="Email address"
              className="h-12 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-4 text-sm outline-none placeholder:text-[#8a7a47] focus:border-[#d4af37]/60"
            />

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              minLength={6}
              placeholder="Password"
              className="h-12 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-4 text-sm outline-none placeholder:text-[#8a7a47] focus:border-[#d4af37]/60"
            />

            {isSignup && (
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  required
                  className="h-12 rounded-lg border border-[#d4af37]/20 bg-black/70 px-4 text-sm outline-none focus:border-[#d4af37]/60"
                >
                  <option value="">Year</option>
                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  required
                  className="h-12 rounded-lg border border-[#d4af37]/20 bg-black/70 px-4 text-sm outline-none focus:border-[#d4af37]/60"
                >
                  <option value="">Domain</option>
                  {domains.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f8e68f] via-[#d4af37] to-[#b08a1f] font-bold text-black disabled:opacity-60"
          >
            {isSignup ? <UserPlus size={18} /> : <LogIn size={18} />}
            {loading ? 'Please wait...' : title}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogle}
            className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#d4af37]/25 bg-[#d4af37]/10 font-semibold text-[#fff1a8] hover:bg-[#d4af37]/20 disabled:opacity-60"
          >
            <Chrome size={18} />
            Continue with Google
          </button>

          <div className="mt-6 text-center text-sm text-[#c9b66f]">
            {isSignup ? (
              <Link to="/login" className="text-[#fff1a8] hover:text-white">
                Already registered? Login
              </Link>
            ) : (
              <Link to="/signup" className="text-[#fff1a8] hover:text-white">
                New student? Create account
              </Link>
            )}
          </div>
        </motion.form>
      </div>
    </main>
  );
};
