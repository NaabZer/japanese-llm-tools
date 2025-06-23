from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import sentences
from app.config import settings

app = FastAPI()


if settings.ENVIRONMENT == 'local':
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    origins = [
        settings.HOSTNAME,
        settings.FRONT_END_HOSTNAME
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(sentences.router)
