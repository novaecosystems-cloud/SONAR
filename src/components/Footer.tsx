"use client";

import React from "react";
import { Waves, Github, ExternalLink, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyan-500/10 bg-[#050810] text-gray-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Waves className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base text-white tracking-wider font-mono">
                SONAR AI
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-sans">
              The ambient conversational voice super-agent. Installs in seconds as a Progressive Web App (PWA), 
              empowering hands-free research, SWE coding delegation, and multilingual phone calling.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/novaecosystems-cloud/SONAR"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-white font-mono text-xs transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="font-bold text-white font-mono uppercase tracking-wider mb-3 text-[11px]">
              Product
            </h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-cyan-300 transition-colors">Voice Cockpit</a></li>
              <li><a href="#features" className="hover:text-cyan-300 transition-colors">Action Hub</a></li>
              <li><a href="#features" className="hover:text-cyan-300 transition-colors">LeMUR Briefings</a></li>
              <li><a href="#features" className="hover:text-cyan-300 transition-colors">Mobile PWA Install</a></li>
            </ul>
          </div>

          {/* Column 2: Tech Engine */}
          <div>
            <h4 className="font-bold text-white font-mono uppercase tracking-wider mb-3 text-[11px]">
              Tech Engine
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-cyan-300 transition-colors">AssemblyAI Universal-3</span></li>
              <li><span className="hover:text-cyan-300 transition-colors">Fonoster Telephony</span></li>
              <li><span className="hover:text-cyan-300 transition-colors">Agent-Reach Scrapers</span></li>
              <li><span className="hover:text-cyan-300 transition-colors">Claude Code Bridge</span></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-bold text-white font-mono uppercase tracking-wider mb-3 text-[11px]">
              Resources
            </h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/novaecosystems-cloud/SONAR" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">Documentation</a></li>
              <li><a href="#pricing" className="hover:text-cyan-300 transition-colors">Pricing Plans</a></li>
              <li><span className="text-emerald-400">● Systems Operational</span></li>
              <li><span className="hover:text-cyan-300 transition-colors">lablab.ai Hackathon</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
          <div>
            © 2026 Sonar AI Super-Agent, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">Zero-API-Fee Ingestion</span>
            <span>•</span>
            <span>Open-Source Fonoster SIP</span>
            <span>•</span>
            <span>AssemblyAI Flagship</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
