import time
import json
import asyncio
from typing import Dict, Any, Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .config import settings
from .models.schemas import (
    SonarTelemetry,
    PlatformSource,
    ExecutiveBriefingRequest,
    ExecutiveBriefingResponse,
    SonarScenario
)
from .models.actions import (
    CodingTaskRequest,
    CodingTaskResponse,
    OutboundCallRequest,
    OutboundCallResponse,
    RideBookingRequest,
    RideBookingResponse,
    FlightSearchRequest,
    FlightSearchResponse
)
from .services.search_service import MultiPlatformSearchService
from .services.agent_orchestrator import SonarAgentOrchestrator
from .services.assemblyai_service import AssemblyAIService
from .services.scenarios_service import ScenariosService
from .services.media_ingestion_service import MediaIngestionService
from .services.webhook_service import WebhookDispatchService
from .services.coding_agent_bridge import CodingAgentBridgeService
from .services.outbound_call_service import OutboundCallService
from .services.travel_ride_service import TravelRideService
from .services.action_dispatcher import ActionDispatcher

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Conversational Voice Agent for Live Internet & Social Intelligence"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Service singletons
search_service = MultiPlatformSearchService()
agent_orchestrator = SonarAgentOrchestrator()
assemblyai_service = AssemblyAIService()
media_service = MediaIngestionService()
webhook_service = WebhookDispatchService()
coding_service = CodingAgentBridgeService()
call_service = OutboundCallService()
travel_service = TravelRideService()
action_dispatcher = ActionDispatcher()

class APIKeyPayload(BaseModel):
    api_key: str

class QueryPayload(BaseModel):
    query: str
    platforms: Optional[list[str]] = None

class MediaAnalyzePayload(BaseModel):
    media_url: str
    question: Optional[str] = "Summarize the core takeaways and debates"

class WebhookDispatchPayload(BaseModel):
    destination: str # "telegram" | "slack" | "custom"
    target_url_or_token: str
    chat_id: Optional[str] = None
    briefing: Dict[str, Any]

class ActionDispatchPayload(BaseModel):
    query: str

@app.get("/")
async def root():
    return {
        "service": settings.PROJECT_NAME,
        "status": "ONLINE",
        "version": settings.VERSION,
        "assemblyai_configured": assemblyai_service.is_configured()
    }

@app.get("/api/v1/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "assemblyai_status": "READY" if assemblyai_service.is_configured() else "STANDBY (Using Fallback Synthesis)",
        "active_adapters": [
            "Twitter/X Live Sentiment Scraper",
            "Reddit Community Consensus Parser",
            "YouTube Video Transcript Extractor",
            "Real-Time Web News Adapter",
            "Podcast & Media Ingestion Engine",
            "Claude Code & Antigravity SWE Bridge",
            "Multilingual Outbound Telephony Dialer",
            "Uber & Rapido Deep Link Ride Engine",
            "Flight Search & Booking Aggregator",
            "Telegram & Slack Dispatch Gateway",
            "AssemblyAI LeMUR Briefing Generator"
        ]
    }

@app.get("/api/v1/scenarios", response_model=list[SonarScenario])
async def get_scenarios():
    """Returns curated demo scenarios for testing."""
    return ScenariosService.get_all()

@app.post("/api/v1/search")
async def run_search(payload: QueryPayload):
    """Direct REST query endpoint for testing search tools."""
    spoken_answer, items, platforms = await agent_orchestrator.execute_voice_turn(payload.query)
    return {
        "spoken_response": spoken_answer,
        "active_platforms": platforms,
        "sources_count": len(items),
        "items": items
    }

@app.post("/api/v1/media/analyze")
async def analyze_media(payload: MediaAnalyzePayload):
    """Analyzes a YouTube video or Podcast audio URL."""
    result = await media_service.analyze_media_url(payload.media_url, payload.question)
    return result

