from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ActionCategory(str, Enum):
    CODING_AGENT = "coding_agent"
    OUTBOUND_CALL = "outbound_call"
    RIDE_BOOKING = "ride_booking"
    FLIGHT_SEARCH = "flight_search"
    SOCIAL_RESEARCH = "social_research"

class CodingTaskRequest(BaseModel):
    agent_type: str = "claude_code" # "claude_code" | "antigravity" | "copilot"
    instruction: str
    target_repo: Optional[str] = "main-backend"
    auto_pr: bool = True

class CodingTaskResponse(BaseModel):
    task_id: str
    agent_type: str
    status: str # "COMPLETED" | "EXECUTING" | "FAILED"
    files_modified: List[str]
    git_branch: str
    summary: str
    test_results: str

class OutboundCallRequest(BaseModel):
    target_name: str # e.g. "Dr. Sharma Dental Clinic", "Apex Auto Mechanic"
    phone_number: str
    appointment_type: str # e.g. "Dental Checkup", "Oil Change", "Haircut"
    preferred_time: str
    language: str = "en" # "en" | "hi" | "es"
    user_name: str = "Shourya"
    telephony_provider: str = "fonoster" # "fonoster" (Open-Source) | "twilio"

class OutboundCallResponse(BaseModel):
    call_id: str
    target_name: str
    phone_number: str
    status: str # "CONFIRMED" | "IN_PROGRESS" | "BUSY"
    telephony_provider: str
    detected_language: str
    conversation_transcript: List[Dict[str, str]]
    confirmed_slot: Optional[str] = None
    calendar_event_created: bool = True
    spoken_summary: str

class RideBookingRequest(BaseModel):
    provider: str = "uber" # "uber" | "rapido"
    pickup_location: str
    destination: str
    ride_type: str = "comfort" # "auto" | "bike" | "comfort" | "premier"

class RideBookingResponse(BaseModel):
    provider: str
    pickup: str
    destination: str
    estimated_fare_inr: float
    estimated_arrival_mins: int
    deep_link_url: str
    spoken_confirmation: str

class FlightSearchRequest(BaseModel):
    origin: str
    destination: str
    departure_date: str
    passengers: int = 1

class FlightOption(BaseModel):
    airline: str
    flight_number: str
    departure_time: str
    arrival_time: str
    duration: str
    price_inr: float
    stops: str
    booking_url: str

class FlightSearchResponse(BaseModel):
    origin: str
    destination: str
    date: str
    total_options_found: int
    cheapest_price_inr: float
    recommended_flight: FlightOption
    all_flights: List[FlightOption]
    spoken_summary: str
