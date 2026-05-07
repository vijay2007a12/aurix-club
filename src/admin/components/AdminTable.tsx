import { motion } from 'framer-motion';
import { Check, Clock3, ExternalLink, X } from 'lucide-react';
import { Application, ApplicationStatus } from '../types';
import { formatDateTime, formatLabel } from '../utils';

interface AdminTableProps {
  applications: Application[];
  updatingId: string | null;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

const statusStyles: Record<ApplicationStatus, string> = {
  pending: 'border-[#d4af37]/30 bg-[#d4af37]/10 text-[#fff1a8]',
  accepted: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  rejected: 'border-red-400/25 bg-red-400/10 text-red-300',
};

const actionStyles: Record<ApplicationStatus, string> = {
  pending: 'border-[#d4af37]/25 text-[#fff1a8] hover:bg-[#d4af37]/10',
  accepted: 'border-emerald-400/25 text-emerald-300 hover:bg-emerald-400/10',
  rejected: 'border-red-400/25 text-red-300 hover:bg-red-400/10',
};

const actionIcons = {
  pending: Clock3,
  accepted: Check,
  rejected: X,
};

const actionLabels: Record<ApplicationStatus, string> = {
  pending: 'Pending',
  accepted: 'Accept',
  rejected: 'Reject',
};

const statusActions: ApplicationStatus[] = ['accepted', 'rejected', 'pending'];

export const AdminTable = ({ applications, updatingId, onStatusChange }: AdminTableProps) => {
  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-[#d4af37]/20 bg-black/60 p-10 text-center text-[#c9b66f]">
        No applications match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#d4af37]/20 bg-black/60 shadow-2xl shadow-black/50">
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full divide-y divide-[#d4af37]/15">
          <thead className="bg-[#d4af37]/10">
            <tr>
              {['Full Name', 'Email', 'Type', 'Year', 'Interested Domain', 'LinkedIn', 'Status', 'Submitted At', 'Actions'].map((heading) => (
                <th key={heading} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#f7e082]">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d4af37]/10">
            {applications.map((application, index) => (
              <motion.tr
                key={application.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="hover:bg-[#d4af37]/5"
              >
                <td className="px-5 py-4 text-sm font-semibold text-[#fff7c4]">{application.fullName || 'Not provided'}</td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{application.email || 'Not provided'}</td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">
                  {application.applicationType === 'event' ? application.eventTitle || 'Event' : 'Club'}
                </td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{formatLabel(application.year)}</td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{formatLabel(application.interestedDomain)}</td>
                <td className="px-5 py-4 text-sm">
                  {application.linkedinId ? (
                    <a
                      href={application.linkedinId.startsWith('http') ? application.linkedinId : `https://${application.linkedinId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#fff1a8] hover:text-white"
                    >
                      View
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-[#8a7a47]">Not provided</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}>
                    {formatLabel(application.status)}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{formatDateTime(application.submittedAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    {statusActions.map((status) => {
                      const Icon = actionIcons[status];
                      const isUpdating = updatingId === application.id;

                      return (
                        <button
                          key={status}
                          type="button"
                          disabled={isUpdating}
                          onClick={() => onStatusChange(application.id, status)}
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-black/50 disabled:cursor-not-allowed disabled:opacity-50 ${actionStyles[status]}`}
                          title={actionLabels[status]}
                        >
                          <Icon size={16} />
                        </button>
                      );
                    })}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-3 lg:hidden">
        {applications.map((application, index) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="rounded-lg border border-[#d4af37]/15 bg-black/70 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[#fff7c4]">{application.fullName || 'Not provided'}</h3>
                <p className="mt-1 text-sm text-[#d9c77c]">{application.email || 'Not provided'}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}>
                {formatLabel(application.status)}
              </span>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-[#d9c77c]">
              <p>Year: {formatLabel(application.year)}</p>
              <p>Type: {application.applicationType === 'event' ? application.eventTitle || 'Event' : 'Club'}</p>
              <p>Domain: {formatLabel(application.interestedDomain)}</p>
              <p>Submitted: {formatDateTime(application.submittedAt)}</p>
              {application.linkedinId && (
                <a
                  href={application.linkedinId.startsWith('http') ? application.linkedinId : `https://${application.linkedinId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#fff1a8]"
                >
                  LinkedIn
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {statusActions.map((status) => {
                const Icon = actionIcons[status];
                const isUpdating = updatingId === application.id;

                return (
                  <button
                    key={status}
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onStatusChange(application.id, status)}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg border bg-black/50 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${actionStyles[status]}`}
                  >
                    <Icon size={15} />
                    {actionLabels[status]}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
