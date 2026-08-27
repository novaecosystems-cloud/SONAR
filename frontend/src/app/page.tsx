"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { SonarVisualizer } from "@/components/SonarVisualizer";
import { SocialRadar } from "@/components/SocialRadar";
import { LiveTranscript } from "@/components/LiveTranscript";
import { ScenarioPlayer } from "@/components/ScenarioPlayer";
import { MediaIngestionBar } from "@/components/MediaIngestionBar";
import { ActionCockpit } from "@/components/ActionCockpit";
import { BriefingModal, ExecutiveBriefing } from "@/components/BriefingModal";
import { useSonarVoice } from "@/hooks/useSonarVoice";
import { Mic, PhoneOff, Waves } from "lucide-react";

export default function Home() {
  const {
    isLive,
    isAgentSpeaking,
    sessionId,
    activePlatforms,
    fullTranscript,
    collectedSources,
    sessionDuration,
    radarStatus,
    audioFrequencyData,
    startVoiceSession,
    stopVoiceSession,
    sendDirectQuery,
    setFullTranscript,
    setCollectedSources
  } = useSonarVoice();

  const [briefing, setBriefing] = useState<ExecutiveBriefing | null>(null);
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [generatingBriefing, setGeneratingBriefing] = useState(false);

  const handleStartLive = async () => {
    await startVoiceSession();
  };

  const handleEndSession = async () => {
    stopVoiceSession();

    if (!fullTranscript && collectedSources.length === 0) return;

    setGeneratingBriefing(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId || `sonar-${Date.now()}`,
          full_transcript: fullTranscript || "User inquired about social consensus.",
          session_duration_seconds: sessionDuration || 45.0,
          collected_sources: collectedSources
        })
      });

      if (res.ok) {
        const briefingData = await res.json();
        setBriefing(briefingData);
        setShowBriefingModal(true);
      }
    } catch (err) {
      console.error("Error generating LeMUR briefing:", err);
    } finally {
      setGeneratingBriefing(false);
    }
  };

  const handleSelectScenario = async (prompt: string, title: string) => {
    if (!isLive) {
      await startVoiceSession(`sc-${Date.now()}`);
    }
    setTimeout(() => {
      sendDirectQuery(prompt);
    }, 400);
  };

  const handleMediaAnalyzed = (summary: string, url: string, title: string) => {
    setFullTranscript((prev) => `${prev}\nUser: Analyze media URL ${url}\nSonar AI: ${summary}`);
    setCollectedSources((prev) => [
      {
        platform: "YouTube",
        title: title,
        url: url,
        snippet: summary.slice(0, 200),
        author: "Media Creator"
      },
      ...prev
    ]);
  };

  const handleActionExecuted = (summary: string) => {
    setFullTranscript((prev) => `${prev}\nSonar Super-Agent: ${summary}`);
  };

  return (
    <main className="min-h-screen bg-[#060a12] text-gray-100 flex flex-col justify-between">
      
      {/* Top Header */}
      <Header
        isLive={isLive}
        sessionDuration={sessionDuration}
        radarStatus={radarStatus}
        isAgentSpeaking={isAgentSpeaking}
      />

      {/* Main Sonar Cockpit Dashboard */}
      <div className="max-w-7xl mx-auto w-full px-6 py-5 flex-1 flex flex-col gap-5">
        
        {/* Quick Voice Intercept Action Bar */}
        <div className="sonar-panel rounded-2xl p-4 border border-cyan-500/20 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-xl border ${isLive ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300 animate-pulse" : "bg-white/5 border-white/10 text-gray-400"}`}>
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide font-mono">
                {isLive ? "SONAR SUPER-AGENT ACTIVE — READY FOR RESEARCH, CODING & ACTIONS" : "SONAR SUPER-AGENT STANDBY"}
              </h2>
              <p className="text-xs text-gray-400">
                {isLive
                  ? "Speak your question or choose an action. Sonar AI will query social web, delegate coding, book calls, or order cabs."
                  : "Click 'Start Live Voice Session' to research and execute hands-free with your voice."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isLive ? (
              <button
                onClick={handleStartLive}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/30 font-mono"
              >
                <Mic className="w-4 h-4" />
                <span>Start Live Voice Session</span>
              </button>
            ) : (
              <button
                onClick={handleEndSession}
                disabled={generatingBriefing}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg shadow-red-500/30 font-mono"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{generatingBriefing ? "Generating LeMUR Briefing..." : "End Session & Generate LeMUR Briefing"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Super-Agent Action Hub (Code, Call, Ride, Flight) */}
        <ActionCockpit onActionExecuted={handleActionExecuted} />

        {/* Media Ingestion Deep-Dive Bar */}
        <MediaIngestionBar onMediaAnalyzed={handleMediaAnalyzed} />

        {/* Primary Monitoring HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Left: Sonar Radar & FFT Audio Spectrum */}
          <SonarVisualizer
            frequencyData={audioFrequencyData}
            isLive={isLive}
            isAgentSpeaking={isAgentSpeaking}
            radarStatus={radarStatus}
          />

          {/* Right: Live Social & Web Radar */}
          <SocialRadar
            activePlatforms={activePlatforms}
            collectedSources={collectedSources}
          />

        </div>

        {/* Live Conversation Stream */}
        <div className="flex-1">
          <LiveTranscript
            transcript={fullTranscript}
            isLive={isLive}
            onClear={() => setFullTranscript("")}
          />
        </div>

        {/* 1-Click Demo Scenarios Suite */}
        <ScenarioPlayer
          onSelectScenario={handleSelectScenario}
          isLive={isLive}
        />

      </div>

      {/* AssemblyAI LeMUR Executive Briefing Modal */}
      <BriefingModal
        briefing={briefing}
        isOpen={showBriefingModal}
        onClose={() => setShowBriefingModal(false)}
      />

    </main>
  );
}
