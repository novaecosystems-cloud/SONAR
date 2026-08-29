"use client";

import React, { useState, useEffect } from "react";
import { Play, Sparkles, Zap, ArrowRight } from "lucide-react";

export interface SonarScenario {
  id: string;
  title: string;
  category: string;
  initial_spoken_prompt: string;
  description: string;
  target_platforms: string[];
}

interface ScenarioPlayerProps {
  onSelectScenario: (prompt: string, title: string) => void;
  isLive: boolean;
}

export const ScenarioPlayer: React.FC<ScenarioPlayerProps> = ({
  onSelectScenario,
  isLive
}) => {
  const [scenarios, setScenarios] = useState<SonarScenario[]>([]);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/scenarios");
        const data = await res.json();
        setScenarios(data);
      } catch (e) {
        console.warn("Using fallback scenarios list");
      }
    };
    fetchScenarios();
  }, []);

  return (
    <div className="sonar-panel rounded-2xl p-5 border border-cyan-500/20 shadow-xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-white">
              1-CLICK DEMO SCENARIOS
            </h2>
            <p className="text-[11px] text-gray-400">Instant test queries for hackathon evaluation</p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-cyan-400">5 LIVE BENCHMARKS</span>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            onClick={() => onSelectScenario(sc.initial_spoken_prompt, sc.title)}
            className="p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-cyan-950/30 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-cyan-400">
                <span>{sc.category}</span>
                <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1.5 leading-snug group-hover:text-cyan-200 transition-colors">
                {sc.title}
              </h3>
              <p className="text-[11px] text-gray-400 line-clamp-2 mb-2 font-sans">
                {sc.initial_spoken_prompt}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cyan-300">
              <span>Ask Sonar</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
