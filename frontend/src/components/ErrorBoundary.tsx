"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Sparkles } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Sonar ErrorBoundary] Uncaught crash:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060a12] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mb-4">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold font-mono mb-2">
            CRASH RECOVERY ACTIVE
          </h2>
          <p className="text-gray-400 text-xs max-w-md mb-6 font-sans">
            Sonar AI encountered an unexpected client state. Crash diagnostics have been captured locally.
          </p>
          <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-left font-mono text-[11px] text-red-300 max-w-lg w-full mb-6 overflow-x-auto">
            {this.state.error?.message || "Unknown error"}
          </div>
          <button
            onClick={this.handleReset}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Recover Session</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
