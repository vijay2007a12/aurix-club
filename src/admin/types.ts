import { Timestamp } from 'firebase/firestore';

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  applicationType: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  year: string;
  interestedDomain: string;
  linkedinId: string;
  status: ApplicationStatus;
  submittedAt: Date | null;
  rawSubmittedAt?: Timestamp | Date | string | null;
}

export interface ApplicationFilters {
  domain: string;
  year: string;
  status: string;
}
