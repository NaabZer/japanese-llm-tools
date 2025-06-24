import sys
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider
from app.config import settings
from app.agent.common import SentenceReturnModel


model = GeminiModel(
    'gemini-2.0-flash',
    provider=GoogleGLAProvider(api_key=settings.GEMINI_API_KEY)
)

system_prompt = (
        'You are a language expert, focused on swedish and english. '
        'Support the user with queries about swedish '
        'and english translation tasks'
        )
agent = Agent(
        model,
        output_type=SentenceReturnModel,
        system_prompt=system_prompt
        )


def generate_word_sentence(word: str) -> SentenceReturnModel:
    prompt = ('You will be given a word in swedish, for this word, '
              'generate an example sentence in swedish containing the word. '
              'The other words in the sentence should be at maximum A2 level, '
              'to make sure that all other words in the sentence are known. '
              'Put the sentence in a context that is more than trivial, '
              'for example, for the word penna, do not return the sentence '
              '"Detta är en penna." '
              'Return something more contextual where the '
              'meaning of the word can truly be seen, '
              'for example, for the word "penna", return something like '
              'Han skriver en bok med sin penna.'
              'Only generate one sentence, meaning that there should exist '
              'only have one "." character, at the end of the sentence. '
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
