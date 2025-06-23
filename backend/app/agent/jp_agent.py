import sys
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider
from app.config import settings
from typing import Annotated
from pydantic import BaseModel, Field


class JapaneseReturnModel(BaseModel):
    target_word: Annotated[str, Field(
        description="The japanese word used in input to generate sentence")]
    # translated_word: Annotated[str, Field(
    #     description="target_word translated to English.")]
    target_sentence: Annotated[str, Field(
        description=('Japanese sentence generated that includes target_word, '
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


def generate_word_sentence(word: str) -> JapaneseReturnModel:
    prompt = ('You will be given a word in japanese, for this word, '
              'generate an example sentence in japanese containing the word. '
              'The other words in the sentence should be at maximum N3 level, '
              'to make sure that all other words in the sentence are known. '
              'Put the sentence in a context that is more than trivial, '
              'for example, for the word ペン, do not return the sentence '
              'これはペンです。 Return something more contextual where the '
              'meaning of the word can truly be seen, '
              'for example, for the word ぺん, return something like '
              '彼はペンを使って、手紙を書いた。'
              'Only generate one sentence, meaning that there should exist '
              'only have one 。character, at the end of the sentence. '
              'Also give a translation of the constructed sentence. '
              'In both the generated sentence, and the translated sentence, '
              'make sure to bold the target word'
              f"The word is {word}"
              )
    result = agent.run_sync(prompt)
    return result


if __name__ == '__main__':
    in_word = sys.argv[1]
    result = generate_word_sentence(in_word)
    print(result.output.model_dump_json(indent=2))
    print(type(result.output))
