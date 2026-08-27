"use client";

import React, { useState } from "react";
import { Radio, Activity, Key, Wifi, Sparkles, Waves } from "lucide-react";
import { formatDuration } from "@/lib/utils";

interface HeaderProps {
  isLive: boolean;
  sessionDuration: number;
  radarStatus: string;
  isAgentSpeaking: boolean;
  onApiKeySaved?: (key: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLive,
  sessionDuration,
  radarStatus,
  isAgentSpeaking,
  onApiKeySaved
}) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [savingKey, setSavingKey] = useState(false);
  const [keySavedMessage, setKeySavedMessage] = useState("");

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;
    setSavingKey(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/settings/api-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKeyInput.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setKeySavedMessage("AssemblyAI Key Connected Successfully!");
        if (onApiKeySaved) onApiKeySaved(apiKeyInput.trim());
        setTimeout(() => {
          setShowKeyModal(false);
          setKeySavedMessage("");
        }, 1200);
      }
    } catch (err) {
      setKeySavedMessage("Failed to save key. Ensure backend is running.");
    } finally {
      setSavingKey(false);
    }
  };

  return (
    <>
      <header className="border-b border-cyan-500/20 bg-[#0a101d]/85 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Waves className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#0a101d] animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5 font-mono">
                  SONAR <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">AI VOICE v1.0</span>
                </h1>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Conversational Voice Agent for Live Internet & Social Intelligence
              </p>
            </div>
          </div>

          {/* Center Voice Live Status */}
          <div className="flex items-center gap-4">
            {isLive ? (
              <div className="flex items-center gap-3 bg-cyan-950/40 border border-cyan-500/30 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-medium text-cyan-200">
                  VOICE SESSION: <span className="text-white font-bold">{formatDuration(sessionDuration)}</span>
                </span>
                {isAgentSpeaking && (
                  <span className="text-[10px] font-mono font-bold bg-cyan-500 text-black px-1.5 py-0.5 rounded-full animate-bounce">
                    SPEAKING
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/5 rounded-full px-3.5 py-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-mono">SONAR RADAR READY</span>
              </div>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors font-mono"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>AssemblyAI Key</span>
            </button>
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-md">
              <Wifi className="w-3 h-3" />
              <span className="font-mono">ONLINE</span>
            </div>
          </div>

        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="sonar-panel p-6 rounded-2xl max-w-md w-full border border-cyan-500/40 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">AssemblyAI API Configuration</h3>
                <p className="text-xs text-gray-400">Enables Universal-3 Pro Voice Agent & LeMUR Briefings</p>
              </div>
            </div>

            <form onSubmit={handleSaveApiKey} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  AssemblyAI API Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="e.g. da482a19c203..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Connected to verified AssemblyAI key. Free trial credit enabled.
                </p>
              </div>

              {keySavedMessage && (
                <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  {keySavedMessage}
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={savingKey}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-black font-bold bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/30"
                >
                  {savingKey ? "Connecting..." : "Save Key"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
