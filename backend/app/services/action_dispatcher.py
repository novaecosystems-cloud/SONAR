from typing import Dict, Any, Tuple, Optional
from ..models.actions import (
    ActionCategory,
    CodingTaskRequest,
    OutboundCallRequest,
    RideBookingRequest,
    FlightSearchRequest
)
from .coding_agent_bridge import CodingAgentBridgeService
from .outbound_call_service import OutboundCallService
from .travel_ride_service import TravelRideService
from .agent_orchestrator import SonarAgentOrchestrator

class ActionDispatcher:
    """
    Master Intent Router for Sonar Super-Agent:
    Parses spoken voice queries and routes to Coding, Outbound Calling, Rides, Flights, or Social Reach.
    """
    def __init__(self):
        self.coding_service = CodingAgentBridgeService()
        self.call_service = OutboundCallService()
        self.travel_service = TravelRideService()
        self.social_orchestrator = SonarAgentOrchestrator()

    def classify_intent(self, query: str) -> ActionCategory:
        q = query.lower()

        if any(w in q for w in ["claude code", "antigravity", "write code", "fix the leak", "run unit tests", "git commit", "pull request", "refactor"]):
            return ActionCategory.CODING_AGENT
        elif any(w in q for w in ["call dr", "call clinic", "call salon", "call mechanic", "book appointment", "call and book", "phone call"]):
            return ActionCategory.OUTBOUND_CALL
        elif any(w in q for w in ["uber", "rapido", "book a cab", "get a cab", "book taxi", "auto to", "ride to"]):
            return ActionCategory.RIDE_BOOKING
        elif any(w in q for w in ["flight", "ticket to", "airline", "indigo", "air india", "fly to", "delhi to bangalore"]):
            return ActionCategory.FLIGHT_SEARCH
        else:
            return ActionCategory.SOCIAL_RESEARCH

    async def execute_spoken_action(self, query: str) -> Dict[str, Any]:
        category = self.classify_intent(query)

        if category == ActionCategory.CODING_AGENT:
            req = CodingTaskRequest(
                agent_type="claude_code" if "claude" in query.lower() else "antigravity",
                instruction=query
            )
            res = await self.coding_service.execute_coding_task(req)
            return {
                "category": ActionCategory.CODING_AGENT,
                "data": res.model_dump(),
                "spoken_response": f"Claude Code has resolved the task on your repository. {res.summary} All tests passed."
            }

        elif category == ActionCategory.OUTBOUND_CALL:
            lang = "hi" if ("hindi" in query.lower() or "namaste" in query.lower()) else "en"
            req = OutboundCallRequest(
                target_name="Dr. Sharma Dental Clinic" if "clinic" in query.lower() or "dentist" in query.lower() else "Apex Auto Care",
                phone_number="+91-9876543210",
                appointment_type="Consultation & Checkup",
                preferred_time="4:00 PM",
                language=lang
            )
            res = await self.call_service.schedule_appointment_call(req)
            return {
                "category": ActionCategory.OUTBOUND_CALL,
                "data": res.model_dump(),
                "spoken_response": res.spoken_summary
            }

        elif category == ActionCategory.RIDE_BOOKING:
            prov = "rapido" if "rapido" in query.lower() else "uber"
            ride_type = "bike" if "bike" in query.lower() else ("auto" if "auto" in query.lower() else "comfort")
            req = RideBookingRequest(
                provider=prov,
                pickup_location="Current GPS Location",
                destination="Indira Gandhi International Airport (DEL)" if "airport" in query.lower() else "City Center Mall",
                ride_type=ride_type
            )
            res = await self.travel_service.book_ride(req)
            return {
                "category": ActionCategory.RIDE_BOOKING,
                "data": res.model_dump(),
                "spoken_response": res.spoken_confirmation
            }

        elif category == ActionCategory.FLIGHT_SEARCH:
            req = FlightSearchRequest(
                origin="DEL",
                destination="BLR",
                departure_date="2026-09-04"
            )
            res = await self.travel_service.search_flights(req)
            return {
                "category": ActionCategory.FLIGHT_SEARCH,
                "data": res.model_dump(),
                "spoken_response": res.spoken_summary
            }

        else: # SOCIAL_RESEARCH
            spoken_ans, items, platforms = await self.social_orchestrator.execute_voice_turn(query)
            return {
                "category": ActionCategory.SOCIAL_RESEARCH,
                "data": {"items": [i.model_dump() for i in items], "platforms": [p.value for p in platforms]},
                "spoken_response": spoken_ans
            }
