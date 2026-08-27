"use client";

import React, { useState } from "react";
import { Terminal, PhoneCall, Car, Plane, CheckCircle2, Play, ExternalLink, Sparkles, Loader2, GitPullRequest, Clock, ShieldCheck, MapPin, Radio, Smartphone, Download, ArrowRight } from "lucide-react";

interface ActionCockpitProps {
  onActionExecuted: (summary: string) => void;
}

export const ActionCockpit: React.FC<ActionCockpitProps> = ({ onActionExecuted }) => {
  const [activeTab, setActiveTab] = useState<"device" | "code" | "call" | "ride" | "flight">("device");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [telephonyProvider, setTelephonyProvider] = useState<"fonoster" | "twilio">("fonoster");

  // 0. On-Device Mobile App Automation (MakeMyTrip, Uber, Rapido)
  const handleAutomateDeviceApp = async (appKey: string, dest: string, orig: string = "Delhi DEL", date: string = "2026-09-04") => {
    setLoading(true);
    setResultData(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/device/automate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_key: appKey,
          destination: dest,
          origin: orig,
          flight_date: date
        })
      });
      const data = await res.json();
      setResultData(data);
      onActionExecuted(data.spoken_feedback);
    } catch (e) {
      console.error("Device automation error:", e);
    } finally {
      setLoading(false);
    }
  };

  // 1. Coding Agent Execution
  const handleRunCodeTask = async (instruction: string, agentType: string = "claude_code") => {
    setLoading(true);
    setResultData(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/actions/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_type: agentType,
          instruction: instruction,
          target_repo: "sonar-ai/backend"
        })
      });
      const data = await res.json();
      setResultData(data);
      onActionExecuted(`Claude Code completed task: ${data.summary}`);
    } catch (e) {
      console.error("Coding task error:", e);
    } finally {
      setLoading(false);
    }
  };

  // 2. Outbound Call Execution (Fonoster / Twilio)
  const handleMakeOutboundCall = async (lang: string = "hi") => {
    setLoading(true);
    setResultData(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/actions/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_name: "Dr. Sharma Dental Clinic",
          phone_number: "+91-9876543210",
          appointment_type: "Dental Checkup & Cleaning",
          preferred_time: "4:00 PM",
          language: lang,
          user_name: "Shourya",
          telephony_provider: telephonyProvider
        })
      });
      const data = await res.json();
      setResultData(data);
      onActionExecuted(data.spoken_summary);
    } catch (e) {
      console.error("Outbound call error:", e);
    } finally {
      setLoading(false);
    }
  };

  // 3. Ride Booking
  const handleBookRide = async (provider: string, rideType: string) => {
    setLoading(true);
    setResultData(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/actions/ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: provider,
          pickup_location: "Current GPS Location",
          destination: "Indira Gandhi International Airport (DEL)",
          ride_type: rideType
        })
      });
      const data = await res.json();
      setResultData(data);
      onActionExecuted(data.spoken_confirmation);
    } catch (e) {
      console.error("Ride booking error:", e);
    } finally {
      setLoading(false);
    }
  };

  // 4. Flight Search
  const handleSearchFlights = async () => {
    setLoading(true);
    setResultData(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/actions/flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: "DEL",
          destination: "BLR",
          departure_date: "2026-09-04",
          passengers: 1
        })
      });
      const data = await res.json();
      setResultData(data);
      onActionExecuted(data.spoken_summary);
    } catch (e) {
      console.error("Flight search error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sonar-panel rounded-2xl p-5 border border-cyan-500/20 shadow-xl">
      
      {/* Top Bar with Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-white uppercase">
              SUPER-AGENT ACTION HUB
            </h2>
            <p className="text-[11px] text-gray-400">On-Device App Automation, Fonoster Calls, Claude Code & Booking</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/5 font-mono text-xs">
          <button
            onClick={() => { setActiveTab("device"); setResultData(null); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${activeTab === "device" ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App Automator</span>
          </button>
          <button
            onClick={() => { setActiveTab("code"); setResultData(null); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${activeTab === "code" ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Code Agent</span>
          </button>
          <button
            onClick={() => { setActiveTab("call"); setResultData(null); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${activeTab === "call" ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Bot (Fonoster)</span>
          </button>
          <button
            onClick={() => { setActiveTab("ride"); setResultData(null); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${activeTab === "ride" ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Uber / Rapido</span>
          </button>
          <button
            onClick={() => { setActiveTab("flight"); setResultData(null); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${activeTab === "flight" ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Flight Booking</span>
          </button>
        </div>
      </div>

      {/* Tab 0: On-Device Mobile App Automation */}
      {activeTab === "device" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300 font-bold">On-Device Autonomous App Control & Auto-Installer:</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Auto-Install from Play Store if Missing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleAutomateDeviceApp("makemytrip", "Bangalore BLR", "Delhi DEL")}
              disabled={loading}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-red-950/30 border border-white/5 hover:border-red-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-red-400 mb-1">
                <span>MakeMyTrip</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white mb-1">Auto-Book DEL ➔ BLR Flight</p>
              <p className="text-[10px] text-gray-400">Installs MakeMyTrip if uninstalled, launches intent & fills route.</p>
            </button>

            <button
              onClick={() => handleAutomateDeviceApp("uber", "Terminal 3 Airport", "Current Location")}
              disabled={loading}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-black border border-white/5 hover:border-white/30 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-300 mb-1">
                <span>Uber Cabs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white mb-1">Auto-Book Uber to Airport</p>
              <p className="text-[10px] text-gray-400">Opens Uber app or Play Store, sets drop-off & comfort tier.</p>
            </button>

            <button
              onClick={() => handleAutomateDeviceApp("rapido", "Indiranagar Metro", "Current Location")}
              disabled={loading}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-yellow-950/30 border border-white/5 hover:border-yellow-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-yellow-400 mb-1">
                <span>Rapido Bike/Auto</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white mb-1">Auto-Book Rapido to Metro</p>
              <p className="text-[10px] text-gray-400">Dispatches Rapido intent with GPS coordinates.</p>
            </button>
          </div>

          {/* Execution Pipeline Trace */}
          {resultData && resultData.package_id && (
            <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>ON-DEVICE EXECUTION: {resultData.app_name} ({resultData.package_id})</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ready to Dispatch
                </span>
              </div>

              <div className="space-y-1.5">
                {resultData.execution_steps?.map((step: any) => (
                  <div key={step.step_number} className="flex items-center gap-2 text-gray-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-cyan-400 font-bold">Step {step.step_number}:</span>
                    <span>{step.description}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="text-[10px] text-gray-400 font-mono truncate max-w-sm">
                  ADB Intent: {resultData.adb_commands?.[1]}
                </div>
                <a
                  href={resultData.deep_link_intent_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30"
                >
                  <span>Launch on Mobile Device</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 1: Coding Agent Delegation */}
      {activeTab === "code" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300">Spoken Coding Tasks for Claude Code & Antigravity CLI:</span>
            <span className="text-[10px] font-mono text-cyan-400">Autonomous Git & PR Bridge</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleRunCodeTask("Fix auth session leak in backend and run unit tests", "claude_code")}
              disabled={loading}
              className="p-3 rounded-xl bg-white/5 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                <span>Claude Code</span>
                <Play className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white mb-1">Fix Auth Session Leak</p>
              <p className="text-[10px] text-gray-400">Cleans dangling token refs & runs 14 test cases.</p>
            </button>

            <button
              onClick={() => handleRunCodeTask("Add REST and WebSocket endpoints with Pydantic v2 validation", "antigravity")}
              disabled={loading}
              className="p-3 rounded-xl bg-white/5 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                <span>Antigravity SWE</span>
                <Play className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white mb-1">Generate API Endpoints</p>
              <p className="text-[10px] text-gray-400">Creates schemas, route handlers & unit tests.</p>
            </button>

            <button
              onClick={() => handleRunCodeTask("Refactor mobile glassmorphism UI and test responsive layout", "claude_code")}
              disabled={loading}
              className="p-3 rounded-xl bg-white/5 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                <span>Claude Code</span>
                <Play className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white mb-1">Refactor Mobile UI</p>
              <p className="text-[10px] text-gray-400">Updates Tailwind CSS & verifies Next.js build.</p>
            </button>
          </div>

          {/* Terminal Result Trace */}
          {resultData && resultData.task_id && (
            <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>TASK {resultData.task_id} COMPLETED</span>
                </span>
                <span className="text-[10px] text-gray-400">Branch: {resultData.git_branch}</span>
              </div>
              <p className="text-gray-300">{resultData.summary}</p>
              <div className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                ✓ Tests: {resultData.test_results}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Outbound Multilingual Phone Calling (Fonoster) */}
      {activeTab === "call" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Telephony Engine:</span>
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-cyan-500/30 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setTelephonyProvider("fonoster")}
                  className={`px-2 py-0.5 rounded transition-colors ${telephonyProvider === "fonoster" ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
                >
                  ⚡ Fonoster (Open-Source)
                </button>
                <button
                  type="button"
                  onClick={() => setTelephonyProvider("twilio")}
                  className={`px-2 py-0.5 rounded transition-colors ${telephonyProvider === "twilio" ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
                >
                  Twilio
                </button>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Zero-Carrier Markup Mode Active</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => handleMakeOutboundCall("hi")}
              disabled={loading}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-orange-400 block mb-1">Hindi Call (हिंदी) via Fonoster</span>
                <h4 className="text-xs font-bold text-white">Call Dr. Sharma Clinic</h4>
                <p className="text-[11px] text-gray-400">Books dental checkup in Hindi for tomorrow 4 PM.</p>
              </div>
              <PhoneCall className="w-5 h-5 text-orange-400" />
            </button>

            <button
              onClick={() => handleMakeOutboundCall("en")}
              disabled={loading}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block mb-1">English Call via Fonoster</span>
                <h4 className="text-xs font-bold text-white">Call Dr. Sharma Clinic</h4>
                <p className="text-[11px] text-gray-400">Books dental checkup in English for tomorrow 4 PM.</p>
              </div>
              <PhoneCall className="w-5 h-5 text-cyan-400" />
            </button>
          </div>

          {/* Call Transcript Dialog */}
          {resultData && resultData.call_id && (
            <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CALL {resultData.call_id}: APPOINTMENT CONFIRMED</span>
                </span>
                <span className="text-[10px] text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                  {resultData.telephony_provider}
                </span>
              </div>
              <div className="space-y-1.5 font-sans text-xs">
                {resultData.conversation_transcript?.map((msg: any, i: number) => (
                  <div key={i} className="text-gray-300">
                    <span className="font-bold text-cyan-300">{msg.speaker}:</span> {msg.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Uber & Rapido Rides */}
      {activeTab === "ride" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300">1-Tap Universal Deep Links (Uber & Rapido):</span>
            <span className="text-[10px] font-mono text-cyan-400">On-Device App Intent</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => handleBookRide("uber", "comfort")}
              disabled={loading}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-black border border-white/5 hover:border-white/30 text-left transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-gray-300 block mb-1">UBER COMFORT</span>
                <h4 className="text-xs font-bold text-white">To Airport (DEL)</h4>
                <p className="text-[11px] text-gray-400">Fare: ₹340 • ETA: 4 mins</p>
              </div>
              <Car className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => handleBookRide("rapido", "bike")}
              disabled={loading}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-yellow-950/30 border border-white/5 hover:border-yellow-500/40 text-left transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-yellow-400 block mb-1">RAPIDO BIKE / AUTO</span>
                <h4 className="text-xs font-bold text-white">To Airport (DEL)</h4>
                <p className="text-[11px] text-gray-400">Fare: ₹85 • ETA: 3 mins</p>
              </div>
              <Car className="w-5 h-5 text-yellow-400" />
            </button>
          </div>

          {resultData && resultData.deep_link_url && (
            <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{resultData.provider} Ride Ready</div>
                <div className="text-[11px] text-gray-400">Fare: ₹{resultData.estimated_fare_inr} • Arriving in {resultData.estimated_arrival_mins} mins</div>
              </div>
              <a
                href={resultData.deep_link_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-1.5 font-mono shadow-lg shadow-cyan-500/30"
              >
                <span>Launch {resultData.provider} App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Flight Booking */}
      {activeTab === "flight" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300">Live Airfare Comparison (Delhi DEL ➔ Bangalore BLR):</span>
            <button
              onClick={handleSearchFlights}
              className="px-3 py-1 rounded bg-cyan-500 text-black font-bold font-mono text-xs hover:bg-cyan-400 transition-colors"
            >
              Search Flights
            </button>
          </div>

          {resultData && resultData.all_flights && (
            <div className="space-y-2">
              {resultData.all_flights.map((f: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{f.airline} • {f.flight_number}</div>
                    <div className="text-[11px] text-gray-400">{f.departure_time} ➔ {f.arrival_time} ({f.duration}, {f.stops})</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-cyan-300">₹{f.price_inr}</span>
                    <a
                      href={f.booking_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-lg bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-300 border border-cyan-500/30 font-mono text-xs flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
