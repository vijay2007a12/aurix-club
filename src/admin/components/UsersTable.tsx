import { UserProfile } from '../../types';

interface UsersTableProps {
  users: UserProfile[];
  searchTerm: string;
}

export const UsersTable = ({ users, searchTerm }: UsersTableProps) => {
  const query = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const text = [user.fullName, user.email, user.role, user.year, user.domain].join(' ').toLowerCase();

    return !query || text.includes(query);
  });

  return (
    <div className="overflow-hidden rounded-lg border border-[#d4af37]/20 bg-black/60">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#d4af37]/10">
          <thead className="bg-[#d4af37]/10">
            <tr>
              {['Name', 'Email', 'Role', 'Year', 'Domain'].map((heading) => (
                <th key={heading} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#f7e082]">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d4af37]/10">
            {filteredUsers.map((user) => (
              <tr key={user.uid} className="hover:bg-[#d4af37]/5">
                <td className="px-5 py-4 text-sm font-semibold text-[#fff7c4]">{user.fullName || 'Not provided'}</td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{user.email}</td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{user.role}</td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{user.year || 'Not provided'}</td>
                <td className="px-5 py-4 text-sm text-[#d9c77c]">{user.domain || 'Not provided'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
