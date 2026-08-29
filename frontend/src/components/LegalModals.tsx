"use client";

import React from "react";
import { X, ShieldCheck, FileText } from "lucide-react";

interface LegalModalsProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="sonar-panel rounded-3xl max-w-2xl w-full border border-cyan-500/40 p-6 relative shadow-2xl max-h-[85vh] flex flex-col">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyan-500/20">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            {type === "privacy" ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base font-mono uppercase">
              {type === "privacy" ? "Privacy Policy & Data Security" : "Terms & Conditions of Service"}
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">Effective Date: August 29, 2026</p>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 pr-2 text-xs text-gray-300 font-sans space-y-4 leading-relaxed">
          {type === "privacy" ? (
            <>
              <div>
                <h4 className="font-bold text-white mb-1 font-mono text-xs">1. Voice Audio & Speech Recognition Processing</h4>
                <p>
                  Sonar AI processes audio streams in real time via AssemblyAI Universal-3 Pro. Audio data is streamed encrypted over TLS WebSockets and is never stored on permanent third-party servers without explicit user consent.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1 font-mono text-xs">2. Open-Source Fonoster Telephony</h4>
                <p>
                  Outbound telephone calls initiated through Fonoster open-source SIP trunks strictly follow user-directed prompts. Call audio is used exclusively for live appointment scheduling and Google Calendar synchronization.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1 font-mono text-xs">3. Local Storage & Device Data</h4>
                <p>
                  All session keys, transcripts, and briefing exports remain stored in the user&apos;s local browser IndexedDB / localStorage. We do not sell user data to advertising networks.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1 font-mono text-xs">4. Contact & Data Deletion Requests</h4>
                <p>
                  Users may request full deletion of any session artifacts anytime by contacting privacy@novaecosystems.cloud.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-white mb-1 font-mono text-xs">1. Acceptance of Terms</h4>
                <p>
                  By accessing Sonar AI or installing the Progressive Web App (PWA), you agree to be bound by these Terms of Service.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1 font-mono text-xs">2. Autonomous Action Delegation</h4>
                <p>
                  Actions executed by Sonar AI (such as Claude Code tasks, MakeMyTrip flight booking intents, and Uber rides) are performed on behalf of the user. Users are responsible for confirming final on-device checkout payments.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1 font-mono text-xs">3. Zero-Carrier Telephony Usage</h4>
                <p>
                  Fonoster SIP calling features must not be used for unsolicited robocalling, telemarketing, or harassment. Violation of standard telecommunication regulations results in immediate account suspension.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-cyan-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 font-mono transition-colors"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
};
