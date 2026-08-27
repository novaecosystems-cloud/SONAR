"use client";

import React from "react";
import { Download, Play, Sparkles, Waves, Radio, Smartphone, Laptop, CheckCircle2, ArrowRight, ShieldCheck, Terminal, PhoneCall, Car, Globe } from "lucide-react";

interface LandingHeroProps {
  onLaunchApp: () => void;
  onInstallPWA: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onLaunchApp, onInstallPWA }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>✨ NEXT-GEN VOICE SUPER-AGENT PWA</span>
          </div>
        </div>

        {/* Main H1 Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            You didn&apos;t build your day to waste 2 hours{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              doomscrolling & booking mundane tasks.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Sonar AI is your ambient hands-free voice super-agent. Installs in seconds as a Progressive Web App, 
            queries live Twitter/Reddit/YouTube in real time, delegates coding to Claude Code, dials clinics in Hindi/English via Fonoster, 
            and books rides & flights directly on your phone.
          </p>
        </div>

        {/* CTA Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onInstallPWA}
            className="px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-105 font-mono"
          >
            <Download className="w-4 h-4" />
            <span>Install Desktop & Mobile App (PWA)</span>
          </button>

          <button
            onClick={onLaunchApp}
            className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm flex items-center gap-2.5 transition-all hover:border-cyan-500/40 font-mono"
          >
            <Play className="w-4 h-4 fill-current text-cyan-400" />
            <span>Launch Live in Browser</span>
          </button>
        </div>

        {/* Interactive CSS Device Mockups (Desktop Laptop + Mobile Phone Frame) */}
        <div className="relative max-w-5xl mx-auto pt-6">
          
          {/* 1. Desktop Laptop Mockup Frame */}
          <div className="relative mx-auto bg-[#0a1120] border-2 border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-2 backdrop-blur-xl">
            
            {/* Laptop Window Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-black/60 rounded-t-xl mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[11px] font-mono text-gray-400 ml-2">sonar-ai-cockpit.local:3000</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono text-cyan-300">ASSEMBLYAI + FONOSTER LIVE</span>
              </div>
            </div>

            {/* Laptop Inner Screen Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-[#060a12] rounded-xl text-xs font-mono">
              
              {/* Left HUD: Radar Sweep */}
              <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/20 flex flex-col justify-between h-56 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-cyan-300 font-bold">SONAR RADAR HUD</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>

                {/* Radar Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 rounded-full border border-cyan-500/20 flex items-center justify-center animate-radar-sweep">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 absolute top-1/2 left-1/2 origin-left shadow-[0_0_8px_#06b6d4]" />
                  </div>
                  <div className="w-20 h-20 rounded-full border border-cyan-500/30 absolute" />
                </div>

                <div className="relative z-10 flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-white/5">
                  <span>LATENCY: 180ms</span>
                  <span>UNIVERSAL-3 PRO</span>
                </div>
              </div>

              {/* Center HUD: Live Multi-Platform Reach */}
              <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/20 flex flex-col justify-between h-56">
                <div className="text-[11px] text-white font-bold mb-2">LIVE MULTI-PLATFORM REACH</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-blue-950/40 border border-blue-500/30 text-[10px] text-blue-300">
                    🐦 Twitter / X
                    <span className="block text-white font-bold mt-0.5">Viral Sentiment</span>
                  </div>
                  <div className="p-2 rounded bg-orange-950/40 border border-orange-500/30 text-[10px] text-orange-300">
                    👽 Reddit
                    <span className="block text-white font-bold mt-0.5">r/reactjs & r/tech</span>
                  </div>
                  <div className="p-2 rounded bg-red-950/40 border border-red-500/30 text-[10px] text-red-300">
                    📺 YouTube
                    <span className="block text-white font-bold mt-0.5">Transcripts Extracted</span>
                  </div>
                  <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-300">
                    🌐 Web / News
                    <span className="block text-white font-bold mt-0.5">Official Specs</span>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Zero-API-Fee Ingestion Active</span>
                </div>
              </div>

              {/* Right HUD: Super-Agent Action Execution */}
              <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/20 flex flex-col justify-between h-56">
                <div className="text-[11px] text-white font-bold mb-1">SUPER-AGENT ACTION DISPATCH</div>
                <div className="space-y-1.5 text-[10px] text-gray-300">
                  <div className="p-1.5 rounded bg-white/5 border border-white/5">
                    <span className="text-cyan-300">💻 Claude Code:</span> Fixed auth session leak & unit tests
                  </div>
                  <div className="p-1.5 rounded bg-white/5 border border-white/5">
                    <span className="text-orange-300">📞 Fonoster Call:</span> Dr. Sharma Clinic (Hindi) Confirmed
                  </div>
                  <div className="p-1.5 rounded bg-white/5 border border-white/5">
                    <span className="text-emerald-300">🚕 Uber / Rapido:</span> ₹340 Comfort to Airport
                  </div>
                </div>
                <div className="text-[10px] text-cyan-300 bg-cyan-950/40 p-1 rounded text-center">
                  1-Click LeMUR Briefing Export Ready
                </div>
              </div>

            </div>

          </div>

          {/* 2. Overlapping Mobile Phone Mockup Frame */}
          <div className="absolute -bottom-8 -right-4 sm:-right-8 w-64 sm:w-72 bg-[#0a1120] border-2 border-cyan-400/50 rounded-[32px] p-2.5 shadow-2xl backdrop-blur-2xl z-20 hidden md:block">
            
            {/* Phone Notch */}
            <div className="w-24 h-3.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/40" />
            </div>

            {/* Phone Screen */}
            <div className="bg-[#060a12] rounded-[24px] p-3 text-xs font-mono space-y-2 border border-cyan-500/20">
              
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[10px]">
                <span className="text-cyan-300 font-bold">SONAR MOBILE PWA</span>
                <span className="text-emerald-400">INSTALLED</span>
              </div>

              <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-[11px] text-white">
                <span className="text-[9px] text-gray-400 block mb-0.5">LOCKSCREEN VOICE STREAM</span>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="font-bold">Listening in Earbuds...</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-[10px] space-y-1">
                <div className="text-gray-300 font-bold">📱 On-Device Automation:</div>
                <div className="text-emerald-400">✓ MakeMyTrip: DEL ➔ BLR</div>
                <div className="text-cyan-300">✓ Uber Comfort Ready</div>
              </div>

              <div className="w-full py-1.5 rounded-lg bg-cyan-400 text-black text-[10px] font-bold text-center">
                Open in MakeMyTrip App ➔
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
