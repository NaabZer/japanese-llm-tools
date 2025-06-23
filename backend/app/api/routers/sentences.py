from fastapi import APIRouter
from app.agent.jp_agent import generate_word_sentence, JapaneseReturnModel


router = APIRouter(prefix='/sentences', tags=['sentences'])


@router.get('/get_example')
def get_example(target_word: str) -> JapaneseReturnModel:
    return generate_word_sentence(target_word).output
