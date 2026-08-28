"use client";

import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060a12] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
        <Sparkles className="w-8 h-8 animate-pulse" />
      </div>
      <h1 className="text-4xl font-extrabold font-mono mb-2">404 - Page Not Found</h1>
      <p className="text-gray-400 text-sm max-w-md mb-6 font-sans">
        The requested page does not exist. Return to the Sonar AI Super-Agent cockpit.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cockpit</span>
      </Link>
    </div>
  );
}
