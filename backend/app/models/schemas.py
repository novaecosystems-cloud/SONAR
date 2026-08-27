from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class PlatformSource(str, Enum):
    TWITTER = "Twitter"
    REDDIT = "Reddit"
    YOUTUBE = "YouTube"
    WEB = "Web"

class SearchResultItem(BaseModel):
    platform: PlatformSource
    title: str
    author: Optional[str] = None
    url: str
    snippet: str
    upvotes_or_likes: Optional[int] = None
    timestamp_str: Optional[str] = None

class PlatformSearchResponse(BaseModel):
    platform: PlatformSource
    query: str
    results_count: int
    items: List[SearchResultItem]
    sentiment_summary: Optional[str] = None

class VoiceMessage(BaseModel):
    id: str
    speaker: str # "user" | "sonar" | "system"
    text: str
    timestamp: float
    active_platforms: List[PlatformSource] = Field(default_factory=list)
    audio_base64: Optional[str] = None

class SonarTelemetry(BaseModel):
    session_id: str
    timestamp: float
    active_platforms: List[PlatformSource] = Field(default_factory=list)
    total_sources_scanned: int = 0
    latest_query: Optional[str] = None
    latest_response_text: Optional[str] = None
    consensus_sentiment: str = "Neutral / Scanning"
    is_speaking: bool = False

class CitationItem(BaseModel):
    platform: str
    author_or_source: str
    url: str
    quote_or_claim: str

class PlatformBreakdown(BaseModel):
    twitter: Optional[str] = None
    reddit: Optional[str] = None
    youtube: Optional[str] = None
    web: Optional[str] = None

class ExecutiveBriefingResponse(BaseModel):
    session_id: str
    title: str
    generated_at: str
    executive_summary: str
    consensus_score: str
    platform_breakdown: PlatformBreakdown
    key_takeaways: List[str]
    verified_citations: List[CitationItem]
    recommended_next_steps: List[str]
    full_transcript: str
    session_duration_seconds: float

class ExecutiveBriefingRequest(BaseModel):
    session_id: str
    full_transcript: str
    session_duration_seconds: float = 60.0
    collected_sources: Optional[List[Dict[str, Any]]] = None

class SonarScenario(BaseModel):
    id: str
    title: str
    category: str
    initial_spoken_prompt: str
    description: str
    target_platforms: List[PlatformSource]
    simulated_turns: List[Dict[str, Any]]

class BriefingDispatchDestination(str, Enum):
    TELEGRAM = "telegram"
    SLACK = "slack"
    CUSTOM_WEBHOOK = "custom_webhook"

class BriefingDispatchRequest(BaseModel):
    session_id: str
    destination: BriefingDispatchDestination
    target_url_or_token: str
    chat_id: Optional[str] = None
    briefing: Optional[ExecutiveBriefingResponse] = None

class BriefingDispatchResponse(BaseModel):
    success: bool
    destination: str
    message: str
    status_code: Optional[int] = None
    details: Optional[Dict[str, Any]] = None

