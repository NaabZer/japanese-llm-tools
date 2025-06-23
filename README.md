# Japanese LLM tools
Small self-hostable web-app that uses LLM's for japanese learning tasks, made to be generate useful [Anki](https://github.com/ankitects/anki)
cards, especially in conjunction with [yomitan](https://github.com/yomidevs/yomitan).

## Tasks

### Sentence Generation
This leverages the power of LLMs to generate sentences for a target word and the target translation.
Specifically created to be able to use [yomitan](https://github.com/yomidevs/yomitan) to 
create sentence mining cards when you only have a target word.

# Running

## Running locally
1. Download the repository.
2. Install docker and docker compose.
3. Copy the `.env.example` file to `.env`, add your gemeni API key to the `GEMINI_API_KEY=` field.
3. Run `docker compose up --build -d`.
4. Access the application at `localhost:8080`, access the API docs at `localhost:8000/docs`

# Todo

- [ ] Add more LLM Providers
    - [ ] OpenAI
    - [ ] Anthropic
    - [ ] Ollama
    - [ ] Groq
    - [ ] Deepseek
    - [ ] Google VertexAI
- [ ] Add conceptual definition generation
- [ ] Add TTS
