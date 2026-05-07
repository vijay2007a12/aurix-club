import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingSkeleton } from '../admin/components/LoadingSkeleton';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  role?: UserRole;
}

export const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 py-10 text-[#fff7c4]">
        <div className="mx-auto max-w-7xl">
          <LoadingSkeleton />
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (role === 'student') {
    if (profile?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
  }

  if (role === 'admin' && profile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
