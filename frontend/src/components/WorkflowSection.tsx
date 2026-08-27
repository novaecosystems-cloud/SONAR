"use client";

import React from "react";
import { CheckCircle2, ArrowRight, Terminal, Activity, Layers, Sparkles } from "lucide-react";

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-20 border-t border-cyan-500/10 bg-[#080d18] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Workflow Description */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
              <Activity className="w-3.5 h-3.5" />
              <span>CONTINUOUS EXECUTION ENGINE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Speak once. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
                Watch it execute across the web, your repo & your phone.
              </span>
            </h2>

            <div className="space-y-4 text-sm text-gray-300 font-sans">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Hands-Free Speech Pipeline:</strong> AssemblyAI Universal-3 Pro captures 16kHz audio with sub-200ms turnaround directly through your AirPods or lockscreen.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Autonomous Tool Dispatch:</strong> Routes spoken intent to live multi-platform scrapers, Claude Code CLI daemons, or Fonoster SIP calls.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Post-Call Briefing & Calendar Sync:</strong> AssemblyAI LeMUR generates 1-page executive intelligence briefings with verified clickable links.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code & Execution Visualizer */}
          <div className="p-5 rounded-2xl bg-[#0a1120] border border-cyan-500/30 shadow-2xl font-mono text-xs text-gray-300">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20 text-[11px] text-cyan-400">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>SONAR_ACTION_PROTOCOL.json</span>
              </span>
              <span className="text-emerald-400">● LIVE GATEWAY</span>
            </div>

            <pre className="text-gray-300 overflow-x-auto text-[11px] leading-relaxed p-3 bg-black/60 rounded-xl border border-white/5">
{`{
  "voice_agent": "Sonar AI v1.1",
  "stt_engine": "AssemblyAI Universal-3 Pro",
  "telephony_gateway": "Fonoster Open-Source SIP",
  "active_actions": [
    {
      "action": "outbound_call",
      "target": "Dr. Sharma Clinic",
      "language": "Hindi (हिंदी)",
      "status": "CONFIRMED_AND_CALENDAR_SYNCED"
    },
    {
      "action": "coding_agent_bridge",
      "agent": "Claude Code",
      "task": "Fix auth session leak",
      "test_result": "14 passed in 0.82s"
    },
    {
      "action": "device_automation",
      "app": "com.makemytrip",
      "intent": "intent://flight/search?from=DEL&to=BLR",
      "status": "UNIVERSAL_INTENT_DISPATCHED"
    }
  ]
}`}
            </pre>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span>Ready for PWA & WebSocket Streaming</span>
              <span className="text-cyan-300 font-bold">&lt; 850ms Turnaround</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
