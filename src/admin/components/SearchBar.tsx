import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <label className="relative block w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search applications"
        className="h-12 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 pl-11 pr-4 text-sm text-[#fff7c4] outline-none placeholder:text-[#8a7a47] focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/20"
      />
    </label>
  );
};
