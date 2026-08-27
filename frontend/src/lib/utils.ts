import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getPlatformBadgeStyle(platform: string): { text: string; bg: string; border: string; glow: string } {
  switch (platform.toLowerCase()) {
    case "twitter":
    case "x":
      return {
        text: "text-blue-400",
        bg: "bg-blue-950/40",
        border: "border-blue-500/40",
        glow: "shadow-[0_0_12px_rgba(59,130,246,0.3)]"
      };
    case "reddit":
      return {
        text: "text-orange-400",
        bg: "bg-orange-950/40",
        border: "border-orange-500/40",
        glow: "shadow-[0_0_12px_rgba(249,115,22,0.3)]"
      };
    case "youtube":
      return {
        text: "text-red-400",
        bg: "bg-red-950/40",
        border: "border-red-500/40",
        glow: "shadow-[0_0_12px_rgba(239,68,68,0.3)]"
      };
    case "web":
    default:
      return {
        text: "text-cyan-400",
        bg: "bg-cyan-950/40",
        border: "border-cyan-500/40",
        glow: "shadow-[0_0_12px_rgba(6,182,212,0.3)]"
      };
  }
}
