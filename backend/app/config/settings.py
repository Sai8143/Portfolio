import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str = "Sai Ganesh Portfolio API"

    API_VERSION: str = "v1"

    DATABASE_URL: str = (
        "sqlite:////tmp/portfolio.db"
        if os.environ.get("VERCEL")
        else "sqlite:///portfolio.db"
    )

    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        env_file = ".env"


settings = Settings()