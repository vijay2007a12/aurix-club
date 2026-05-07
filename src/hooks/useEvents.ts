import { useEffect, useState } from 'react';
import { subscribeToEvents } from '../lib/firestore';
import { ClubEvent } from '../types';
import { defaultEvents } from '../utils/defaultEvents';

export const useEvents = () => {
  const [events, setEvents] = useState<ClubEvent[]>(defaultEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToEvents(
      (nextEvents) => {
        setEvents(nextEvents.length > 0 ? nextEvents : defaultEvents);
        setError('');
        setLoading(false);
      },
      (firestoreError) => {
        console.error('[useEvents] Failed to subscribe to events:', firestoreError);
        setError(firestoreError.message);
        setEvents(defaultEvents);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { events, loading, error };
};
