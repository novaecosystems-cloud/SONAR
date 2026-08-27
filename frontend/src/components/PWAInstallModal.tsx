"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Smartphone, Laptop, CheckCircle2, Sparkles } from "lucide-react";

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      onClose();
    } else {
      alert("To install Sonar AI on iOS Safari: Tap the Share button at the bottom and select 'Add to Home Screen'. On Chrome Desktop: Click the Install icon in the address bar.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="sonar-panel rounded-3xl max-w-lg w-full border border-cyan-500/40 p-6 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Download className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg font-mono">
              Install Sonar AI as a PWA
            </h3>
            <p className="text-xs text-gray-400">Zero-Install Instant Progressive Web App</p>
          </div>
        </div>

        <div className="space-y-3.5 my-6 text-xs text-gray-300 font-sans">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Mobile Installation (iOS & Android):</strong>
              <span>Installs to your home screen with zero app store delays and enables lockscreen background voice streaming.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-start gap-3">
            <Laptop className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Desktop App (Mac & Windows):</strong>
              <span>Runs as a standalone desktop window with native keyboard shortcuts and system microphone access.</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-cyan-500/20">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 font-mono"
          >
            Close
          </button>
          <button
            onClick={handleInstallClick}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] font-mono flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isInstalled ? "App Installed!" : "Install App Now"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
