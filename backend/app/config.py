import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Sonar AI - Conversational Voice Super-Agent"
    VERSION: str = "1.1.0"
    API_V1_STR: str = "/api/v1"
    
    # AssemblyAI Configuration
    ASSEMBLYAI_API_KEY: str = os.getenv("ASSEMBLYAI_API_KEY", "da482a19c203488dbb2ab49ae743eda5")
    
    # Open-Source Telephony Configuration (Fonoster)
    FONOSTER_ENDPOINT: str = os.getenv("FONOSTER_ENDPOINT", "api.fonoster.com:443")
    FONOSTER_ACCESS_KEY_ID: str = os.getenv("FONOSTER_ACCESS_KEY_ID", "WO00000000000000000000000000000000")
    FONOSTER_API_KEY: str = os.getenv("FONOSTER_API_KEY", "fonoster-secret-key")
    DEFAULT_TELEPHONY_PROVIDER: str = "fonoster" # "fonoster" (Open-Source) | "twilio"
    
    # Server settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "*"
    ]

settings = Settings()
