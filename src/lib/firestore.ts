import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ClubEvent, EventRegistration } from '../types';
import { db } from './firebase';

export const eventsCollection = collection(db, 'events');
export const applicationsCollection = collection(db, 'applications');
export const usersCollection = collection(db, 'users');
export const registrationsCollection = collection(db, 'registrations');

export const subscribeToEvents = (callback: (events: ClubEvent[]) => void, onError: (error: Error) => void) => {
  return onSnapshot(
    eventsCollection,
    (snapshot) => {
      const events = snapshot.docs
        .map((eventDoc) => {
          const data = eventDoc.data();
          const createdAtValue = data.createdAt;

          return {
            id: eventDoc.id,
            title: String(data.title ?? ''),
            description: String(data.description ?? ''),
            date: String(data.date ?? ''),
            venue: String(data.venue ?? ''),
            category: String(data.category ?? ''),
            image: String(data.image ?? ''),
            registrationOpen: Boolean(data.registrationOpen),
            createdAt: createdAtValue?.toDate ? createdAtValue.toDate() : null,
          };
        })
        .sort((first, second) => first.date.localeCompare(second.date));

      callback(events);
    },
    onError
  );
};

export const saveEvent = async (event: Omit<ClubEvent, 'id' | 'createdAt'>, eventId?: string) => {
  if (eventId) {
    await updateDoc(doc(db, 'events', eventId), event);
    return eventId;
  }

  const docRef = await addDoc(eventsCollection, {
    ...event,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const deleteEvent = (eventId: string) => deleteDoc(doc(db, 'events', eventId));

export const updateEventRegistrationState = (eventId: string, registrationOpen: boolean) => {
  return updateDoc(doc(db, 'events', eventId), { registrationOpen });
};

export const applyForEvent = async (
  registration: Omit<EventRegistration, 'id' | 'timestamp'> & {
    eventTitle: string;
    year: string;
    domain: string;
  }
) => {
  const existingRegistrationQuery = query(
    registrationsCollection,
    where('userId', '==', registration.userId),
    where('eventId', '==', registration.eventId)
  );
  const existingRegistrationSnapshot = await getDocs(existingRegistrationQuery);

  if (!existingRegistrationSnapshot.empty) {
    throw new Error('You are already registered for this event.');
  }

  const existingApplicationQuery = query(
    applicationsCollection,
    where('userId', '==', registration.userId),
    where('eventId', '==', registration.eventId),
    where('applicationType', '==', 'event')
  );
  const existingApplicationSnapshot = await getDocs(existingApplicationQuery);

  if (!existingApplicationSnapshot.empty) {
    throw new Error('Your event application is already pending with admin.');
  }

  await addDoc(applicationsCollection, {
    applicationType: 'event',
    userId: registration.userId,
    eventId: registration.eventId,
    eventTitle: registration.eventTitle,
    fullName: registration.name,
    email: registration.email,
    year: registration.year,
    interestedDomain: registration.domain,
    linkedinId: '',
    status: 'pending',
    timestamp: serverTimestamp(),
  });
};

export const subscribeToUserRegistrations = (
  userId: string,
  callback: (registrations: EventRegistration[]) => void,
  onError: (error: Error) => void
) => {
  const userRegistrationsQuery = query(registrationsCollection, where('userId', '==', userId));

  return onSnapshot(
    userRegistrationsQuery,
    (snapshot) => {
      callback(
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
    onError
  );
};
