"use client";

import React, { useState } from "react";
import { Trash2, AlertTriangle, CheckCircle2, X } from "lucide-react";

interface DataDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataDeletionModal: React.FC<DataDeletionModalProps> = ({ isOpen, onClose }) => {
  const [deleted, setDeleted] = useState(false);

  if (!isOpen) return null;

  const handleDeleteAll = () => {
    localStorage.clear();
    sessionStorage.clear();
    setDeleted(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="sonar-panel rounded-3xl max-w-md w-full border border-red-500/40 p-6 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-500/20">
          <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base font-mono uppercase">
              Delete Data & Reset Memory
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">GDPR & Privacy Compliance</p>
          </div>
        </div>

        {deleted ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>All local session transcripts, audio memory, and tokens deleted. Reloading...</span>
          </div>
        ) : (
          <div className="space-y-4 text-xs font-sans text-gray-300 mb-6">
            <p>
              This will permanently delete all cached voice recordings, transcripts, LeMUR briefings, and action histories from your browser.
            </p>
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 flex items-start gap-2.5 text-red-300 text-[11px]">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>This action cannot be undone.</span>
            </div>
          </div>
        )}

        {!deleted && (
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold font-mono text-xs transition-colors shadow-lg shadow-red-500/30"
            >
              Confirm Delete
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
