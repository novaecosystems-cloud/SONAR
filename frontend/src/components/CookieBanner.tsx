"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sonar_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("sonar_cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-16 md:bottom-4 right-4 max-w-sm w-full z-40 bg-[#0a1120]/95 border border-cyan-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl font-sans text-xs text-gray-300">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-white mb-1 font-mono text-[11px]">PRIVACY & LOCAL STORAGE</h4>
          <p className="text-gray-400 text-[11px] leading-relaxed mb-3">
            Sonar AI stores your audio telemetry and preferences locally in your browser for hands-free PWA operation. No advertising tracking cookies used.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-[10px] transition-colors"
            >
              Accept & Continue
            </button>
            <button
              onClick={() => setShow(false)}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 font-mono text-[10px]"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
