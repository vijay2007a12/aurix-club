import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, open, children, onClose }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#d4af37]/25 bg-[#080808] p-6 shadow-2xl shadow-black"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#fff1a8]">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-[#f7e082] hover:bg-[#d4af37]/10" title="Close">
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};
