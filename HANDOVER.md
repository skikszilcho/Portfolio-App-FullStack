# Portfolio-App — Handover Document

**Last updated:** 2025-04  
**Repo:** https://github.com/skikszilcho/Portfolio-App-FullStack  
**GitHub Pages (live after setup):** https://skikszilcho.github.io/Portfolio-App-FullStack/  
**Local dev:** `frontend/` on port 3000 · `backend/` on port 5000

---

## 1. What This Project Is

Full-stack personal portfolio for Ikageng Sebesho. React + Vite frontend,
Node.js/Express backend, Gemini LLM chatbot (Skikszilcho), SQLite quota guard,
and Axiom observability. Currently deployed as a static frontend on GitHub Pages
with the chatbot in "coming soon" mode while the backend is being hosted.

---

## 2. Current Deployment State

### Phase A — GitHub Pages (active now)
- Frontend builds via GitHub Actions (`.github/workflows/deploy.yml`) on every
  push to `main`.
- Chatbot bubble is visible but shows a spinning gears animation and
  "Chat Coming Soon" notice — **no backend calls are made**.
- All other sections (Home, About, Tech Stack, Experience, Portfolio, Education,
  Contact form UI) are fully functional.
- `vite.config.js` has `base: '/Portfolio-App-FullStack/'` for the sub-path.

**One manual step still required in GitHub:**  
Settings → Pages → Source → **GitHub Actions** → Save.  
After that, every push to `main` redeploys automatically.

### Phase B — Add live backend (next week)
Deploy backend to **Render** (free tier, Node.js).  
Then flip one line in `frontend/src/components/chatbot/ChatBot.jsx`:
```js
const STATIC_MODE = false;   // line 10
```
Commit and push — chatbot goes live on the same GitHub Pages URL.

### Phase C — Full VPS deployment (after Phase B)
Full spec at `docs/specs/phase-5-contact-cv-hosting.md`.
Covers contact form email (Gmail SMTP), CV download (Cloudflare R2),
Dockerfiles, Docker Compose, and Azure Static Web Apps + Google Cloud Run hosting.

---

## 3. Repository Layout

```
Portfolio-App/
├── .github/workflows/deploy.yml   ← GitHub Actions — builds frontend, deploys to Pages
├── frontend/                      ← React + Vite app
│   ├── public/
│   │   ├── projects.json          ← PROJECT DATA — edit this, not helpers.js
│   │   ├── section.svg / hero.svg / top-bg.svg
│   │   ├── logo.png
│   │   └── hackerrank-logo-png_seeklogo-455716.png
│   ├── src/
│   │   ├── api/chat.js            ← POST /api/chat with X-Session-Id header
│   │   ├── components/
│   │   │   ├── Home.jsx           ← STATIC_MODE is NOT here — see ChatBot.jsx
│   │   │   ├── About.jsx
│   │   │   ├── TechStack.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Portfolio.jsx      ← fetches /projects.json, falls back to helpers.js
│   │   │   ├── Education.jsx
│   │   │   ├── ContactForm.jsx    ← form UI only — no backend route yet
│   │   │   ├── Footer.jsx
│   │   │   └── chatbot/
│   │   │       ├── ChatBot.jsx    ← STATIC_MODE flag lives here (line 10)
│   │   │       ├── ChatPanel.jsx  ← renders gear spinner when staticMode=true
│   │   │       ├── ChatBubble.jsx
│   │   │       └── ChatMessage.jsx
│   │   ├── styles/                ← per-section CSS files (never edit global.css directly)
│   │   └── utils/helpers.js       ← fallbackProjects + typingRoles (fallback only)
│   ├── vite.config.js             ← base='/Portfolio-App-FullStack/' set for GitHub Pages
│   └── package.json
├── backend/                       ← Node.js + Express (not deployed yet)
│   ├── src/
│   │   ├── adapters/llm/gemini.adapter.js   ← active LLM provider
│   │   ├── controllers/chat.controller.js
│   │   ├── middleware/quota.middleware.js
│   │   ├── quota/quota.guard.js             ← RPM/TPM/RPD/session/concurrency limits
│   │   └── prompts/skikszilcho-system-prompt.md  ← edit this, not JS files
│   ├── .env.example               ← safe to commit; copy to .env and fill secrets
│   └── package.json
└── docs/
    ├── specs/phase-5-contact-cv-hosting.md  ← FULL SPEC for next phase
    └── adr/                                 ← architecture decision records
```

---

## 4. Project Data — Critical Rule

**`frontend/public/projects.json` is the live data source.**  
The component fetches this file on load. `helpers.js` `fallbackProjects` is only
used if the fetch fails.

