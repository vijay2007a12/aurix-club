import { Timestamp } from 'firebase/firestore';
import { Application, ApplicationFilters, ApplicationStatus } from './types';

const STATUS_VALUES: ApplicationStatus[] = ['pending', 'accepted', 'rejected'];

const normalize = (value: unknown) => String(value ?? '').trim();

export const normalizeStatus = (value: unknown): ApplicationStatus => {
  const status = normalize(value).toLowerCase();

  if (STATUS_VALUES.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }

  return 'pending';
};

export const formatLabel = (value: string) => {
  if (!value) {
    return 'Not provided';
  }

  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const parseSubmittedAt = (value: unknown) => {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
};

export const formatDateTime = (date: Date | null) => {
  if (!date) {
    return 'Pending timestamp';
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const applyFilters = (
  applications: Application[],
  filters: ApplicationFilters,
  searchTerm: string
) => {
  const query = searchTerm.trim().toLowerCase();

  return applications.filter((application) => {
    const matchesDomain = !filters.domain || application.interestedDomain === filters.domain;
    const matchesYear = !filters.year || application.year === filters.year;
    const matchesStatus = !filters.status || application.status === filters.status;
    const searchableText = [
      application.fullName,
      application.email,
      application.year,
      application.interestedDomain,
      application.linkedinId,
      application.status,
    ]
      .join(' ')
      .toLowerCase();

    return matchesDomain && matchesYear && matchesStatus && (!query || searchableText.includes(query));
  });
};

export const getUniqueValues = (applications: Application[], key: keyof Application) => {
  return Array.from(
    new Set(
      applications
        .map((application) => application[key])
        .filter((value): value is string => typeof value === 'string' && value.length > 0)
    )
  ).sort((a, b) => a.localeCompare(b));
};
