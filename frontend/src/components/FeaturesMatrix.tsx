"use client";

import React from "react";
import { Globe, Terminal, PhoneCall, Smartphone, Sparkles, Zap, Shield, Cpu } from "lucide-react";

export const FeaturesMatrix: React.FC = () => {
  const features = [
    {
      icon: Globe,
      color: "text-blue-400",
      border: "hover:border-blue-500/40",
      title: "1. Ambient Multi-Platform Reach",
      desc: "Cross-examines live Twitter/X, Reddit forums, YouTube transcripts, and the Web simultaneously without expensive enterprise API fees."
    },
    {
      icon: PhoneCall,
      color: "text-emerald-400",
      border: "hover:border-emerald-500/40",
      title: "2. Open-Source Fonoster Telephony",
      desc: "Outbound Google Duplex style phone dialing powered by Fonoster open-source SIP trunks. Negotiates appointment times in Hindi, English, or Spanish."
    },
    {
      icon: Terminal,
      color: "text-cyan-400",
      border: "hover:border-cyan-500/40",
      title: "3. Claude Code & Antigravity Delegation",
      desc: "Spoken engineering commands dispatch tasks directly to local SWE CLI daemons, executes unit test suites, and opens GitHub pull requests."
    },
    {
      icon: Smartphone,
      color: "text-orange-400",
      border: "hover:border-orange-500/40",
      title: "4. On-Device App Automator & Installer",
      desc: "Checks if MakeMyTrip or Uber is installed on your smartphone. If missing, triggers the Play Store auto-install intent and auto-fills your route."
    },
    {
      icon: Cpu,
      color: "text-purple-400",
      border: "hover:border-purple-500/40",
      title: "5. AssemblyAI Universal-3 Pro STT",
      desc: "Sub-200ms streaming speech tokenization with neural Voice Activity Detection and natural conversational barge-in interruption support."
    },
    {
      icon: Shield,
      color: "text-teal-400",
      border: "hover:border-teal-500/40",
      title: "6. AssemblyAI LeMUR Executive Briefings",
      desc: "Automatically condenses entire spoken voice research sessions into 1-page structured Markdown & JSON reports with verified clickable citations."
    }
  ];

  return (
    <section id="features" className="py-20 border-t border-cyan-500/10 bg-[#060a12] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>FOUNDATIONAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Built for hands-free intelligence & real-world execution.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans">
            Every feature connects directly to live APIs, open-source telephony, and on-device app intents with zero fake data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-[#0a1120] border border-cyan-500/20 ${f.border} transition-all duration-300 flex flex-col justify-between group shadow-xl`}
              >
                <div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-mono">{f.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">{f.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                  <span>Live & Operational</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
