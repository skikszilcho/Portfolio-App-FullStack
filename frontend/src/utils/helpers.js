export const fallbackProjects = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website & AI Assistant (Skikszilcho)',
    description: 'Full-stack personal portfolio built in React + Vite with a Node.js/Express backend, quota-guarded Gemini LLM chatbot (Skikszilcho), SQLite session tracking, Axiom observability, and modular CSS animations. Phases 1–4 complete; contact form backend and Docker deployment are next.',
    category: 'Web / Full-Stack',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Gemini LLM', 'SQLite', 'Axiom', 'CSS3'],
    status: 'in-progress',
    currentPhase: 5,
    totalPhases: 6,
    progressPercent: 75,
    repoUrl: 'https://github.com/skikszilcho/Portfolio-App-FullStack',
    liveUrl: '#',
    previousPhase: 'Phases 1–4 complete: React migration, all seven sections, Skikszilcho chatbot with Gemini LLM, quota guard, system prompt, and contact pre-fill.',
    nextPhase: 'Phase 5 wires the contact form to a real email endpoint and adds a backend CV download route.',
    changelog: [
      { version: '0.1.0', date: '2025-01', notes: 'Static portfolio built with HTML, CSS, and vanilla JS — typing animation, rotating profession wheel, and sticky code-editor project cards.' },
      { version: '0.2.0', date: '2025-03', notes: 'Migrated to React + Vite with modular CSS, dark mode, all seven sections ported, and education/experience timelines built.' },
      { version: '0.3.0', date: '2025-04', notes: 'Skikszilcho AI chatbot live: Gemini adapter, quota guard (RPM/TPM/RPD/session/concurrency), system prompt, and contact pre-fill via CustomEvent.' },
    ],
  },
  {
    id: 'local-ai',
    title: 'Local AI Workbench',
    description: 'Fully local AI companion running entirely in Docker — llama.cpp for LLM inference and embeddings, Qdrant vector database, and Open WebUI. Phase 1 complete: document ingestion pipeline (20+ formats), MCP server with 3 tools, file-watcher auto-ingest, and a 21-test suite — all confirmed passing.',
    category: 'AI & Machine Learning',
    tags: ['Python', 'llama.cpp', 'Qdrant', 'Open WebUI', 'Docker', 'MCP', 'RAG', 'Embeddings'],
    status: 'in-progress',
    currentPhase: 2,
    totalPhases: 3,
    progressPercent: 40,
    repoUrl: 'https://github.com/IkagengSebesho',
    liveUrl: '#',
    previousPhase: 'Phase 1 complete: ingestion pipeline (extract → chunk → embed → Qdrant), MCP server (search_knowledge, ingest_document, list_knowledge_base), watcher service, and auth middleware — all tests passing.',
    nextPhase: 'Phase 2 adds episodic memory (Mem0), agent orchestration, Obsidian sync, and Grafana/Prometheus monitoring.',
    changelog: [
      { version: '0.1.0', date: '2025-01', notes: 'Docker Compose stack live: llama.cpp LLM server, embedding server (Qwen3-Embedding-0.6B, 1024-d), Qdrant, Open WebUI, and stack management scripts.' },
      { version: '1.0.0', date: '2025-04', notes: 'Phase 1 complete: Python ingestion pipeline, MCP server with 3 tools, swappable auth (NoAuth/Bearer), watcher service, and 21-test suite — all 8 RAG and 13 MCP tests confirmed passing.' },
    ],
  },
  {
    id: 'mise-en-place',
    title: 'Mise-en-Place',
    description: 'Smart meal-prep platform built with React + Vite and Supabase — full authentication (login, register, OAuth, password reset), recipe management (CRUD, search, tag filters, sort, pagination), and PostgreSQL schema with row-level security. Meal planning and shopping list generation are next.',
    category: 'Web / Application',
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'RLS', 'Tailwind CSS', 'Full-Stack'],
    status: 'in-progress',
    currentPhase: 2,
    totalPhases: 4,
    progressPercent: 50,
    repoUrl: 'https://github.com/IkagengSebesho',
    liveUrl: '#',
    previousPhase: 'Phase 1 delivered the Auth feature (login, register, OAuth, forgot/reset password) and the Recipe feature (CRUD, search, filter, sort, pagination) with Supabase RLS migrations.',
    nextPhase: 'Phase 2 adds meal planning — weekly schedule builder, serving-size scaling, and automated shopping list generation from planned meals.',
    changelog: [
      { version: '0.1.0', date: '2025-01', notes: 'System architecture and Supabase schema designed; project scaffolded with React + Vite + Tailwind CSS.' },
      { version: '0.2.0', date: '2025-03', notes: 'Auth feature complete: login, register, OAuth callback, forgot/reset password, and password strength indicator.' },
      { version: '0.3.0', date: '2025-04', notes: 'Recipe feature complete: CRUD, search bar, tag filter chips, sort dropdown, pagination, and Supabase RLS migrations (profiles, recipes, policies).' },
    ],
  },
  {
    id: 'railway-crime-analytics',
    title: 'Geospatial Railway Crime Analytics & Heatmap',
    description: 'End-to-end EDA and geospatial risk analysis project processing crime incident records across South African railway corridors — producing interactive GeoJSON heatmaps, automated ETL pipelines, and a Power BI KPI dashboard to surface high-risk zones and inform safety interventions.',
    category: 'Data & Analytics',
    tags: ['Python', 'Pandas', 'GeoPandas', 'Power BI', 'GeoJSON', 'EDA', 'Data Visualisation'],
    status: 'completed',
    currentPhase: 4,
    totalPhases: 4,
    progressPercent: 100,
    repoUrl: '',
    liveUrl: '',
    changelog: [
      { version: '0.1.0', date: '2024-05', notes: 'Raw incident data cleaned, standardised, and geocoded; initial EDA and correlation analysis completed.' },
      { version: '1.0.0', date: '2024-06', notes: 'Delivered interactive GeoJSON heatmap, automated ETL pipelines, and executive Power BI KPI dashboard for railway risk assessment.' },
    ],
  },
  {
    id: 'chemical-process-simulation-optimization',
    title: 'Chemical Process Numerical Simulation & Optimisation',
    description: 'Computational modelling suite for dynamic chemical engineering systems — implementing finite-difference discretisation, ODE solvers, and constrained non-linear optimisation to maximise process efficiency and validate simulation accuracy against analytical benchmarks.',
    category: 'Engineering / Simulation',
    tags: ['Python', 'NumPy', 'SciPy', 'Statsmodels', 'Matplotlib', 'Numerical Simulation', 'Optimisation'],
    status: 'completed',
    currentPhase: 3,
    totalPhases: 3,
    progressPercent: 100,
    repoUrl: '',
    liveUrl: '',
    changelog: [
      { version: '0.1.0', date: '2024-09', notes: 'Mathematical model formulation completed and finite-difference discretisation implemented for steady-state systems.' },
      { version: '1.0.0', date: '2024-11', notes: 'Nonlinear optimisation algorithms and ODE solvers implemented; parameter estimation validated against analytical solutions.' },
    ],
  },
];

export const typingRoles = [
  'a Developer',
  'an Engineer',
  'an Analyst',
  'a Problem-Solver',
];

export function getStatusLabel(status = 'in-progress') {
  if (status === 'completed') return 'Completed';
  if (status === 'planned') return 'Planned';
  return 'In Progress';
}

export function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}
