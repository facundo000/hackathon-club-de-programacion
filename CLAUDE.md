# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BoardMatch** — a social platform for board game players to connect, create game tables, and find matches by taste and location.

The repo has two independent apps:
- `backend/` — Node.js/Express REST API with MongoDB
- `front/` — React SPA with Tailwind CSS

## Commands

### Backend
```bash
cd backend
npm start          # start server (port 3000 by default)
npm run seed       # seed database
npm run seed:games # seed only game data
```

### Frontend
```bash
cd front
npm start          # dev server
npm run build      # production build
npm test           # run tests (React Testing Library / Jest)
npm test -- --testPathPattern=<file>  # run a single test file
```

## Backend Architecture

**Entry point:** `backend/index.js` — connects to MongoDB then starts Express. All API routes are mounted under `/api`.

**Layer pattern:** Routes → Controllers → Services → Models (Mongoose)

- `src/routes/index.js` — aggregates all sub-routers
- `src/middlewares/auth.middleware.js` — JWT Bearer token verification; attaches `req.user = { id, username }`
- `src/services/` — business logic lives here; controllers are thin wrappers
- `src/models/` — Mongoose schemas

**Key models:**
- `User` — username, email, bcrypt password, followers/following (self-ref), `library` (ref Game), favoriteCategories, location
- `Game` — board game catalog (name, categories, minPlayers/maxPlayers, duration, complexity 1–5)
- `Forum` — community spaces with creator + members
- `Post` — forum posts
- `Event` — game events/sessions
- `Subscription` — user subscriptions
- `UserStats` — per-user statistics

**Special feature:** `src/services/pdfRules.service.js` reads board game rule PDFs from `backend/pdfs/` and summarizes them via OpenAI API.

**Required env vars** (create `backend/.env`):
```
MONGO_URI=mongodb://localhost:27017/hackaton
PORT=3000
JWT_SECRET=your_secret
OpenAiApiKey=your_openai_key
OpenAiModel=gpt-4o-mini   # optional, defaults to gpt-4o-mini
```

## Frontend Architecture

Single-page app currently showing only auth views (`login` / `register`), toggled via `authView` state in `App.js`.

**Pattern:** UI components in `src/components/` are presentational; form logic lives in custom hooks in `src/hooks/`.

- `useLoginForm` / `useRegisterForm` — manage field state, validation (email regex, password ≥ 8 chars), and submit handler
- Styling: Tailwind utility classes throughout; no CSS modules

**Note:** The frontend login/register forms are not yet wired to the backend — submit handlers currently `console.log` the payload.
