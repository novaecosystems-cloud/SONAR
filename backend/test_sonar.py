import asyncio
from app.services.search_service import MultiPlatformSearchService
from app.services.agent_orchestrator import SonarAgentOrchestrator
from app.services.assemblyai_service import AssemblyAIService
from app.services.scenarios_service import ScenariosService
from app.services.media_ingestion_service import MediaIngestionService
from app.services.webhook_service import WebhookDispatchService
from app.services.coding_agent_bridge import CodingAgentBridgeService
from app.services.outbound_call_service import OutboundCallService
from app.services.travel_ride_service import TravelRideService
from app.services.action_dispatcher import ActionDispatcher
from app.models.actions import CodingTaskRequest, OutboundCallRequest, RideBookingRequest, FlightSearchRequest

async def test_sonar_backend():
    print("--- [1] Testing Multi-Platform Search Service ---")
    search = MultiPlatformSearchService()
    reddit_res = await search.search_reddit("React 19 compiler", subreddit="reactjs")
    print(f"Reddit items count: {reddit_res.results_count} on '{reddit_res.query}'")
    assert reddit_res.results_count > 0

    twitter_res = await search.search_twitter("Nvidia Blackwell GPU")
    print(f"Twitter items count: {twitter_res.results_count} on '{twitter_res.query}'")
    assert twitter_res.results_count > 0

    print("\n--- [2] Testing Media Ingestion Service ---")
    media = MediaIngestionService()
    media_res = await media.analyze_media_url("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "Summarize the key points")
    print(f"Media Title: {media_res.get('media_title')}")
    assert media_res.get("success") is True

    print("\n--- [3] Testing Coding Agent Bridge (Claude Code / Antigravity) ---")
    coding = CodingAgentBridgeService()
    code_res = await coding.execute_coding_task(CodingTaskRequest(
        agent_type="claude_code",
        instruction="Fix the auth session leak in backend"
    ))
    print(f"Coding Task Status: {code_res.status} | Branch: {code_res.git_branch}")
    assert code_res.status == "COMPLETED"

    print("\n--- [4] Testing Outbound Multilingual Phone Call Bot (Hindi/EN) ---")
    caller = OutboundCallService()
    call_res = await caller.schedule_appointment_call(OutboundCallRequest(
        target_name="Dr. Sharma Dental Clinic",
        phone_number="+91-9876543210",
        appointment_type="Dental Checkup",
        preferred_time="4:00 PM",
        language="hi"
    ))
    print(f"Call Status: {call_res.status} | Language: {call_res.detected_language}")
    print(f"Spoken Summary: {call_res.spoken_summary}")
    assert call_res.status == "CONFIRMED"

    print("\n--- [5] Testing Ride Booking & Flights (Uber, Rapido, IndiGo) ---")
    travel = TravelRideService()
    ride_res = await travel.book_ride(RideBookingRequest(
        provider="uber",
        pickup_location="Connaught Place",
        destination="DEL Airport",
        ride_type="comfort"
    ))
    print(f"Uber Deep Link: {ride_res.deep_link_url} | Fare: ₹{ride_res.estimated_fare_inr}")
    assert "uber://" in ride_res.deep_link_url

    flight_res = await travel.search_flights(FlightSearchRequest(
        origin="DEL",
        destination="BLR",
        departure_date="2026-09-04"
    ))
    print(f"Cheapest Flight: {flight_res.recommended_flight.airline} at ₹{flight_res.cheapest_price_inr}")
    assert len(flight_res.all_flights) > 0

    print("\n--- [6] Testing Action Dispatcher Master Router ---")
    dispatcher = ActionDispatcher()
    dispatched_code = await dispatcher.execute_spoken_action("tell claude code to fix the auth leak")
    print(f"Dispatched Category: {dispatched_code.get('category')}")
    assert dispatched_code.get("category") == "coding_agent"

    dispatched_call = await dispatcher.execute_spoken_action("call dr sharma clinic in hindi")
    print(f"Dispatched Category: {dispatched_call.get('category')}")
    assert dispatched_call.get("category") == "outbound_call"

    print("\n--- [7] Testing AssemblyAI LeMUR Executive Briefing ---")
    aai = AssemblyAIService()
    briefing = await aai.generate_lemur_briefing(
        session_id="sonar-super-01",
        full_transcript="User: Check React 19 consensus and call Dr. Sharma\nSonar AI: Done.",
        session_duration_seconds=60.0
    )
    print(f"Briefing Title: {briefing.title}")
    assert len(briefing.key_takeaways) > 0

    print("\n✅ ALL SONAR SUPER-AGENT SERVICES (SEARCH, CODING, CALLS, RIDES, FLIGHTS, LEMUR) PASSED 100%!")

if __name__ == "__main__":
    asyncio.run(test_sonar_backend())
