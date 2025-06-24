from enum import Enum
from fastapi import APIRouter
from app.agent.jp_agent import generate_word_sentence, JapaneseReturnModel


class Language(str, Enum):
    Japanese = 'japanese'
    Swedish = 'swedish'


router = APIRouter(prefix='/sentences', tags=['sentences'])


@router.get('/get_example')
def get_example(
        target_word: str,
        target_language: Language
        ) -> JapaneseReturnModel:
    return generate_word_sentence(target_word).output
