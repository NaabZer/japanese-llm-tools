from enum import Enum
from fastapi import APIRouter, HTTPException
from app.agent.common import SentenceReturnModel
from app.agent import jp_agent, swe_agent


class Language(str, Enum):
    Japanese = 'japanese'
    Swedish = 'swedish'


router = APIRouter(prefix='/sentences', tags=['sentences'])


@router.get('/get_example')
def get_example(
        target_word: str,
        target_language: Language
        ) -> SentenceReturnModel:
    if target_language == Language.Japanese:
        return jp_agent.generate_word_sentence(target_word).output
    elif target_language == Language.Swedish:
        return swe_agent.generate_word_sentence(target_word).output
    else:
        raise HTTPException(status_code=404, detail="Language not found")
