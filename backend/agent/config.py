from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
            env_file=".env",
            env_ignore_empty=True,
            env_nested_delimiter='_'
            )
    GEMINI_API_KEY: str | None = None


settings = Settings()
