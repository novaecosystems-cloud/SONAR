from typing import List, Optional
from ..models.schemas import SonarScenario, PlatformSource

class ScenariosService:
    """
    Curated high-impact live demo scenarios for hackathon judges and users.
    """
    SCENARIOS: List[SonarScenario] = [
        SonarScenario(
            id="sc-react19",
            title="React 19 Compiler Consensus",
            category="Developer Tooling",
            initial_spoken_prompt="What are developers on Reddit and Twitter saying about the new React 19 compiler?",
            description="Scans r/reactjs and developer Twitter to extract consensus on automatic memoization, migration friction, and third-party library compatibility.",
            target_platforms=[PlatformSource.REDDIT, PlatformSource.TWITTER, PlatformSource.WEB],
            simulated_turns=[
                {
                    "speaker": "user",
                    "text": "What are developers on Reddit and Twitter saying about the new React 19 compiler?",
                    "offset_sec": 1.0
                },
                {
                    "speaker": "sonar",
                    "text": "Developers on Reddit r/reactjs praise the automatic memoization compiler for eliminating useMemo boilerplate, though several maintainers on Twitter warn about third-party library compatibility. Would you like me to dive into the specific migration gotchas?",
                    "offset_sec": 3.5,
                    "platforms": ["Reddit", "Twitter"]
                }
            ]
        ),
        SonarScenario(
            id="sc-nvidia",
            title="Nvidia Earnings Market Pulse",
            category="Finance & Tech Markets",
            initial_spoken_prompt="What is the reaction on Twitter and WallStreetBets to Nvidia's earnings call from yesterday?",
            description="Real-time sentiment cross-examination on data center revenue beats, Blackwell GPU supply constraints, and retail vs institutional sentiment.",
            target_platforms=[PlatformSource.TWITTER, PlatformSource.REDDIT, PlatformSource.WEB],
            simulated_turns=[
                {
                    "speaker": "user",
                    "text": "What is the reaction on Twitter and WallStreetBets to Nvidia's earnings call from yesterday?",
                    "offset_sec": 1.0
                },
                {
                    "speaker": "sonar",
                    "text": "Twitter sentiment is overwhelmingly bullish following Nvidia's data center revenue beat, while discussions on WallStreetBets are debating valuation multiples and Blackwell chip shipment timelines. Should I pull up the top analyst price targets?",
                    "offset_sec": 3.5,
                    "platforms": ["Twitter", "Reddit"]
                }
            ]
        ),
        SonarScenario(
            id="sc-sonyxm5",
            title="Sony XM5 Durability Audit",
            category="Consumer Hardware",
            initial_spoken_prompt="Are there common durability issues with the Sony XM5 headphones according to Reddit r/headphones?",
            description="Searches Reddit forums and YouTube teardowns for hidden product defects, hinge failure rates, and top recommended alternatives.",
            target_platforms=[PlatformSource.REDDIT, PlatformSource.YOUTUBE, PlatformSource.WEB],
            simulated_turns=[
                {
                    "speaker": "user",
                    "text": "Are there common durability issues with the Sony XM5 headphones according to Reddit r/headphones?",
                    "offset_sec": 1.0
                },
                {
                    "speaker": "sonar",
                    "text": "Reddit community reviews praise the active noise cancellation, but multiple threads on r/headphones report fragility issues with the headband swivel hinge cracking after several months. Would you like me to check the top recommended alternatives like the Bose QC Ultra?",
                    "offset_sec": 3.5,
                    "platforms": ["Reddit", "YouTube"]
                }
            ]
        ),
        SonarScenario(
            id="sc-stripe",
            title="Stripe Engineering Culture Review",
            category="Career & Workplace",
            initial_spoken_prompt="What are employees on Reddit and Blind saying about Stripe's engineering culture and work-life balance?",
            description="Extracts insider feedback from Reddit r/cscareerquestions regarding Stripe's engineering velocity, compensation bands, and on-call rotations.",
            target_platforms=[PlatformSource.REDDIT, PlatformSource.WEB],
            simulated_turns=[
                {
                    "speaker": "user",
                    "text": "What are employees on Reddit and Blind saying about Stripe's engineering culture and work-life balance?",
                    "offset_sec": 1.0
                },
                {
                    "speaker": "sonar",
                    "text": "Discussions on Reddit describe Stripe's engineering culture as high-velocity and intellectually rigorous, though some team threads mention increased on-call rotation pressure following recent re-orgs. Would you like me to look into compensation bands or interview prep tips?",
                    "offset_sec": 3.5,
                    "platforms": ["Reddit", "Web"]
                }
            ]
        ),
        SonarScenario(
            id="sc-cloudflare",
            title="Cloudflare Live Outage Check",
            category="Infrastructure & DevOps",
            initial_spoken_prompt="Is Cloudflare having an outage right now? Check what users on Twitter and Reddit are reporting.",
            description="Cross-references user error reports on Twitter and Reddit against official Cloudflare status pages for real-time downtime verification.",
            target_platforms=[PlatformSource.TWITTER, PlatformSource.REDDIT, PlatformSource.WEB],
            simulated_turns=[
                {
                    "speaker": "user",
                    "text": "Is Cloudflare having an outage right now? Check what users on Twitter and Reddit are reporting.",
                    "offset_sec": 1.0
                },
                {
                    "speaker": "sonar",
                    "text": "Real-time posts on Twitter and Reddit indicate elevated error rates for DNS routing in the US-East region, though Cloudflare's official status page reports all core edge systems operational. Should I keep monitoring live reports for updates?",
                    "offset_sec": 3.5,
                    "platforms": ["Twitter", "Reddit", "Web"]
                }
            ]
        )
    ]

    @classmethod
    def get_all(cls) -> List[SonarScenario]:
        return cls.SCENARIOS

    @classmethod
    def get_by_id(cls, scenario_id: str) -> Optional[SonarScenario]:
        for s in cls.SCENARIOS:
            if s.id == scenario_id:
                return s
        return None
