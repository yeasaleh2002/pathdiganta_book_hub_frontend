import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
  confirmText = "Proceed",
  cancelText = "Cancel"
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-[#121212] border-2 border-red-500/20 dark:border-red-900/30 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={32} className="text-red-600 dark:text-red-500" />
          </div>
          
          <h3 className="mb-2 text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="mb-8 text-sm font-bold text-gray-500 dark:text-gray-400">
            {message}
          </p>

          <div className="flex justify-center gap-4 w-full">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-black uppercase tracking-widest text-xs rounded-xl transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              {confirmText}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
