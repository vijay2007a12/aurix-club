import { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'student';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  role: UserRole;
  year: string;
  domain: string;
  createdAt: Timestamp | Date | null;
}

export interface ClubApplication {
  id: string;
  fullName: string;
  email: string;
  year: string;
  interestedDomain: string;
  linkedinId: string;
  status: ApplicationStatus;
  submittedAt: Date | null;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  image: string;
  registrationOpen: boolean;
  createdAt: Date | null;
}

export interface EventRegistration {
  id: string;
  userId: string;
  eventId: string;
  name: string;
  email: string;
  timestamp: Date | null;
}
