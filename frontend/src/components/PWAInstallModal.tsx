"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Smartphone, Laptop, CheckCircle2, Sparkles, FileArchive, Terminal, ArrowDownToLine } from "lucide-react";

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
    } else {
      // Direct install guidance
      alert("Installing Sonar AI PWA:\n• On Android/Chrome: Click 'Install app' or the download buttons below.\n• On iOS Safari: Tap Share ➔ 'Add to Home Screen'.\n• On Laptop: Click 'Download Windows/Mac Package' below.");
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
              Install & Download Sonar AI
            </h3>
            <p className="text-xs text-gray-400">Direct Download for Mobile & Desktop (PWA + Offline Bundle)</p>
          </div>
        </div>

        {/* Download & Installation Options Grid */}
        <div className="space-y-3 my-5 text-xs text-gray-300 font-sans">
          
          {/* Option 1: Direct 1-Tap PWA Browser Install */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-cyan-500/30 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">1-Tap PWA Installation (Mobile & Chrome)</strong>
                <span className="text-[11px] text-gray-400">Installs directly to your home screen with zero app store delays.</span>
              </div>
            </div>
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-[11px] font-mono flex items-center gap-1.5 flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Install PWA</span>
            </button>
          </div>

          {/* Option 2: Direct Windows Desktop Launcher (.bat) */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Laptop className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Windows Standalone Desktop Launcher</strong>
                <span className="text-[11px] text-gray-400">1-Click batch launcher for borderless desktop window mode.</span>
              </div>
            </div>
            <a
              href="/downloads/sonar-ai-windows-desktop.bat"
              download="sonar-ai-windows-desktop.bat"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] font-mono flex items-center gap-1.5 flex-shrink-0 border border-white/10"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download .bat</span>
            </a>
          </div>

          {/* Option 3: Direct Full App ZIP Bundle */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <FileArchive className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Complete Offline App Bundle (.zip)</strong>
                <span className="text-[11px] text-gray-400">Download icons, manifest, and offline files for manual install.</span>
              </div>
            </div>
            <a
              href="/downloads/sonar-ai-app-bundle.zip"
              download="sonar-ai-app-bundle.zip"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-[11px] font-mono flex items-center gap-1.5 flex-shrink-0 border border-emerald-500/40"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Download .zip</span>
            </a>
          </div>

        </div>

        {/* Step-by-Step Instructions by Platform */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 space-y-1 font-mono">
          <div><span className="text-cyan-300 font-bold">iOS Safari:</span> Tap Share (square with arrow) ➔ select <span className="text-white font-bold">&quot;Add to Home Screen&quot;</span>.</div>
          <div><span className="text-cyan-300 font-bold">Android:</span> Tap menu (3 dots) ➔ select <span className="text-white font-bold">&quot;Install app&quot;</span> or tap Install PWA above.</div>
          <div><span className="text-cyan-300 font-bold">Mac / Windows:</span> Click the install icon in Chrome address bar or run the .bat file.</div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cyan-500/20 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 font-mono"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
