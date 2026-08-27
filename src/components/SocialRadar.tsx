"use client";

import React from "react";
import { Globe, MessageCircle, PlaySquare, Twitter, ExternalLink, Sparkles, Layers } from "lucide-react";
import { SearchSourceItem } from "@/hooks/useSonarVoice";
import { getPlatformBadgeStyle } from "@/lib/utils";

interface SocialRadarProps {
  activePlatforms: string[];
  collectedSources: SearchSourceItem[];
}

export const SocialRadar: React.FC<SocialRadarProps> = ({
  activePlatforms,
  collectedSources
}) => {
  const platforms = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "text-blue-400",
      bgActive: "bg-blue-950/50 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.35)]",
      desc: "Viral takes & sentiment"
    },
    {
      name: "Reddit",
      icon: MessageCircle,
      color: "text-orange-400",
      bgActive: "bg-orange-950/50 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.35)]",
      desc: "Community discussions"
    },
    {
      name: "YouTube",
      icon: PlaySquare,
      color: "text-red-400",
      bgActive: "bg-red-950/50 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.35)]",
      desc: "Video benchmarks"
    },
    {
      name: "Web",
      icon: Globe,
      color: "text-cyan-400",
      bgActive: "bg-cyan-950/50 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.35)]",
      desc: "Official docs & news"
    }
  ];

  return (
    <div className="sonar-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between h-full shadow-xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-white">
              LIVE SOCIAL & WEB RADAR
            </h2>
            <p className="text-[11px] text-gray-400">Multi-Platform Reach (Twitter, Reddit, YouTube, Web)</p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
          {collectedSources.length} SOURCES CAPTURED
        </span>
      </div>

      {/* 4 Platform Pulse Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
        {platforms.map((p) => {
          const Icon = p.icon;
          const isActive = activePlatforms.some(
            (ap) => ap.toLowerCase() === p.name.toLowerCase()
          );

          return (
            <div
              key={p.name}
              className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? `${p.bgActive} ring-1 ring-white/20`
                  : "bg-white/5 border-white/5 opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className={`w-4 h-4 ${p.color}`} />
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-white block">{p.name}</span>
                <span className="text-[10px] text-gray-400">{p.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Retrieved Citations Stream */}
      <div className="mt-2 flex-1">
        <div className="text-[10px] font-mono text-gray-400 uppercase mb-1.5">
          Recent Citations & Extracted Insights:
        </div>
        {collectedSources.length === 0 ? (
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 text-gray-500 text-xs text-center flex flex-col items-center justify-center">
            <Sparkles className="w-5 h-5 text-gray-600 mb-1" />
            <span>Speak a question to pulse Twitter, Reddit, or YouTube in real-time.</span>
          </div>
        ) : (
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
            {collectedSources.slice(0, 6).map((src, i) => {
              const badge = getPlatformBadgeStyle(src.platform);
              return (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-start justify-between gap-2 text-xs hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                        {src.platform}
                      </span>
                      <span className="font-bold text-gray-200 truncate">{src.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{src.snippet}</p>
                  </div>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-gray-500 hover:text-cyan-300 transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
