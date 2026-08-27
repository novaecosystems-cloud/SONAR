# 📄 Sonar AI — Product Requirements Document (PRD)

---

## 1. Product Overview
**Sonar AI** is an ambient conversational voice agent that provides real-time internet and social intelligence across Twitter/X, Reddit, YouTube, and the Web. It allows users to conduct deep-dive research hands-free during commutes, walks, or physical tasks, speaking instant consensus and generating post-session structured executive briefings via AssemblyAI LeMUR.

---

## 2. Target User Personas

### 👨‍💼 Persona 1: The Commuting Founder & Tech Executive
* **Pain Point:** Needs to stay informed on AI breakthroughs, competitor announcements, and tech drama but has zero time to scroll social media during back-to-back meetings.
* **Use Case:** Puts on AirPods during the 25-minute drive to the office and converses with Sonar AI to get the morning tech debrief.

### 📈 Persona 2: The Macro & Tech Investor
* **Pain Point:** When earnings drop (e.g. Nvidia, Apple, Meta), financial sentiment shifts in minutes on Twitter and Reddit forums before mainstream news writes articles.
* **Use Case:** Listens to real-time sentiment shifts and contrarian views hands-free.

### 🛍️ Persona 3: The Smart Consumer & Product Researcher
* **Pain Point:** Amazon and Google product reviews are infested with affiliate spam and fake 5-star ratings; authentic failure reports are buried in Reddit threads.
* **Use Case:** Asks Sonar AI to cross-examine durability and bug reports across Reddit r/headphones or r/gadgets in 10 seconds.

---

## 3. Key Functional Requirements

| Feature ID | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **FR-01** | Real-Time Voice Streaming | Ingests 16kHz PCM audio stream via Web Audio API and WebSocket gateway with sub-200ms transcription. | **P0** |
| **FR-02** | Multi-Platform Reach | Autonomous tool execution for Twitter/X, Reddit, YouTube transcripts, and Web news with zero API fee overhead. | **P0** |
| **FR-03** | Spoken Conversational Synthesis | Formats search findings into punchy, spoken-friendly 2–3 sentence answers delivered over audio playback. | **P0** |
| **FR-04** | Natural Interruption (Barge-In) | Instantly mutes voice playback when user begins speaking mid-response. | **P0** |
| **FR-05** | LeMUR Executive Briefings | Compiles full spoken session into 1-page structured Markdown & JSON report with clickable source links. | **P0** |
| **FR-06** | Sonar Visualizer & Radar HUD | Displays glowing circular sonar radar sweep, audio FFT frequencies, and pulsing social platform chips. | **P1** |
| **FR-07** | 1-Click Simulation Suite | Pre-configured test queries for instant demoing and hackathon judging without mic requirement. | **P1** |

---

## 4. Non-Functional & Performance Requirements

* **End-to-End Latency:** Total turnaround time from user speech pause to agent voice response must remain below **900ms**.
* **Reliability & Fallback:** If internet connectivity drops or external scrapers are throttled, the system must gracefully fall back to web search or cached synthesis without crashing.
* **Zero-API-Fee Ingestion:** Search adapters must remain operational without requiring costly paid enterprise Twitter/Reddit API plans.
