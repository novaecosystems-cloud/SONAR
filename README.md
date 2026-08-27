# 🌊 Sonar AI — The Conversational Voice Agent for Live Internet & Social Intelligence

> **Winner-Ready Submission for the AssemblyAI Voice Agent Hackathon on lablab.ai**  
> *"Pulse the live internet with your voice."* — A hands-free conversational voice agent that searches, synthesizes, and cross-examines real-time consensus across **Twitter/X, Reddit, YouTube, and the Web**, generating structured **AssemblyAI LeMUR Executive Briefings**.

---

## 💡 The Inspiration & The Everyday Problem

Every professional, investor, founder, student, and curious human faces two massive daily frictions:

1. **The 2-Hour "Doomscroll Tax":** To find true community sentiment or breaking reactions on any topic (a new tech release, a company re-org, stock earnings, product reviews), you have to juggle 5 separate apps (Twitter/X, Reddit, YouTube, Hacker News, Google News) and sift through 500 memes, ads, and spam replies to find 3 real insights.
2. **The "Hands-Busy, Mind-Free" Dead Time:** People spend **2–3 hours every day** commuting, driving, walking the dog, cooking, or exercising. During this time, you cannot read small text on screens. Static podcasts and audiobooks cannot answer your specific questions in real time.

---

## ⚡ What Sonar AI Does

**Sonar AI is your ambient conversational research analyst in your ear:**

```
      🗣️ You Speak: "What are people on Reddit and Twitter saying about the React 19 compiler?"
                                │
                                ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                   ASSEMBLYAI VOICE AGENT ENGINE                             │
  │   • Universal-3 Pro Streaming STT (Sub-200ms)                               │
  │   • Neural Voice Activity Detection (VAD) & Natural Barge-In Interruption    │
  │   • JSON-Schema Tool Calling Router                                         │
  └───────────────────────────────┬─────────────────────────────────────────────┘
                                  │
                                  ▼ (Emits tool.call: search_social)
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │             MULTI-PLATFORM LIVE REACH ENGINE (Agent-Reach)                  │
  │   • 🐦 Twitter/X Scraper: Viral takes, sentiment, influential quotes       │
  │   • 👽 Reddit Scraper: Subreddit discussions, complaints, workarounds       │
  │   • 📺 YouTube Transcripts: Video takeaways & benchmark breakdowns          │
  │   • 🌐 Real-Time Web & News: Live articles, documentation, status pages     │
  └───────────────────────────────┬─────────────────────────────────────────────┘
                                  │
                                  ▼ (Returns structured JSON results)
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                 CONVERSATIONAL SYNTHESIS & VOICE OUTPUT                     │
  │   🎧 Agent Speaks: "Developers on Reddit praise the automatic memoization,   │
  │      but several maintainers on Twitter warn about third-party library      │
  │      compatibility. Would you like me to dive into the benchmark numbers?"  │
  └───────────────────────────────┬─────────────────────────────────────────────┘
                                  │ (When conversation ends)
                                  ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │             ASSEMBLYAI LeMUR EXECUTIVE RESEARCH BRIEFING                     │
  │   • 1-Page Structured Markdown & PDF Briefing with Clickable Citations      │
  │   • Executive Takeaways, Sentiment Breakdown, and Direct Source URLs        │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏆 Deep AssemblyAI Integration

1. **AssemblyAI Voice Agent API (`wss://agents.assemblyai.com/v1/ws`)**:
   - **Universal-3 Pro STT:** Ultra-low latency streaming speech-to-text with domain-specific accuracy.
   - **Neural Turn-Taking & VAD:** Automatically detects conversational turns and supports natural **barge-in** (if you speak while Sonar AI is talking, it stops immediately).
   - **JSON-Schema Tool Calling:** Directly invokes `search_twitter`, `search_reddit`, `search_youtube`, and `search_web` during the live voice conversation.
2. **AssemblyAI LeMUR (Large Language Model for Audio)**:
   - When you conclude your session, LeMUR analyzes the entire spoken dialogue and tool results.
   - Formulates a structured **1-Page Executive Research Briefing** with full citations, sentiment breakdown, and key takeaways.

---

## 🎯 4 Real-World Daily Use Cases

| User | The Spoken Question | What Sonar AI Solves |
| :--- | :--- | :--- |
| **Tech Worker / Job Seeker** | *"What are employees on Reddit r/cscareerquestions and Blind saying about Stripe's work-life balance?"* | Prepares for interviews during a morning walk without reading through 50 forum threads. |
| **Investor / Trader** | *"What is the reaction on Twitter and WallStreetBets to Nvidia's earnings report from an hour ago?"* | Gets real-time market sentiment and contrarian takes while driving home. |
| **Consumer / Shopper** | *"Are there common durability issues with the Sony XM5 headphones according to Reddit r/headphones?"* | Extracts real customer failure rates in 5 seconds instead of reading 40 product reviews. |
| **Software Engineer** | *"Is Cloudflare having an outage right now? Check what users on Twitter and Reddit are reporting in the last 15 minutes."* | Instantly confirms live infrastructure outages hands-free. |

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js** v18+ and **npm**
- **Python** 3.10+
- **AssemblyAI API Key** (Pre-configured in `.env`)

### 2. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
python run.py
```
*Backend runs on `http://localhost:8000` (FastAPI with WebSocket gateway).*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend Sonar Cockpit opens on `http://localhost:3000`.*

---

## 🧪 How to Demo & Test

1. **Live Voice Mode:** Click **"Start Live Voice"** and ask anything into your microphone (e.g., *"What are people saying about the new Llama 3 release on Twitter and Reddit?"*). Watch the radar sweep, see the platform chips glow, and listen to the spoken answer!
2. **1-Click Test Scenarios:** Click any of the pre-configured scenarios (*Nvidia Earnings Sentiment*, *React 19 Compiler Review*, *Sony XM5 Durability*, *Stripe Work-Life Balance*, *Cloudflare Live Outage*) to test with one click.
3. **LeMUR Executive Briefing:** Click **"View LeMUR Briefing"** to view and download the structured research report with clickable citations!

---

## 📈 Venture Scalability & Business Model

* **Prosumer Subscription ($19–$29/mo):** For founders, investors, researchers, engineers, and creators who need hands-free live market intelligence.
* **Enterprise Workspace ($49/seat/mo):** Team knowledge graph, competitor monitoring alerts, and corporate research digests.

---

## 👥 Built with Pride
Built for the **AssemblyAI Voice Agent Hackathon** hosted by **lablab.ai**.
