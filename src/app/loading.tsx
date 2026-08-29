import React from "react";
import { Waves, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#060a12] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 animate-ping absolute" />
        <div className="w-16 h-16 rounded-full border border-cyan-400/50 flex items-center justify-center bg-cyan-950/40 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
          <Waves className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
      </div>
      <h2 className="text-xl font-bold font-mono text-white tracking-wider mb-2">
        INITIALIZING SONAR SUPER-AGENT
      </h2>
      <p className="text-xs text-gray-400 font-mono">
        Connecting to AssemblyAI Universal-3 Pro & Fonoster Telephony Gateway...
      </p>
    </div>
  );
}
