import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  const isSuccess = type === 'success';
  const Icon = isSuccess ? CheckCircle2 : AlertTriangle;

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-start gap-3 rounded-lg border p-4 text-sm shadow-2xl shadow-black ${
        isSuccess
          ? 'border-emerald-400/30 bg-emerald-950/90 text-emerald-100'
          : 'border-red-400/30 bg-red-950/90 text-red-100'
      }`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <p className="flex-1">{message}</p>
      <button type="button" onClick={onClose} className="rounded p-1 hover:bg-white/10" title="Close">
        <X size={16} />
      </button>
    </div>
  );
};
