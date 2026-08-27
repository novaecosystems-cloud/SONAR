import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonar AI | Conversational Voice Agent for Live Internet Intelligence",
  description: "Hands-free ambient voice agent querying Twitter/X, Reddit, YouTube, and the Web in real time with AssemblyAI Universal-3 Pro & LeMUR.",
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
