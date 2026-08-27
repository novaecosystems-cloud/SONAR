"use client";

import React, { useState } from "react";
import { Youtube, Headphones, Sparkles, ArrowRight, Loader2, Play } from "lucide-react";

interface MediaIngestionBarProps {
  onMediaAnalyzed: (summary: string, url: string, title: string) => void;
}

export const MediaIngestionBar: React.FC<MediaIngestionBarProps> = ({ onMediaAnalyzed }) => {
  const [urlInput, setUrlInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setAnalyzing(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/media/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_url: urlInput.trim(),
          question: questionInput.trim() || "Summarize the core takeaways and debates"
        })
      });

      if (res.ok) {
        const data = await res.json();
        onMediaAnalyzed(data.spoken_summary, data.media_url, data.media_title);
        setUrlInput("");
        setQuestionInput("");
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Error analyzing media URL:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const sampleUrls = [
    { label: "AI Hardware Podcast", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", prompt: "What are the GPU cluster bottlenecks?" },
    { label: "React 19 Deep Dive", url: "https://www.youtube.com/watch?v=sampleReact19", prompt: "Summarize the compiler benchmarks." }
  ];

  return (
    <div className="sonar-panel rounded-2xl p-4 border border-cyan-500/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold font-mono uppercase text-white tracking-wide">
                YOUTUBE & PODCAST DEEP-DIVE INGESTION
              </h3>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.2 rounded">
                NEW
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Paste any YouTube video or Podcast audio URL to cross-examine and summarize hands-free.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 transition-colors"
        >
          {isOpen ? "Close Input" : "+ Ingest Audio / Video URL"}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleAnalyze} className="mt-4 pt-3.5 border-t border-cyan-500/20 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-gray-300 mb-1">
                YouTube or Podcast Audio URL
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or .mp3 link"
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-gray-300 mb-1">
                Specific Research Question (Optional)
              </label>
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="e.g. What did the guests say about thermal throttling?"
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          {/* Preset Samples */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-mono text-gray-500">Quick Test:</span>
            {sampleUrls.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrlInput(s.url);
                  setQuestionInput(s.prompt);
                }}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-gray-400 hover:text-cyan-300 transition-colors border border-white/5"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="submit"
              disabled={analyzing || !urlInput.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 font-mono"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Audio...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Analyze & Summarize Spoken Audio</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
