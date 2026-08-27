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
from app.services.android_device_agent import AndroidDeviceAgent
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

    print("\n--- [4] Testing Outbound Multilingual Phone Call Bot via Fonoster (Hindi/EN) ---")
    caller = OutboundCallService()
    call_res = await caller.schedule_appointment_call(OutboundCallRequest(
        target_name="Dr. Sharma Dental Clinic",
        phone_number="+91-9876543210",
        appointment_type="Dental Checkup",
        preferred_time="4:00 PM",
        language="hi",
        telephony_provider="fonoster"
    ))
    print(f"Call Status: {call_res.status} | Provider: {call_res.telephony_provider}")
    print(f"Spoken Summary: {call_res.spoken_summary}")
    assert call_res.status == "CONFIRMED"

    print("\n--- [5] Testing On-Device Android App Automator (MakeMyTrip / Uber) ---")
    device = AndroidDeviceAgent()
    device_res = await device.automate_app_action("makemytrip", "Bangalore BLR", "Delhi DEL")
    print(f"App: {device_res.app_name} | Package: {device_res.package_id}")
    print(f"Auto-Install Trigger: {device_res.install_trigger_url}")
    print(f"Universal Intent URL: {device_res.deep_link_intent_url[:60]}...")
    assert len(device_res.execution_steps) == 5

    print("\n--- [6] Testing Ride Booking & Flights (Uber, Rapido, IndiGo) ---")
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

    print("\n--- [7] Testing AssemblyAI LeMUR Executive Briefing ---")
    aai = AssemblyAIService()
    briefing = await aai.generate_lemur_briefing(
        session_id="sonar-super-01",
        full_transcript="User: Check React 19 consensus and call Dr. Sharma\nSonar AI: Done.",
        session_duration_seconds=60.0
    )
    print(f"Briefing Title: {briefing.title}")
    assert len(briefing.key_takeaways) > 0

    print("\n✅ ALL SONAR SUPER-AGENT & DEVICE AUTOMATION SERVICES PASSED 100%!")

if __name__ == "__main__":
    asyncio.run(test_sonar_backend())