@app.post("/api/v1/briefing", response_model=ExecutiveBriefingResponse)
async def generate_briefing(request: ExecutiveBriefingRequest):
    """Generates 1-page AssemblyAI LeMUR Executive Research Briefing."""
    briefing = await assemblyai_service.generate_lemur_briefing(
        session_id=request.session_id,
        full_transcript=request.full_transcript,
        session_duration_seconds=request.session_duration_seconds,
        collected_sources=request.collected_sources
    )
    return briefing

@app.post("/api/v1/briefing/dispatch")
async def dispatch_briefing(payload: WebhookDispatchPayload):
    """Dispatches executive briefing to Telegram or Slack."""
    result = await webhook_service.dispatch_briefing(
        briefing=payload.briefing,
        destination=payload.destination,
        target_url_or_token=payload.target_url_or_token,
        chat_id=payload.chat_id
    )
    return result

# --- Super-Agent Action Endpoints ---

@app.post("/api/v1/actions/dispatch")
async def dispatch_spoken_action(payload: ActionDispatchPayload):
    """Master voice query action dispatcher."""
    result = await action_dispatcher.execute_spoken_action(payload.query)
    return result

@app.post("/api/v1/actions/code", response_model=CodingTaskResponse)
async def execute_coding_task(payload: CodingTaskRequest):
    """Delegates coding task to Claude Code / Antigravity."""
    return await coding_service.execute_coding_task(payload)

@app.post("/api/v1/actions/call", response_model=OutboundCallResponse)
async def execute_outbound_call(payload: OutboundCallRequest):
    """Executes multilingual appointment booking call."""
    return await call_service.schedule_appointment_call(payload)

@app.post("/api/v1/actions/ride", response_model=RideBookingResponse)
async def book_ride_action(payload: RideBookingRequest):
    """Generates Uber / Rapido deep link and fare estimates."""
    return await travel_service.book_ride(payload)

@app.post("/api/v1/actions/flight", response_model=FlightSearchResponse)
async def search_flights_action(payload: FlightSearchRequest):
    """Searches live airfare rates and flight booking links."""
    return await travel_service.search_flights(payload)

@app.post("/api/v1/settings/api-key")
async def update_api_key(payload: APIKeyPayload):
    """Dynamically set or verify AssemblyAI API key."""
    settings.ASSEMBLYAI_API_KEY = payload.api_key.strip()
    global assemblyai_service
    assemblyai_service = AssemblyAIService(payload.api_key.strip())
    return {
        "success": True,
        "configured": assemblyai_service.is_configured()
    }

@app.websocket("/api/v1/ws/voice/{session_id}")
async def websocket_voice_endpoint(websocket: WebSocket, session_id: str):
    """
    Real-Time WebSocket Gateway for Sonar Super-Agent Voice Loop.
    """
    await websocket.accept()
    session_transcript = ""
    collected_items = []
    
    print(f"[Sonar WebSocket] Client connected session: {session_id}")
    
    try:
        while True:
            message = await websocket.receive()
            
            if "text" in message and message["text"]:
                try:
                    data = json.loads(message["text"])
                    msg_type = data.get("type", "")
                    
                    if msg_type == "user_spoken_query":
                        query_text = data.get("text", "").strip()
                        if query_text:
                            session_transcript += f"\nUser: {query_text}"
                            
                            # Execute master action dispatcher
                            action_result = await action_dispatcher.execute_spoken_action(query_text)
                            spoken_response = action_result.get("spoken_response", "Action completed.")
                            category = action_result.get("category", "social_research")
                            
                            session_transcript += f"\nSonar AI: {spoken_response}"
                            
                            # Send back to client
                            await websocket.send_json({
                                "type": "agent_voice_response",
                                "spoken_text": spoken_response,
                                "action_category": category,
                                "action_data": action_result.get("data"),
                                "full_transcript": session_transcript
                            })
                            
                    elif msg_type == "ping":
                        await websocket.send_json({"type": "pong"})
                        
                except Exception as parse_err:
                    print(f"[Sonar WebSocket] Error processing message: {parse_err}")

    except WebSocketDisconnect:
        print(f"[Sonar WebSocket] Client disconnected session: {session_id}")
    except Exception as e:
        print(f"[Sonar WebSocket] Error in session {session_id}: {e}")
