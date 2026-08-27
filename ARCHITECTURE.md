# 🏛️ Sonar AI — Technical Architecture & System Design

This document details the complete end-to-end architecture, communication protocols, tool integration specifications, and latency optimization strategies of **Sonar AI**.

---

## 1. System Overview & Component Diagram

```
                       ┌─────────────────────────────────────────┐
                       │           CLIENT / BROWSER              │
                       │    Next.js 14 + Web Audio API (16kHz)   │
                       └────────────────────┬────────────────────┘
                                            │
                                            │ Bidirectional WebSocket
                                            │ (PCM Audio Chunks & Events)
                                            ▼
                       ┌─────────────────────────────────────────┐
                       │          SONAR FASTAPI GATEWAY          │
                       │   Session Router & Protocol Adapter     │
                       └────────────────────┬────────────────────┘
                                            │
                   ┌────────────────────────┴────────────────────────┐
                   ▼                                                 ▼
┌───────────────────────────────────────┐         ┌───────────────────────────────────────┐
│     ASSEMBLYAI VOICE AGENT ENGINE     │         │      AGENT-REACH SEARCH SUITE         │
│  Endpoint: wss://agents.assemblyai    │         │  Zero-API-Fee Multi-Platform Ingest   │
├───────────────────────────────────────┤         ├───────────────────────────────────────┤
│ • Universal-3 Pro Streaming STT       │◄───────►│ • Twitter/X Sentiment Scraper         │
│ • Neural VAD & Turn-Taking            │ tool.   │ • Reddit Community Consensus Scraper  │
│ • JSON-Schema Tool Router             │ call &  │ • YouTube Video Transcript Extractor  │
│ • Realtime Speech Synthesis (TTS)     │ result  │ • Real-Time Web & News Adapter        │
└──────────────────┬────────────────────┘         └───────────────────────────────────────┘
                   │
                   │ Full Session Transcript & Tool Telemetry
                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   ASSEMBLYAI LeMUR FORENSIC ENGINE                     │
│   • Task Endpoint: https://api.assemblyai.com/lemur/v3/generate/task   │
│   • Generates 1-Page Structured Markdown Briefing & Clickable Sources  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Real-Time Audio & Voice Pipeline

### 2.1 Audio Ingestion Layer
* **Sample Rate:** 16,000 Hz, 16-bit signed Linear PCM, Single-channel (Mono).
* **Frame Chunk Size:** 2048 – 4096 samples (~128ms – 256ms intervals).
* **Client Implementation:** Web Audio API `AudioContext` with `ScriptProcessorNode` / `AudioWorkletNode` streaming binary audio frames over WebSocket to `/api/v1/ws/voice/{session_id}`.

### 2.2 Neural VAD & Turn-Taking
* **Voice Activity Detection:** Powered natively by AssemblyAI's Voice Agent API.
* **Barge-In Handling:** When user speech is detected during agent playback, the server emits an immediate `playback.interrupt` event, silencing the audio player instantly to allow seamless conversational interruption.

---

## 3. Tool Calling & Agent-Reach Engine

### 3.1 Tool Schema Registration
Tools are registered with the Voice Agent API using standard JSON-Schema definitions during session initialization:

```json
{
  "type": "session.update",
  "tools": [
    {
      "name": "search_twitter",
      "description": "Searches Twitter/X for trending reactions, influential tweets, and sentiment.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": { "type": "string", "description": "Search query keywords or hashtags" },
          "focus": { "type": "string", "enum": ["sentiment", "viral", "latest"], "default": "latest" }
        },
        "required": ["query"]
      }
    },
    {
      "name": "search_reddit",
      "description": "Searches Reddit discussions, specific subreddits, community consensus, and complaints.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": { "type": "string", "description": "Search topic" },
          "subreddit": { "type": "string", "description": "Optional target subreddit e.g. 'LocalLLaMA', 'reactjs', 'headphones'" }
        },
        "required": ["query"]
      }
    },
    {
      "name": "search_youtube",
      "description": "Searches YouTube video transcripts and benchmarks for spoken technical takeaways.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": { "type": "string", "description": "Topic or product review query" }
        },
        "required": ["query"]
      }
    },
    {
      "name": "search_web",
      "description": "Performs real-time web search for news articles, release notes, and documentation.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": { "type": "string", "description": "Search query" }
        },
        "required": ["query"]
      }
    }
  ]
}
```

### 3.2 Tool Invocation Lifecycle
1. **Agent Emits `tool.call`:** When the user asks a question requiring external data, AssemblyAI sends:
   ```json
   {
     "type": "tool.call",
     "call_id": "call_12345",
     "name": "search_reddit",
     "arguments": { "query": "Sony XM5 durability issues", "subreddit": "headphones" }
   }
   ```
2. **Backend Executes Search:** The Python FastAPI gateway routes the call to `search_service.py` to retrieve filtered, structured snippets.
3. **Backend Returns `tool.result`:**
   ```json
   {
     "type": "tool.result",
     "call_id": "call_12345",
     "result": {
       "platform": "Reddit",
       "top_posts": [
         {
           "title": "Hinge cracked on my XM5 after 6 months of daily use",
           "upvotes": 420,
           "author": "u/audiophile99",
           "url": "https://reddit.com/r/headphones/comments/xyz",
           "snippet": "The swivel hinge has plastic fatigue. Happened to 3 people in my office."
         }
       ],
       "consensus": "Multiple reports of swivel hinge fragility; sound quality highly praised."
     }
   }
   ```
4. **Agent Speaks Synthesized Audio:** AssemblyAI's LLM reads the structured tool results and synthesizes a concise 2-sentence conversational answer delivered over the audio stream.

---

## 4. AssemblyAI LeMUR Post-Session Structuring Pipeline

When the voice session is completed, the client calls `POST /api/v1/briefing`:
1. The backend aggregates the full multi-turn transcript and all platform tool results.
2. Formats a structured prompt for **AssemblyAI LeMUR** (`/lemur/v3/generate/task`).
3. LeMUR outputs:
   * **Executive Summary:** Crisp 3-bullet takeaway.
   * **Platform Breakdown:** Twitter Sentiment vs. Reddit Consensus vs. YouTube Takeaways.
   * **Verified Citations:** Clickable URLs and author handles.
   * **Actionable Next Steps:** Recommended follow-up questions or actions.

---

## 5. Latency Budget & Performance

| Pipeline Stage | Target Latency | Optimization Technique |
| :--- | :--- | :--- |
| **Speech Ingestion & STT** | ~180ms | Universal-3 Pro WebSocket streaming |
| **Tool Execution (Agent-Reach)** | ~300ms | Async parallel scraping with caching |
| **LLM Reasoning & First Chunk** | ~220ms | Low-temperature streaming completion |
| **Audio Playback (TTS)** | ~150ms | Incremental audio frame streaming |
| **Total Turnaround Time** | **<850ms** | End-to-end sub-second conversational experience |
