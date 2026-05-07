import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export const StatCard = ({ label, value, icon: Icon }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-[#d4af37]/20 bg-black/60 p-5 shadow-2xl shadow-black/40"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#c9b66f]">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#fff1a8]">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f7e082]">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
};
