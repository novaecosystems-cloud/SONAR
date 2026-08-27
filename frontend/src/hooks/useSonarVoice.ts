"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface SearchSourceItem {
  platform: string;
  title: string;
  author?: string;
  url: string;
  snippet: string;
  upvotes_or_likes?: number;
}

export function useSonarVoice(backendWsUrl: string = "ws://localhost:8000/api/v1/ws/voice") {
  const [isLive, setIsLive] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);
  const [fullTranscript, setFullTranscript] = useState<string>("");
  const [collectedSources, setCollectedSources] = useState<SearchSourceItem[]>([]);
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [radarStatus, setRadarStatus] = useState<string>("STANDBY");
  const [audioFrequencyData, setAudioFrequencyData] = useState<Uint8Array | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSessionId(`sonar-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`);
  }, []);

  // Timer counter
  useEffect(() => {
    if (isLive) {
      timerRef.current = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLive]);

  // Audio FFT animation loop
  useEffect(() => {
    let animationFrameId: number;
    const updateFrequency = () => {
      if (analyserRef.current && isLive) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        setAudioFrequencyData(dataArray);
      }
      animationFrameId = requestAnimationFrame(updateFrequency);
    };
    if (isLive) {
      updateFrequency();
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLive]);

  const speakText = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha")));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => setIsAgentSpeaking(true);
    utterance.onend = () => setIsAgentSpeaking(false);
    utterance.onerror = () => setIsAgentSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const startVoiceSession = useCallback(async (customSessionId?: string) => {
    try {
      const activeSession = customSessionId || sessionId;
      const wsUrl = `${backendWsUrl}/${activeSession}`;

      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("[Sonar WS] Connected:", wsUrl);
        setRadarStatus("LISTENING");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "radar_update") {
            setActivePlatforms(data.active_platforms || []);
            setRadarStatus("SCANNING_SOCIAL_WEB");
          } else if (data.type === "agent_voice_response") {
            setActivePlatforms(data.active_platforms || []);
            setRadarStatus("SPEAKING_SYNTHESIS");
            
            if (data.sources) {
              setCollectedSources((prev) => [...data.sources, ...prev]);
            }
            if (data.full_transcript) {
              setFullTranscript(data.full_transcript);
            }
            if (data.spoken_text) {
              speakText(data.spoken_text);
            }
          }
        } catch (e) {
          console.error("[Sonar WS] Error parsing message:", e);
        }
      };

      // Request microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      source.connect(analyser);

      // Speech Recognition (Web Speech API)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          // Barge-in: Mute agent speech immediately if user starts speaking
          if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsAgentSpeaking(false);
          }

          const lastResult = event.results[event.results.length - 1];
          if (lastResult.isFinal) {
            const spokenText = lastResult[0].transcript.trim();
            console.log("[User Spoke]:", spokenText);
            
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: "user_spoken_query",
                text: spokenText
              }));
            }
          }
        };

        recognition.onerror = (e: any) => {
          console.warn("[SpeechRecognition] error:", e.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      setIsLive(true);
      setSessionDuration(0);
    } catch (err) {
      console.error("[useSonarVoice] Error:", err);
      alert("Microphone access is required for Sonar AI voice research.");
    }
  }, [backendWsUrl, sessionId, speakText]);

  const stopVoiceSession = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setIsLive(false);
    setIsAgentSpeaking(false);
    setRadarStatus("STANDBY");
  }, []);

  const sendDirectQuery = useCallback((queryText: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsAgentSpeaking(false);
    }
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: "user_spoken_query",
        text: queryText
      }));
    }
  }, []);

  return {
    isLive,
    isAgentSpeaking,
    sessionId,
    activePlatforms,
    fullTranscript,
    collectedSources,
    sessionDuration,
    radarStatus,
    audioFrequencyData,
    startVoiceSession,
    stopVoiceSession,
    sendDirectQuery,
    setFullTranscript,
    setCollectedSources
  };
}
