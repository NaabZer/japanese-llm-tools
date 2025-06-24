from typing import Annotated
from pydantic import BaseModel, Field


class SentenceReturnModel(BaseModel):
    target_word: Annotated[str, Field(
        description="The Swedish word used in input to generate sentence")]
    # translated_word: Annotated[str, Field(
    #     description="target_word translated to English.")]
    target_sentence: Annotated[str, Field(
        description=('Swedish sentence generated that includes target_word, '
                     'where the target_word is bold.'))]
    translated_sentence: Annotated[str, Field(
        description=('target_sentence translated to English, '
                     'where the english translation is bold.'))]
