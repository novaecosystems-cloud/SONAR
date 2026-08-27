"use client";

import React, { useEffect, useRef } from "react";
import { Waves, Activity, Radio, Volume2, Mic } from "lucide-react";

interface SonarVisualizerProps {
  frequencyData: Uint8Array | null;
  isLive: boolean;
  isAgentSpeaking: boolean;
  radarStatus: string;
}

export const SonarVisualizer: React.FC<SonarVisualizerProps> = ({
  frequencyData,
  isLive,
  isAgentSpeaking,
  radarStatus
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw subtle background grid and radar circles
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.strokeStyle = "rgba(6, 182, 212, 0.12)";
      ctx.lineWidth = 1;

      // Concentric Sonar Rings
      [25, 50, 75].forEach((radius) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      if (!isLive) {
        // Idle gentle heartbeat
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        const time = Date.now() * 0.0025;
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.05 + time) * 3;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        animationId = requestAnimationFrame(render);
        return;
      }

      // If live: render FFT frequencies in dual mirrored cyan bars
      const barCount = 40;
      const barWidth = width / barCount - 2;
      const step = Math.floor((frequencyData?.length || 64) / barCount);

      for (let i = 0; i < barCount; i++) {
        const val = frequencyData ? frequencyData[i * step] : 0;
        const percent = val / 255;
        const barHeight = Math.max(4, percent * (height - 12));

        const x = i * (barWidth + 2);
        const y = height / 2 - barHeight / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isAgentSpeaking) {
          grad.addColorStop(0, "#38bdf8");
          grad.addColorStop(1, "#0284c7");
        } else {
          grad.addColorStop(0, "#06b6d4");
          grad.addColorStop(1, "#0f766e");
        }

        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(6, 182, 212, 0.4)";
        ctx.shadowBlur = percent > 0.4 ? 8 : 2;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 2, 2]);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [frequencyData, isLive, isAgentSpeaking]);

  return (
    <div className="sonar-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between h-full shadow-xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-white">
              SONAR RADAR & AUDIO SPECTRUM
            </h2>
            <p className="text-[11px] text-gray-400">AssemblyAI Universal-3 Pro Neural Voice Stream</p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-cyan-300 font-bold">{radarStatus}</span>
          <span className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-cyan-400 animate-ping" : "bg-gray-600"}`} />
        </div>
      </div>

      {/* Main Radar & FFT Canvas */}
      <div className="relative w-full h-40 bg-black/50 rounded-xl border border-cyan-500/20 p-2 overflow-hidden flex items-center justify-center">
        
        {/* Animated Sonar Radar Sweeper */}
        {isLive && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border border-cyan-500/30 animate-radar-sweep origin-center relative">
              <div className="w-18 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 absolute top-1/2 left-1/2 origin-left shadow-[0_0_8px_#06b6d4]" />
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={580}
          height={150}
          className="w-full h-full object-contain relative z-10"
        />

        {/* Live Audio Status Badge */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded border border-cyan-500/30 text-[10px] font-mono text-cyan-300 z-20">
          {isAgentSpeaking ? (
            <>
              <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>AGENT SPEAKING</span>
            </>
          ) : isLive ? (
            <>
              <Mic className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>LISTENING TO YOU</span>
            </>
          ) : (
            <>
              <Activity className="w-3 h-3 text-gray-500" />
              <span>STANDBY</span>
            </>
          )}
        </div>

      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-3 gap-2.5 mt-3.5">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-gray-400">LATENCY TARGET</span>
          <span className="text-sm font-mono font-bold text-cyan-300">&lt; 850ms</span>
          <span className="text-[9px] text-gray-500 font-mono">Turnaround</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-gray-400">VOICE ENGINE</span>
          <span className="text-sm font-mono font-bold text-white">Universal-3 Pro</span>
          <span className="text-[9px] text-gray-500 font-mono">AssemblyAI</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-gray-400">INTERRUPTION</span>
          <span className="text-sm font-mono font-bold text-emerald-400">Barge-In ON</span>
          <span className="text-[9px] text-gray-500 font-mono">Auto-Mute</span>
        </div>
      </div>

    </div>
  );
};
