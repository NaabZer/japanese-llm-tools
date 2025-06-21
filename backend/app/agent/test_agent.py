from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider
from app.agent.config import settings

print(settings.GEMINI_API_KEY)

model = GeminiModel(
    'gemini-2.0-flash',
    provider=GoogleGLAProvider(api_key=settings.GEMINI_API_KEY)
)
agent = Agent(model)

if __name__ == '__main__':
    result = agent.run_sync('Hi, can you list five random citites?')
    print(result.output)
    print(result.usage())
