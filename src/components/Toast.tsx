import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            id={`toast-item-${toast.id}`}
            className={`pointer-events-auto p-4 rounded-xl border shadow-2xl flex items-start justify-between gap-3 text-xs font-mono backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
                : 'bg-black/90 border-white/10 text-gray-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-snug">{toast.text}</span>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-white shrink-0 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
