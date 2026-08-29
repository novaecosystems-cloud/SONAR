import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonar AI — Voice Super-Agent for Real-Time Internet Intelligence",
  description: "Hands-free ambient voice agent querying Twitter/X, Reddit, YouTube, and the Web in real time with AssemblyAI Universal-3 Pro, Fonoster Telephony, and on-device app automation.",
  metadataBase: new URL("https://sonar-ai.vercel.app"),
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Sonar AI",
    "Voice Agent",
    "AssemblyAI Universal-3 Pro",
    "LeMUR Executive Briefing",
    "Fonoster Open-Source Telephony",
    "Real-time Social Search",
    "Claude Code Agent",
    "MakeMyTrip Auto Booking",
    "Uber Ride Booking",
    "PWA Voice Super-Agent"
  ],
  authors: [{ name: "Nova Ecosystems Cloud", url: "https://github.com/novaecosystems-cloud/SONAR" }],
  creator: "Nova Ecosystems Cloud",
  publisher: "Nova Ecosystems Cloud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sonar-ai.vercel.app",
    siteName: "Sonar AI Super-Agent",
    title: "Sonar AI — Ambient Voice Super-Agent for Live Internet Intelligence",
    description: "Hands-free ambient voice agent querying Twitter/X, Reddit, YouTube, and the Web in real time with AssemblyAI Universal-3 Pro & LeMUR.",
    images: [
      {
        url: "/icons/icon-512.svg",
        width: 512,
        height: 512,
        alt: "Sonar AI Super-Agent Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonar AI — Voice Super-Agent for Live Internet Intelligence",
    description: "Hands-free ambient voice agent querying Twitter/X, Reddit, YouTube, and the Web in real time with AssemblyAI & Fonoster.",
    images: ["/icons/icon-512.svg"],
    creator: "@novaecosystems"
  },
  icons: {
    icon: "/icons/icon-192.svg",
    shortcut: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg"
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="sonar-grid antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
