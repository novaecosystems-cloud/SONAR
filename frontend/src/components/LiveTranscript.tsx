"use client";

import React, { useEffect, useRef } from "react";
import { MessageSquare, Trash2, Bot, User, Waves } from "lucide-react";

interface LiveTranscriptProps {
  transcript: string;
  isLive: boolean;
  onClear?: () => void;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  transcript,
  isLive,
  onClear
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
      } else if (line.startsWith("Sonar AI:")) {
        return {
          id: idx,
          speaker: "sonar",
          text: line.replace("Sonar AI:", "").trim()
        };
      }
      return {
        id: idx,
        speaker: "sonar",
        text: line.trim()
      };
    });
  };

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
        className="flex-1 min-h-[160px] max-h-[220px] overflow-y-auto bg-black/50 rounded-xl p-4 border border-cyan-500/10 space-y-3"
      >
        {turns.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 text-xs py-8 text-center">
            <Waves className="w-8 h-8 text-cyan-600/40 mb-2 animate-pulse" />
            <span>Ready for your voice questions.</span>
            <span className="text-[10px] text-gray-600 mt-1">
              Click &quot;Start Live Voice&quot; and speak, or select a demo scenario below.
            </span>
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
