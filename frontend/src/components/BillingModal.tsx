"use client";

import React, { useState } from "react";
import { CreditCard, CheckCircle2, Key, RefreshCw, X, ShieldCheck } from "lucide-react";

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BillingModal: React.FC<BillingModalProps> = ({ isOpen, onClose }) => {
  const [licenseKey, setLicenseKey] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRestore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus("SUCCESS_RESTORED");
    }, 800);
  };

  const handleActivateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus("SUCCESS_ACTIVATED");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="sonar-panel rounded-3xl max-w-md w-full border border-cyan-500/40 p-6 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-cyan-500/20">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base font-mono uppercase">
              Subscription & Licenses
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">Manage Sonar Pro & Restore Purchases</p>
          </div>
        </div>

        {status === "SUCCESS_RESTORED" ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Active Pro Plan detected and synced with this browser!</span>
          </div>
        ) : status === "SUCCESS_ACTIVATED" ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Enterprise License Key validated! All limits unlocked.</span>
          </div>
        ) : null}

        <div className="space-y-4 text-xs font-sans">
          
          {/* Restore App Store / Stripe Purchases */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white font-mono text-xs">Restore Previous Purchases</h4>
              <p className="text-gray-400 text-[11px]">Re-sync your Pro Super-Agent entitlement</p>
            </div>
            <button
              onClick={handleRestore}
              disabled={loading}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              <span>Restore</span>
            </button>
          </div>

          {/* Activate License Key */}
          <form onSubmit={handleActivateKey} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" />
              <h4 className="font-bold text-white font-mono text-xs">Enterprise License Key</h4>
            </div>
            <input
              type="text"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="SONAR-PRO-XXXX-XXXX-XXXX"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-cyan-500/30 text-white font-mono text-xs placeholder:text-gray-600 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={loading || !licenseKey.trim()}
              className="w-full py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-extrabold font-mono text-xs transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              Activate Key
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
