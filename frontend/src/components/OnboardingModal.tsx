"use client";

import React, { useState } from "react";
import { Sparkles, Mic, Code2, PhoneCall, CheckCircle, ArrowRight, X } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCockpit: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onStartCockpit }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Ambient Voice Research",
      desc: "Speak naturally into your microphone or headset. Sonar AI queries Twitter, Reddit, and YouTube simultaneously to synthesize real community consensus in milliseconds.",
      icon: <Mic className="w-6 h-6 text-cyan-400" />
    },
    {
      title: "2. Autonomous Action Delegation",
      desc: "Delegate coding tasks directly to Claude Code / Antigravity, dial medical clinics via Fonoster SIP telephony, or book Uber rides hands-free.",
      icon: <Code2 className="w-6 h-6 text-cyan-400" />
    },
    {
      title: "3. 1-Click PWA Installation",
      desc: "Install Sonar AI directly on your iPhone, Android, or Mac as a native desktop/mobile app with lockscreen voice access and offline mode.",
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="sonar-panel rounded-3xl max-w-lg w-full border border-cyan-500/40 p-6 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            GETTING STARTED ({step} / 3)
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
          <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/20 w-fit mb-4">
            {steps[step - 1].icon}
          </div>
          <h3 className="text-base font-extrabold text-white font-mono mb-2">
            {steps[step - 1].title}
          </h3>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            {steps[step - 1].desc}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${step === i ? "w-6 bg-cyan-400" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onStartCockpit();
                }}
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span>Launch Cockpit</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
