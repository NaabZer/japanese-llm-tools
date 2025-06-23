from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
            env_file=".env",
            env_ignore_empty=True,
            env_nested_delimiter='_'
            )
    GEMINI_API_KEY: str | None = None
    ENVIRONMENT: Literal["local", "staging", "production", "test"] = "local"
    HOSTNAME: str = "http://localhost:8000"
    FRONT_END_HOSTNAME: str = "http://localhost:3000"


settings = Settings()
