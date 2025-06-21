from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.agent.jp_agent import generate_word_sentence, JapaneseReturnModel


app = FastAPI()

# Configure CORS settings
origins = [
    "http://localhost",
    "http://localhost:5173",
    # "http://127.0.0.1:5173",
    # "http://localhost:8000",
    # "http://your-production-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/jp_sent')
def jp_sent(target_word: str) -> JapaneseReturnModel:
    return generate_word_sentence(target_word).output