**Always update both files together.** They must stay in sync.  
Both were last updated: 2025-04 (all five projects accurate).

---

## 5. Current Project Progress (as shown on the live site)

| Project | Phase | Progress | Status |
|---|---|---|---|
| Portfolio Website & Skikszilcho | 5 of 6 | 75% | In Progress |
| Local AI Workbench | 2 of 3 | 40% | In Progress |
| Mise-en-Place | 2 of 4 | 50% | In Progress |
| Geospatial Railway Crime Analytics | 4 of 4 | 100% | ✅ Completed |
| Chemical Process Simulation | 3 of 3 | 100% | ✅ Completed |

---

## 6. What Is Complete (Phases 1–4)

- ✅ React + Vite migration — all seven sections
- ✅ Modular CSS architecture (per-section files, CSS variables)
- ✅ Dark/light mode (class on `document.body`)
- ✅ Home: rotating profession wheel, `.home-name-highlight`, `.prof-accent` arc words
- ✅ About: bubble canvas animation (9 soft skills, watermark, elastic collision)
- ✅ Tech Stack: animated SVG laptop, four card groups
- ✅ Experience: IBM + Parthenius-Air timeline
- ✅ Portfolio: sticky code-terminal cards, previousPhase/nextPhase labels
- ✅ Education: UCT + UJ Metropolitan Academy timeline
- ✅ Contact form: controlled React form with validation (no backend yet)
- ✅ Skikszilcho chatbot: Gemini adapter, quota guard, system prompt, contact pre-fill
- ✅ GitHub Pages deployment pipeline

---

## 7. What Is NOT Done Yet

### Phase B — Backend hosting (next week)
1. Deploy `backend/` to Render (free tier)
2. Set env vars in Render dashboard (copy from `backend/.env.example`)
3. Update `CLIENT_URL` in Render to `https://skikszilcho.github.io`
4. Set `STATIC_MODE = false` in `frontend/src/components/chatbot/ChatBot.jsx`
5. Commit and push → chatbot goes live

### Phase 5 (full spec in `docs/specs/phase-5-contact-cv-hosting.md`)
- Contact form → real email (Gmail SMTP via `nodemailer`)
- CV download → Cloudflare R2 bucket
- Cold-start health ping so chatbot shows a loading state while Render wakes
- Dockerfiles for frontend + backend
- Docker Compose
- Final hosting: Azure Static Web Apps (frontend) + Google Cloud Run (backend)

---

## 8. Key Files to Know

| Task | File to edit |
|---|---|
| Toggle chatbot live/static | `frontend/src/components/chatbot/ChatBot.jsx` line 10 |
| Update project cards | `frontend/public/projects.json` AND `frontend/src/utils/helpers.js` |
| Edit chatbot persona/knowledge | `backend/src/prompts/skikszilcho-system-prompt.md` |
| Change typing roles | `frontend/src/utils/helpers.js` → `typingRoles` array |
| Add a new section CSS file | Create `src/styles/<name>.css`, add `@import` to `global.css` |
| Vite base path | `frontend/vite.config.js` line 21 |
| GitHub Actions deploy | `.github/workflows/deploy.yml` |

---

## 9. Git Commit History (recent)

```
b66ea60  feat: GitHub Pages static deployment with chatbot coming-soon state
3e97298  fix: sync public/projects.json with helpers.js
d065dd8  fix: correct portfolio project repoUrl to skikszilcho/Portfolio-App-FullStack
c850c38  feat: home accent colours, profession arc highlights, and updated project data
2440356  feat: initial commit — Portfolio-App full-stack monorepo
```

---

## 10. Never Commit

- `backend/.env` (real secrets)
- `frontend/public/Picture1.png` (private photo — present locally, gitignored)
- `*.pdf` (CV document)
- `backend/data/quota.db` (SQLite — gitignored)
- `expPurple.svg`

---

## 11. Running Locally

```bash
# Frontend (port 3000)
cd frontend && npm install && npm run dev

# Backend (port 5000) — needs backend/.env filled
cd backend && npm install && npm run dev
```

The Vite proxy forwards `/api/*` → `http://localhost:5000` in dev.  
For local dev, temporarily revert `base` in `vite.config.js` to `'/'` if assets
don't load, then restore before committing.

---

## 12. Skill & Documentation

The `portfolio-editor` Bob skill at `~/.bob/skills/portfolio-editor/SKILL.md`
contains all guardrails, CSS variable names, z-index hierarchy, recurring error
patterns, and per-section rules. Activate it at the start of any Portfolio-App
editing session.
