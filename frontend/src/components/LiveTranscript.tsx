"use client";

import React, { useEffect, useRef } from "react";
import { MessageSquare, Trash2, Bot, User, Waves, Sparkles, ArrowRight } from "lucide-react";

interface LiveTranscriptProps {
  transcript: string;
  isLive: boolean;
  onClear?: () => void;
  onSelectPrompt?: (prompt: string) => void;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  transcript,
  isLive,
  onClear,
  onSelectPrompt
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  // Parse turns from transcript text
  const parseTurns = (rawText: string) => {
    if (!rawText.trim()) return [];
    const lines = rawText.split("\n").filter((l) => l.trim().length > 0);
    return lines.map((line, idx) => {
      if (line.startsWith("User:")) {
        return {
          id: idx,
          speaker: "user",
          text: line.replace("User:", "").trim()
        };
      } else if (line.startsWith("Sonar AI:") || line.startsWith("Sonar Super-Agent:")) {
        return {
          id: idx,
          speaker: "sonar",
          text: line.replace("Sonar AI:", "").replace("Sonar Super-Agent:", "").trim()
        };
      }
      return {
        id: idx,
        speaker: "sonar",
        text: line.trim()
      };
    });
  };

  const starterPrompts = [
    { label: "🔥 Social Consensus", text: "What are engineers on Reddit and Twitter saying about DeepSeek-R1 vs Claude 3.5 Sonnet?" },
    { label: "✈️ Flight Search", text: "Check lowest airfares for Mumbai to Dubai this weekend on IndiGo and Emirates." },
    { label: "🚕 Uber Ride", text: "Book an Uber Premier from Bandra Kurla Complex to Mumbai Airport T2." },
    { label: "💻 Code Agent", text: "Scaffold an autonomous GitHub workflow with Next.js CI tests using Claude Code." }
  ];

  const turns = parseTurns(transcript);

  return (
    <div className="sonar-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col h-full shadow-xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-white">
              LIVE CONVERSATION STREAM
            </h2>
            <p className="text-[11px] text-gray-400">Universal-3 Pro Streaming STT & Conversational Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onClear && transcript && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Clear transcript"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${isLive ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" : "bg-gray-800 text-gray-400 border-gray-700"}`}>
            {isLive ? "LISTENING" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* Transcript Turn Area */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-[180px] max-h-[260px] overflow-y-auto bg-black/50 rounded-xl p-4 border border-cyan-500/10 space-y-3"
      >
        {turns.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-4 text-center">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-xs font-bold font-mono text-white mb-1">
              Ready for Live Voice Intercept
            </h3>
            <p className="text-[11px] text-gray-400 max-w-sm mb-4 font-sans">
              Speak into your microphone or tap any starter prompt below to kick off real-time search & synthesis:
            </p>

            {/* Interactive Starter Chips (Good UX Empty State) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {starterPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt && onSelectPrompt(p.text)}
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-500/30 text-left transition-all group flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-cyan-400 mb-0.5">{p.label}</div>
                    <div className="text-[11px] text-gray-300 truncate max-w-[200px]">{p.text}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-300 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          turns.map((turn) => (
            <div
              key={turn.id}
              className={`flex items-start gap-2.5 ${turn.speaker === "user" ? "justify-end" : "justify-start"}`}
            >
              {turn.speaker === "sonar" && (
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5 flex-shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                  turn.speaker === "user"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-900/30 rounded-tr-none font-medium"
                    : "bg-slate-900/90 border border-cyan-500/20 text-gray-200 rounded-tl-none font-sans"
                }`}
              >
                {turn.text}
              </div>

              {turn.speaker === "user" && (
                <div className="p-1.5 rounded-lg bg-white/10 text-gray-300 mt-0.5 flex-shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
