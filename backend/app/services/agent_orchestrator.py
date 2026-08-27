import asyncio
import re
from typing import List, Dict, Any, Tuple
from ..models.schemas import (
    PlatformSource,
    SearchResultItem,
    PlatformSearchResponse,
    CitationItem
)
from .search_service import MultiPlatformSearchService

class SonarAgentOrchestrator:
    """
    Intelligent agent orchestrator that dynamically parses user voice intent, coordinates
    live multi-platform search tools, and synthesizes bespoke spoken conversational answers
    from real live web and social data.
    """
    def __init__(self):
        self.search_service = MultiPlatformSearchService()

    def route_query_platforms(self, query: str) -> List[PlatformSource]:
        """Dynamically determine which platforms to query based on spoken intent."""
        q_lower = query.lower()
        platforms = []

        if any(w in q_lower for w in ["reddit", "community", "forum", "complain", "opinion", "flaw", "issue", "bug", "user report", "culture", "wlb", "experience", "threads"]):
            platforms.append(PlatformSource.REDDIT)

        if any(w in q_lower for w in ["twitter", "tweet", "viral", "reaction", "elon", "karpathy", "trending", "sentiment", "hot take", "x.com", "influencer"]):
            platforms.append(PlatformSource.TWITTER)

        if any(w in q_lower for w in ["youtube", "video", "review", "benchmark", "unboxing", "test", "fps", "tear down", "clip", "watch"]):
            platforms.append(PlatformSource.YOUTUBE)

        if any(w in q_lower for w in ["news", "official", "release", "doc", "outage", "status", "article", "specs", "paper", "announcement"]):
            platforms.append(PlatformSource.WEB)

        # Default to comprehensive multi-source if general
        if not platforms:
            platforms = [PlatformSource.TWITTER, PlatformSource.REDDIT, PlatformSource.WEB]

        return platforms

    async def execute_voice_turn(self, query: str) -> Tuple[str, List[SearchResultItem], List[PlatformSource]]:
        """
        Runs parallel live platform queries and generates real, dynamic spoken answers.
        """
        platforms = self.route_query_platforms(query)
        tasks = []

        for p in platforms:
            if p == PlatformSource.REDDIT:
                tasks.append(self.search_service.search_reddit(query))
            elif p == PlatformSource.TWITTER:
                tasks.append(self.search_service.search_twitter(query))
            elif p == PlatformSource.YOUTUBE:
                tasks.append(self.search_service.search_youtube(query))
            elif p == PlatformSource.WEB:
                tasks.append(self.search_service.search_web(query))

        results: List[PlatformSearchResponse] = await asyncio.gather(*tasks)

        all_items: List[SearchResultItem] = []
        for r in results:
            all_items.extend(r.items)

        # Generate 100% dynamic conversational spoken synthesis from actual retrieved content
        spoken_response = self._synthesize_spoken_answer(query, results)

        return spoken_response, all_items, platforms

    def _synthesize_spoken_answer(self, query: str, results: List[PlatformSearchResponse]) -> str:
        """
        Synthesizes a 100% dynamic, conversational spoken voice response directly from
        the live retrieved search items.
        """
        platform_names = [r.platform.value for r in results if r.items]
        if not platform_names:
            platform_names = ["live sources"]

        # Collect top live snippets
        snippets: List[str] = []
        titles: List[str] = []
        for r in results:
            for item in r.items[:2]:
                if item.snippet:
                    # Clean snippet text
                    clean = re.sub(r'\s+', ' ', item.snippet).strip()
                    if len(clean) > 20:
                        snippets.append(clean)
                if item.title:
                    titles.append(item.title.strip())

        if not snippets:
            return f"I scanned {', and '.join(platform_names)} for '{query}', but found no active discussions right now. Would you like me to broaden the query?"

        # Extract primary takeaway from top snippet
        primary_snippet = snippets[0]
        # Trim to 1-2 clean sentences
        sentences = [s.strip() for s in re.split(r'[.!?]+', primary_snippet) if len(s.strip()) > 15]
        core_point = sentences[0] if sentences else primary_snippet[:140]

        # Extract secondary viewpoint if available
        secondary_point = ""
        if len(snippets) > 1:
            sec_sentences = [s.strip() for s in re.split(r'[.!?]+', snippets[1]) if len(s.strip()) > 15]
            if sec_sentences:
                secondary_point = f" Meanwhile, other discussions note that {sec_sentences[0]}."

        # Analyze general tone
        combined_text = " ".join(snippets).lower()
        positive_words = sum(1 for w in ["praise", "great", "fast", "love", "impressive", "better", "upgrade", "good", "bullish", "solved", "win"] if w in combined_text)
        negative_words = sum(1 for w in ["issue", "bug", "broken", "complain", "fail", "slow", "fragile", "bad", "bearish", "hate", "flaw", "leak"] if w in combined_text)

        sentiment_prefix = ""
        if positive_words > negative_words + 1:
            sentiment_prefix = "Community sentiment is largely positive: "
        elif negative_words > positive_words + 1:
            sentiment_prefix = "Users are reporting notable concerns: "
        else:
            sentiment_prefix = "Discussions show a nuanced consensus: "

        spoken_answer = (
            f"Across {', and '.join(platform_names)}, {sentiment_prefix}{core_point}.{secondary_point} "
            f"Would you like me to dive deeper into any specific viewpoint or citation?"
        )

        return spoken_answer
