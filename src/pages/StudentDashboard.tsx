import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2, Home, LogOut, MapPin, UserCog } from 'lucide-react';
import { collection, doc, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { Toast } from '../components/ui/Toast';
import { useAuth } from '../context/AuthContext';
import { applyForEvent, subscribeToUserRegistrations } from '../lib/firestore';
import { db } from '../lib/firebase';
import { EventRegistration } from '../types';
import { useEvents } from '../hooks/useEvents';

const domains = ['Tech', 'PR & Outreach', 'Media & Design', 'Hardware', 'Marketing'];
const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Other'];

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { events, loading: eventsLoading } = useEvents();
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [pendingEventIds, setPendingEventIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [registeringId, setRegisteringId] = useState('');
  const [fullName, setFullName] = useState(profile?.fullName ?? '');
  const [year, setYear] = useState(profile?.year ?? '');
  const [domain, setDomain] = useState(profile?.domain ?? '');

  useEffect(() => {
    setFullName(profile?.fullName ?? '');
    setYear(profile?.year ?? '');
    setDomain(profile?.domain ?? '');
  }, [profile]);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    return subscribeToUserRegistrations(
      user.uid,
      setRegistrations,
      (error) => {
        console.error('[StudentDashboard] Registration subscription failed:', error);
        setToast({ message: error.message, type: 'error' });
      }
    );
  }, [user]);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const applicationsQuery = query(
      collection(db, 'applications'),
      where('userId', '==', user.uid),
      where('applicationType', '==', 'event'),
      where('status', '==', 'pending')
    );

    return onSnapshot(
      applicationsQuery,
      (snapshot) => {
        setPendingEventIds(new Set(snapshot.docs.map((applicationDoc) => String(applicationDoc.data().eventId ?? ''))));
      },
      (error) => {
        console.error('[StudentDashboard] Pending applications subscription failed:', error);
      }
    );
  }, [user]);

  const registeredEventIds = useMemo(() => new Set(registrations.map((registration) => registration.eventId)), [registrations]);
  const registeredEvents = useMemo(
    () => events.filter((event) => registeredEventIds.has(event.id)),
    [events, registeredEventIds]
  );

  const saveProfile = async () => {
    if (!user) {
      return;
    }

    setSavingProfile(true);

    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName,
        email: user.email ?? profile?.email ?? '',
        role: profile?.role ?? 'student',
        year,
        domain,
        createdAt: profile?.createdAt ?? serverTimestamp(),
      }, { merge: true });
      setToast({ message: 'Profile updated successfully.', type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update profile.';

      console.error('[StudentDashboard] Profile update failed:', error);
      setToast({ message, type: 'error' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!user) {
      return;
    }

    setRegisteringId(eventId);

    try {
      const selectedEvent = events.find((event) => event.id === eventId);

      await applyForEvent({
        userId: user.uid,
        eventId,
        eventTitle: selectedEvent?.title ?? 'Aurix Event',
        name: profile?.fullName || user.displayName || user.email || 'Aurix Student',
        email: profile?.email || user.email || '',
        year: profile?.year || year || '',
        domain: profile?.domain || domain || '',
      });
      setToast({ message: 'Application sent to admin for approval.', type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to register for event.';

      console.error('[StudentDashboard] Event registration failed:', error);
      setToast({ message, type: 'error' });
    } finally {
      setRegisteringId('');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-6 text-[#fff7c4] sm:px-6 lg:px-8">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />

      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-[#d4af37]/15 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm uppercase tracking-[0.28em] text-[#d4af37]">Student Hub</p>
            <h1 className="mt-2 text-3xl font-bold text-[#fff1a8]">Welcome, {profile?.fullName || user?.email}</h1>
            <p className="mt-2 text-sm text-[#c9b66f]">Manage events, profile, and Aurix participation.</p>
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
              onClick={signOut}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d4af37]/25 bg-black/60 px-5 text-sm font-semibold text-[#fff1a8] hover:bg-[#d4af37]/10"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-6 py-6 lg:grid-cols-[0.85fr_1.5fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-[#d4af37]/20 bg-black/60 p-5"
          >
            <div className="mb-5 flex items-center gap-3">
              <UserCog className="text-[#f7e082]" />
              <h2 className="text-xl font-bold text-[#fff1a8]">Profile</h2>
            </div>
            <div className="space-y-4">
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} className="h-11 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 text-sm outline-none" />
              <select value={year} onChange={(event) => setYear(event.target.value)} className="h-11 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 text-sm outline-none">
                <option value="">Select year</option>
                {years.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select value={domain} onChange={(event) => setDomain(event.target.value)} className="h-11 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 text-sm outline-none">
                <option value="">Select domain</option>
                {domains.map((item) => <option key={item}>{item}</option>)}
              </select>
              <button type="button" disabled={savingProfile} onClick={saveProfile} className="h-11 w-full rounded-lg bg-[#d4af37] font-bold text-black disabled:opacity-60">
                {savingProfile ? 'Saving...' : 'Update Profile'}
              </button>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 font-semibold text-[#fff1a8]">Registered Events</h3>
              <div className="space-y-2">
                {registeredEvents.length === 0 ? (
                  <p className="text-sm text-[#c9b66f]">No event registrations yet.</p>
                ) : (
                  registeredEvents.map((event) => (
                    <div key={event.id} className="rounded-lg border border-[#d4af37]/10 bg-[#d4af37]/5 p-3 text-sm text-[#d9c77c]">
                      {event.title}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-[#fff1a8]">Dynamic Events</h2>
            {eventsLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-lg bg-[#d4af37]/10" />)}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {events.map((event, index) => {
                  const isRegistered = registeredEventIds.has(event.id);
                  const isPending = pendingEventIds.has(event.id);

                  return (
                    <motion.article
                      key={event.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="overflow-hidden rounded-lg border border-[#d4af37]/20 bg-black/60"
                    >
                      <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
                      <div className="p-5">
                        <div className="mb-3 inline-flex rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1 text-xs uppercase text-[#f7e082]">{event.category}</div>
                        <h3 className="text-xl font-bold text-[#fff1a8]">{event.title}</h3>
                        <p className="mt-2 text-sm text-[#c9b66f]">{event.description}</p>
                        <div className="mt-4 space-y-2 text-sm text-[#d9c77c]">
                          <p className="flex items-center gap-2"><Calendar size={16} className="text-[#d4af37]" />{event.date}</p>
                          <p className="flex items-center gap-2"><MapPin size={16} className="text-[#d4af37]" />{event.venue}</p>
                        </div>
                        <button
                          type="button"
                          disabled={!event.registrationOpen || isRegistered || isPending || registeringId === event.id}
                          onClick={() => handleRegister(event.id)}
                          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f8e68f] via-[#d4af37] to-[#b08a1f] font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {(isRegistered || isPending) && <CheckCircle2 size={17} />}
                          {isRegistered
                            ? 'Registered'
                            : isPending
                              ? 'Pending Admin Approval'
                              : registeringId === event.id
                                ? 'Sending Application...'
                                : event.registrationOpen
                                  ? 'Apply to Register'
                                  : 'Closed'}
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
