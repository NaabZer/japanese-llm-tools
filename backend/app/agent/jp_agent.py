import sys
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider
from app.agent.config import settings
from typing import Annotated
from pydantic import BaseModel, Field


class JapaneseReturnModel(BaseModel):
    target_word: Annotated[str, Field(
        description="Word used in input to generate sentence")]
    translated_word: Annotated[str, Field(
        description="target_word translated to English.")]
    target_sentence: Annotated[str, Field(
        description=('Sentence generated that includes target_word, '
                     'where the target_word is bold.'))]
    translated_sentence: Annotated[str, Field(
        description=('target_sentence translated to English, '
                     'where the english translation is bold.'))]


model = GeminiModel(
    'gemini-2.0-flash',
    provider=GoogleGLAProvider(api_key=settings.GEMINI_API_KEY)
)

system_prompt = (
        'You are a language expert, focused on japanese and english. '
        'Support the user with queries about japanese '
        'and english translation tasks'
        )
agent = Agent(
        model,
        output_type=JapaneseReturnModel,
        system_prompt=system_prompt
        )

if __name__ == '__main__':
    in_word = sys.argv[1]
    prompt = ('You will be given a word in japanese, for this word, '
              'generate an example sentence in japanese containing the word. '
              'The other words in the sentence should be at maximum N3 level, '
              'to make sure that all other words in the sentence are known. '
              'Also give translations of both the sentence and word. '
              f"The word is {in_word}"
              )
    result = agent.run_sync(prompt)
    print(result.output.model_dump_json(indent=2))
    print(type(result.output))
