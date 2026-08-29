"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2, Github, ExternalLink, X } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState("feedback");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSent(true);
    setTimeout(() => {
      setMessage("");
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="sonar-panel rounded-3xl max-w-md w-full border border-cyan-500/40 p-6 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyan-500/20">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base font-mono uppercase">
              Developer Support & Feedback
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">Talk to Sonar AI Engineering Team</p>
          </div>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Thank you! Your feedback ticket has been dispatched to engineering.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-sans">
            <div>
              <label className="block text-gray-400 font-mono text-[11px] mb-1.5">Category</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-cyan-500/30 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="feedback">General Feedback & Feature Request</option>
                <option value="bug">Report a Bug / Voice Error</option>
                <option value="enterprise">Enterprise Custom Deployment</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 font-mono text-[11px] mb-1.5">Message / Issue Details</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or suggestion..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-cyan-500/30 text-white font-sans text-xs placeholder:text-gray-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://github.com/novaecosystems-cloud/SONAR/issues"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:text-white font-mono text-[11px] flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Issues</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="submit"
                disabled={!message.trim()}
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-extrabold font-mono text-xs flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
