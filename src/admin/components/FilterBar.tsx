import { SlidersHorizontal } from 'lucide-react';
import { ApplicationFilters } from '../types';
import { formatLabel } from '../utils';

interface FilterBarProps {
  filters: ApplicationFilters;
  domains: string[];
  years: string[];
  onChange: (filters: ApplicationFilters) => void;
}

const statusOptions = ['pending', 'accepted', 'rejected'];

export const FilterBar = ({ filters, domains, years, onChange }: FilterBarProps) => {
  const setFilter = (key: keyof ApplicationFilters, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="grid gap-3 rounded-lg border border-[#d4af37]/15 bg-black/50 p-3 sm:grid-cols-3 lg:grid-cols-[auto_1fr_1fr_1fr]">
      <div className="hidden items-center gap-2 px-2 text-sm text-[#f7e082] lg:flex">
        <SlidersHorizontal size={18} />
        Filters
      </div>

      <select
        value={filters.domain}
        onChange={(event) => setFilter('domain', event.target.value)}
        className="h-11 rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 text-sm text-[#fff7c4] outline-none focus:border-[#d4af37]/60"
      >
        <option value="">All domains</option>
        {domains.map((domain) => (
          <option key={domain} value={domain}>
            {formatLabel(domain)}
          </option>
        ))}
      </select>

      <select
        value={filters.year}
        onChange={(event) => setFilter('year', event.target.value)}
        className="h-11 rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 text-sm text-[#fff7c4] outline-none focus:border-[#d4af37]/60"
      >
        <option value="">All years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {formatLabel(year)}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(event) => setFilter('status', event.target.value)}
        className="h-11 rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 text-sm text-[#fff7c4] outline-none focus:border-[#d4af37]/60"
      >
        <option value="">All statuses</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status === 'pending' ? 'Pending applications' : formatLabel(status)}
          </option>
        ))}
      </select>
    </div>
  );
};
