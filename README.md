# Portfolio App

A full-stack personal portfolio and professional platform for Ikageng Sebesho — an aspiring AI Infrastructure & Platform Engineer. The site serves as a living digital résumé: a structured showcase of background, skills, projects, and experience, complemented by **Skikszilcho**, an AI assistant that can answer questions about Ikageng in real time.

**Live site:** [skikszilcho.github.io/Portfolio-App-FullStack](https://skikszilcho.github.io/Portfolio-App-FullStack/)

---

## The Problem

A static résumé or a bare portfolio page demands that a recruiter already know what they are looking for. Most do not read portfolios in full — they scan, they infer, and they move on. The questions that would tip the scales ("Has he worked with X?" / "Can he explain how Y works?") often go unasked.

Skikszilcho exists to close that gap. Rather than hoping a recruiter reads the right section at the right time, the assistant answers their specific questions directly — about skills, experience, projects, availability, and anything else relevant to a hiring decision — without requiring Ikageng to be present. For a candidate who cannot yet rely on a long list of job titles, a platform that actively advocates is a meaningful differentiator.

Beyond the recruiter interaction, the portfolio itself demonstrates what Ikageng builds: a system with a real backend, a layered API-abuse defence, a pluggable LLM adapter, structured observability, and a deployment architecture spanning two cloud platforms. It is not a showcase of intent — it is evidence of execution.

---

## Architecture

```
                    Visitor (Browser)
                          │
               ┌──────────┴──────────┐
               │                     │
        Frontend (React)        Skikszilcho Widget
        (Azure Static Web Apps) (ChatBubble → ChatPanel)
               │                     │
               └──────────┬──────────┘
                          │  POST /api/chat  (Vite Proxy in dev / nginx in prod)
                          ▼
                  Backend (Node.js / Express)
                  (Google Cloud Run)
                          │
              ┌───────────┼───────────┐
              │           │           │
         Quota Guard  LLM Adapter  Monitoring
         (SQLite +    (Gemini /    (Axiom)
         Rate Limit)  OpenAI stub)
                          │
                    LLM Provider
                    (Google Gemini)
```

The frontend and backend are independently deployable. In production, the frontend is a static build served from Azure's CDN; the backend is a containerised Express application running on Google Cloud Run. They communicate over HTTPS with CORS scoped to the frontend origin.

---

## Key Engineering Decisions

### LLM Adapter Pattern

The backend never calls a LLM provider directly from a route handler. Every provider is wrapped behind a `BaseLLMAdapter` with a single `chat(messages, systemPrompt) → string` interface. The active provider is selected at startup from the `LLM_PROVIDER` environment variable.

```
backend/src/adapters/llm/
├── base.adapter.js          ← abstract interface
├── gemini.adapter.js        ← active (Google Gemini 1.5 Flash)
├── openai.adapter.js        ← stub (ready to implement)
└── local-agent.adapter.js   ← stub (future: local self-hosted model)
```

**Why Gemini 1.5 Flash:** Free tier with 15 RPM / 1,500 RPD and a 1M token context window. At portfolio traffic levels, the free tier is never the constraint — the Quota Guard is. Swapping to OpenAI or a self-hosted model requires only implementing the stub adapter and setting one environment variable.

**Trade-off accepted:** Gemini's message format (`parts`) differs from the OpenAI standard (`content`). The adapter translates the canonical `{role, content}[]` format internally, keeping that complexity contained and invisible to the rest of the system.

### Quota Guard — Layered API Abuse Defence

The Gemini API key operates on a free tier with hard daily and per-minute limits. A single automated client or a tab left open in a loop is enough to exhaust the daily budget. Three independent layers enforce protection:

| Layer | Mechanism | What it guards |
|---|---|---|
| Session Cap | Client-side; 10 messages per browser session | UX signal; prevents accidental runaway usage |
| IP Rate Limit | `express-rate-limit`; 20 req / 15 min per IP | Network-level guard; resets on restart |
| Quota Guard | SQLite (`better-sqlite3`); RPM / TPM / RPD / per-session | Persistent, multi-dimensional; survives deploys |

**Why SQLite and not Redis:** Redis is the correct choice for distributed rate limiting across multiple nodes. For a single-process personal portfolio, the operational overhead of a separate Redis service is not justified. SQLite is a single file, zero network hops, and persists across server restarts. The quota store sits behind a clean seam (`quota.store.js`) — the only file that changes if horizontal scaling is ever needed.

**Session fingerprinting:** The frontend generates a UUIDv4 `sessionId` in `localStorage` and sends it as `X-Session-Id` on every request. The backend combines `sessionId + hashed IP` as the session key. A page reload does not grant fresh quota. A VPN change does not bypass the session record. Raw IPs are never stored.

### Skikszilcho — System Prompt as Content, Not Code

Skikszilcho's persona, knowledge, rules, and tone are defined entirely in a Markdown file (`backend/src/prompts/skikszilcho-system-prompt.md`), loaded at server startup and injected as the first message in every chat request. Editing the assistant's behaviour requires no code change — only a content edit.

The backend is stateless with respect to conversation history. The frontend owns the full message array and sends it with every request. A chat session ends when the tab is closed or the page is refreshed.

### Hosting Architecture

| Component | Platform | Rationale |
|---|---|---|
| Frontend | Azure Static Web Apps (free tier) | Global CDN; CI/CD from GitHub Actions; no expiry |
| Backend | Google Cloud Run (free tier) | Always-free (not 12-month trial); scales to zero; container-native |
| CV Storage | Cloudflare R2 | Zero egress fees; 10 GB free; backend generates signed URLs |
| Monitoring | Axiom | Structured event ingestion; free tier sufficient for portfolio traffic |

Two cloud providers means two sets of credentials and two billing dashboards. That cost was accepted because each platform provides distinct learning surface — Azure for frontend/CDN workflows, GCP for container and serverless infrastructure — which is directly relevant to the target role.

**Cold-start mitigation:** Cloud Run scales to zero between visits. On page load, the frontend fires a silent `GET /api/health` to wake the backend before the visitor interacts with Skikszilcho. If the health check fails, the widget shows a "Waking up…" state with a retry. Neither state blocks the rest of the portfolio.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS Modules (per-section files) + CSS variables |
| Backend | Node.js + Express |
| LLM Provider | Google Gemini (`gemini-1.5-flash`) |
| Quota Persistence | SQLite (`better-sqlite3`) |
| Monitoring | Axiom |
| CV Storage | Cloudflare R2 |
| Email Relay | Nodemailer + Gmail SMTP |
| Containerisation | Docker + Docker Compose |
| Hosting | Azure Static Web Apps (frontend) + Google Cloud Run (backend) |

---

## Deployment Phases

| Phase | Description | Status |
|---|---|---|
| A | GitHub Pages static deployment; chatbot in "coming soon" state | ✅ Live |
| B | Backend deployed to Render; chatbot goes live | ⬜ Next |
| C | Full production: Azure Static Web Apps + Google Cloud Run + Dockerfiles + contact form + CV download | ⬜ Planned |

---

## Repository Layout

```
Portfolio-App/
├── .github/workflows/deploy.yml   ← GitHub Actions — builds frontend, deploys to Pages
├── frontend/
│   ├── public/
│   │   └── projects.json          ← Project card data — edit this file directly
│   └── src/
│       ├── api/chat.js            ← POST /api/chat with X-Session-Id header
│       ├── components/
│       │   ├── Home.jsx / About.jsx / TechStack.jsx
│       │   ├── Experience.jsx / Portfolio.jsx / Education.jsx
│       │   ├── ContactForm.jsx / Footer.jsx
│       │   └── chatbot/
│       │       ├── ChatBot.jsx    ← STATIC_MODE flag (line 10)
│       │       ├── ChatPanel.jsx
│       │       ├── ChatBubble.jsx
│       │       └── ChatMessage.jsx
│       └── styles/                ← Per-section CSS files
├── backend/
│   └── src/
│       ├── adapters/llm/          ← LLM provider adapters
│       ├── controllers/
│       ├── middleware/
│       ├── quota/                 ← SQLite quota guard
│       └── prompts/skikszilcho-system-prompt.md
└── docs/
    ├── adr/                       ← Architectural Decision Records (0001–0008)
    └── specs/                     ← Phase specs
```

---

## Local Development

### Prerequisites

- Node.js v18+
- Docker (optional — for production parity)

### Running locally

```bash
# Frontend (port 3000)
cd frontend && npm install && npm run dev

# Backend (port 5000) — copy backend/.env.example to backend/.env and fill secrets
cd backend && npm install && npm run dev
```

The Vite dev server proxies all `/api/*` requests to `http://localhost:5000`.

### Environment variables

| Variable | Where | Description |
|---|---|---|
| `LLM_PROVIDER` | `backend/.env` | Active LLM adapter (`gemini` / `openai`) |
| `LLM_API_KEY` | `backend/.env` | API key for the active provider |
| `QUOTA_DB_PATH` | `backend/.env` | Path to the SQLite quota database file |
| `CLIENT_URL` | `backend/.env` | Allowed CORS origin (frontend URL) |
| `AXIOM_DATASET` / `AXIOM_TOKEN` | `backend/.env` | Monitoring (optional in dev) |

---

## Architectural Decision Records

All major decisions are documented in [`docs/adr/`](docs/adr/):

| ADR | Decision |
|---|---|
| [0001](docs/adr/0001-llm-provider-gemini.md) | Google Gemini as LLM provider via adapter pattern |
| [0002](docs/adr/0002-monitoring-axiom.md) | Axiom for structured event monitoring |
| [0003](docs/adr/0003-quota-enforcement-sqlite.md) | SQLite for quota enforcement over Redis |
| [0004](docs/adr/0004-email-relay-gmail-smtp.md) | Gmail SMTP as email relay |
| [0005](docs/adr/0005-cv-storage-cloudflare-r2.md) | Cloudflare R2 for CV storage |
| [0006](docs/adr/0006-hosting-architecture.md) | Azure Static Web Apps + Google Cloud Run |
| [0007](docs/adr/0007-containerisation-docker-compose.md) | Docker Compose for local and production parity |
| [0008](docs/adr/0008-cold-start-mitigation.md) | Cold-start mitigation via health ping |

---

## What Is Not Committed

- `backend/.env` — real secrets
- `backend/data/quota.db` — SQLite quota store
- `frontend/public/Picture1.png` — private photo
- `*.pdf` — CV document
