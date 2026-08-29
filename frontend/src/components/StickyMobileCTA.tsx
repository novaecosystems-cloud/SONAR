"use client";

import React from "react";
import { Mic, Download, Sparkles } from "lucide-react";

interface StickyMobileCTAProps {
  onStartVoice: () => void;
  onInstallApp: () => void;
  isLive: boolean;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onStartVoice, onInstallApp, isLive }) => {
  return (
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden bg-[#0a1120]/90 border border-cyan-500/30 rounded-2xl p-2.5 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2 pl-2">
        <span className={`w-2 h-2 rounded-full ${isLive ? "bg-cyan-400 animate-ping" : "bg-gray-400"}`} />
        <span className="text-[11px] font-mono font-bold text-white tracking-wide">
          {isLive ? "LISTENING..." : "SONAR PWA"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onInstallApp}
          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-mono border border-white/10 flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>

        <button
          onClick={onStartVoice}
          className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-[11px] font-bold font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>{isLive ? "Active Voice" : "Talk Now"}</span>
        </button>
      </div>
    </div>
  );
};
