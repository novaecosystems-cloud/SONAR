"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: "Hobby / Free",
      price: "$0",
      period: "forever",
      desc: "For curious individuals researching topics hands-free during walks or commutes.",
      features: [
        "Universal-3 Pro Streaming STT",
        "Multi-Platform Reach (Twitter, Reddit, YouTube)",
        "Zero-Install Browser PWA",
        "5 LeMUR Briefings / month",
        "Community Support"
      ],
      isPopular: false,
      btnText: "Launch Free in Browser",
      btnClass: "bg-white/5 hover:bg-white/10 text-white border border-white/10"
    },
    {
      name: "Pro Super-Agent",
      price: "$19",
      period: "per month",
      desc: "For founders, engineers, and creators who need automated actions, calling, and coding.",
      features: [
        "Everything in Free Tier",
        "Claude Code & Antigravity SWE Bridge",
        "Fonoster Outbound Phone Calling (Hindi/EN)",
        "On-Device MakeMyTrip & Uber Auto-Booking",
        "Unlimited AssemblyAI LeMUR Briefings",
        "1-Click Telegram & Slack Webhooks",
        "Background Lockscreen Audio Mode"
      ],
      isPopular: true,
      btnText: "Get Pro Super-Agent",
      btnClass: "bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)]"
    },
    {
      name: "Enterprise Fleet",
      price: "Custom",
      period: "per workspace",
      desc: "For high-velocity engineering organizations and corporate research teams.",
      features: [
        "Everything in Pro",
        "Dedicated Fonoster SIP Trunks",
        "Private Self-Hosted Deployment",
        "Corporate Knowledge Graph Sync",
        "Custom Phone Number Provisioning",
        "Dedicated SLA & 24/7 Support"
      ],
      isPopular: false,
      btnText: "Contact Enterprise",
      btnClass: "bg-white/5 hover:bg-white/10 text-white border border-white/10"
    }
  ];

  return (
    <section id="pricing" className="py-20 border-t border-cyan-500/10 bg-[#060a12] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT TIERED PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Simple plans for everyday ambient intelligence.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans">
            Start completely free right in your browser or install as a PWA on your mobile phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl bg-[#0a1120] border transition-all duration-300 flex flex-col justify-between relative shadow-2xl ${
                p.isPopular ? "border-cyan-400/60 ring-2 ring-cyan-500/20 bg-gradient-to-b from-[#0c182d] to-[#0a1120]" : "border-cyan-500/20"
              }`}
            >
              {p.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400 text-black text-[10px] font-extrabold font-mono uppercase tracking-wider shadow-md">
                  Most Popular Super-Agent
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-white font-mono mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-4xl font-extrabold text-white font-mono">{p.price}</span>
                  <span className="text-xs text-gray-400 font-mono">/ {p.period}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 font-sans">{p.desc}</p>

                <div className="space-y-3 pt-4 border-t border-white/5 mb-8">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(p.name)}
                className={`w-full py-3 rounded-xl text-xs font-mono transition-all ${p.btnClass}`}
              >
                {p.btnText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
