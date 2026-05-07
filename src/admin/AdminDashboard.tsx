import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { Briefcase, CalendarDays, Cpu, FileText, HardDrive, Home, Megaphone, Users } from 'lucide-react';
import { auth, db } from '../firebase';
import { AdminTable } from './components/AdminTable';
import { EventManager } from './components/EventManager';
import { FilterBar } from './components/FilterBar';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { SearchBar } from './components/SearchBar';
import { StatCard } from './components/StatCard';
import { UsersTable } from './components/UsersTable';
import { Application, ApplicationFilters, ApplicationStatus } from './types';
import { applyFilters, getUniqueValues, normalizeStatus, parseSubmittedAt } from './utils';
import { subscribeToEvents } from '../lib/firestore';
import { ClubEvent, EventRegistration, UserProfile } from '../types';

interface AdminDashboardProps {
  user: User;
  onError: (message: string) => void;
}

const initialFilters: ApplicationFilters = {
  domain: '',
  year: '',
  status: 'pending',
};

const getTextField = (data: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
};

export const AdminDashboard = ({ user, onError }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [filters, setFilters] = useState<ApplicationFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'users' | 'events'>('applications');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    console.log('[AdminDashboard] Subscribing to applications collection.');

    const unsubscribe = onSnapshot(
      collection(db, 'applications'),
      (snapshot) => {
        const nextApplications = snapshot.docs
          .map((applicationDoc) => {
            const data = applicationDoc.data();
            const submittedAtValue = data.timestamp ?? data.submittedAt ?? data.createdAt ?? null;

            return {
              id: applicationDoc.id,
              applicationType: getTextField(data, ['applicationType']) || 'club',
              userId: getTextField(data, ['userId']),
              eventId: getTextField(data, ['eventId']),
              eventTitle: getTextField(data, ['eventTitle']),
              fullName: getTextField(data, ['fullName', 'name']),
              email: getTextField(data, ['email', 'emailId']),
              year: getTextField(data, ['year']),
              interestedDomain: getTextField(data, ['interestedDomain', 'domain']),
              linkedinId: getTextField(data, ['linkedinId', 'linkedIn', 'linkedin']),
              status: normalizeStatus(data.status),
              submittedAt: parseSubmittedAt(submittedAtValue),
              rawSubmittedAt: submittedAtValue,
            };
          })
          .sort((first, second) => {
            return (second.submittedAt?.getTime() ?? 0) - (first.submittedAt?.getTime() ?? 0);
          });

        console.log('[AdminDashboard] Applications updated:', nextApplications.length);
        setApplications(nextApplications);
        setIsLoading(false);
        onError('');
      },
      (error) => {
        console.error('[AdminDashboard] Realtime Firestore subscription failed:', error);
        onError(error.message);
        setIsLoading(false);
      }
    );

    return () => {
      console.log('[AdminDashboard] Unsubscribing from applications collection.');
      unsubscribe();
    };
  }, [onError]);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        setUsers(snapshot.docs.map((userDoc) => userDoc.data() as UserProfile));
      },
      (error) => {
        console.error('[AdminDashboard] Users subscription failed:', error);
        onError(error.message);
      }
    );

    const unsubscribeRegistrations = onSnapshot(
      collection(db, 'registrations'),
      (snapshot) => {
        setRegistrations(
          snapshot.docs.map((registrationDoc) => {
            const data = registrationDoc.data();

            return {
              id: registrationDoc.id,
              userId: String(data.userId ?? ''),
              eventId: String(data.eventId ?? ''),
              name: String(data.name ?? ''),
              email: String(data.email ?? ''),
              timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : null,
            };
          })
        );
      },
      (error) => {
        console.error('[AdminDashboard] Registrations subscription failed:', error);
        onError(error.message);
      }
    );

    const unsubscribeEvents = subscribeToEvents(
      setEvents,
      (error) => {
        console.error('[AdminDashboard] Events subscription failed:', error);
        onError(error.message);
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeRegistrations();
      unsubscribeEvents();
    };
  }, [onError]);

  const filteredApplications = useMemo(
    () => applyFilters(applications, filters, searchTerm),
    [applications, filters, searchTerm]
  );

  const domains = useMemo(() => getUniqueValues(applications, 'interestedDomain'), [applications]);
  const years = useMemo(() => getUniqueValues(applications, 'year'), [applications]);

  const stats = useMemo(() => {
    const countByDomain = (domain: string) => {
      return applications.filter((application) => application.interestedDomain.toLowerCase() === domain).length;
    };

    return {
      total: applications.length,
      tech: countByDomain('tech'),
      marketing: countByDomain('marketing'),
      pr: applications.filter((application) => ['pr', 'pr & outreach'].includes(application.interestedDomain.toLowerCase())).length,
      hardware: countByDomain('hardware'),
    };
  }, [applications]);

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    setUpdatingId(id);
    onError('');

    try {
      console.log('[AdminDashboard] Updating application status:', { id, status });
      const application = applications.find((item) => item.id === id);

      await updateDoc(doc(db, 'applications', id), {
        status,
      });

      if (status === 'accepted' && application?.applicationType === 'event' && application.eventId && application.userId) {
        const duplicateRegistrationQuery = query(
          collection(db, 'registrations'),
          where('userId', '==', application.userId),
          where('eventId', '==', application.eventId)
        );
        const duplicateRegistrationSnapshot = await getDocs(duplicateRegistrationQuery);

        if (duplicateRegistrationSnapshot.empty) {
          await addDoc(collection(db, 'registrations'), {
            userId: application.userId,
            eventId: application.eventId,
            name: application.fullName,
            email: application.email,
            timestamp: serverTimestamp(),
          });
        }
      }

      console.log('[AdminDashboard] Application status updated:', { id, status });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update application status.';

      console.error('[AdminDashboard] Status update failed:', error);
      onError(message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign out.';

      console.error('[AdminDashboard] Sign out failed:', error);
      onError(message);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-6 text-[#fff7c4] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-[#d4af37]/15 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm uppercase tracking-[0.28em] text-[#d4af37]">Aurix Club</p>
            <h1 className="mt-2 text-3xl font-bold text-[#fff1a8] sm:text-4xl">Applications Dashboard</h1>
            <p className="mt-2 text-sm text-[#c9b66f]">Signed in as {user.email}</p>
          </motion.div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d4af37]/25 bg-black/60 px-5 text-sm font-semibold text-[#fff1a8] hover:bg-[#d4af37]/10"
            >
              <Home size={17} />
              Home
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="h-11 rounded-lg border border-[#d4af37]/25 bg-black/60 px-5 text-sm font-semibold text-[#fff1a8] hover:bg-[#d4af37]/10"
            >
              Sign Out
            </button>
          </div>
        </header>

        <section className="py-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <StatCard label="Total Applications" value={stats.total} icon={Users} />
                <StatCard label="Tech Applicants" value={stats.tech} icon={Cpu} />
                <StatCard label="Marketing Applicants" value={stats.marketing} icon={Briefcase} />
                <StatCard label="PR Applicants" value={stats.pr} icon={Megaphone} />
                <StatCard label="Hardware Applicants" value={stats.hardware} icon={HardDrive} />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard label="Registered Users" value={users.length} icon={Users} />
                <StatCard label="Live Events" value={events.length} icon={CalendarDays} />
                <StatCard label="Event Registrations" value={registrations.length} icon={FileText} />
              </div>

              <div className="flex flex-wrap gap-2 rounded-lg border border-[#d4af37]/15 bg-black/50 p-2">
                {[
                  { id: 'applications', label: 'Applications' },
                  { id: 'users', label: 'Users' },
                  { id: 'events', label: 'Events' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                      activeTab === tab.id ? 'bg-[#d4af37] text-black' : 'text-[#fff1a8] hover:bg-[#d4af37]/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'applications' && (
                <>
                  <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    <FilterBar filters={filters} domains={domains} years={years} onChange={setFilters} />
                  </div>
                  <AdminTable applications={filteredApplications} updatingId={updatingId} onStatusChange={handleStatusChange} />
                </>
              )}

              {activeTab === 'users' && (
                <>
                  <SearchBar value={searchTerm} onChange={setSearchTerm} />
                  <UsersTable users={users} searchTerm={searchTerm} />
                </>
              )}

              {activeTab === 'events' && <EventManager events={events} registrations={registrations} />}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
