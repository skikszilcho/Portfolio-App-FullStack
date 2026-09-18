export const fallbackProjects = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website & AI Assistant (AskIka)',
    description: 'Full-stack personal portfolio and conversational AI assistant built with React, Node.js/Express, Docker, and LLM integration, deployed on cloud infrastructure.',
    category: 'Web / Full-Stack',
    tags: ['React', 'Node.js', 'Express', 'Docker', 'LLM', 'CSS3'],
    status: 'in-progress',
    currentPhase: 1,
    totalPhases: 6,
    progressPercent: 15,
    repoUrl: 'https://github.com/IkagengSebesho/portfolio-website',
    liveUrl: '#',
    changelog: [
      { version: '0.2.0', date: '2025-02', notes: 'Architecture planning, JSON data schema design, and modular React component migration specification.' },
    ],
  },
  {
    id: 'local-ai',
    title: 'Local AI',
    description: 'Privacy-focused local AI environment for running open-source large language models, inference pipelines, and document retrieval locally without cloud API dependencies.',
    category: 'AI & Machine Learning',
    tags: ['Python', 'Local LLMs', 'Ollama', 'RAG', 'AI Engineering'],
    status: 'in-progress',
    currentPhase: 2,
    totalPhases: 4,
    progressPercent: 50,
    repoUrl: 'https://github.com/IkagengSebesho',
    liveUrl: '#',
    changelog: [
      { version: '0.2.0', date: '2025-02', notes: 'Integrated local document context indexing and conversational execution interface.' },
    ],
  },
  {
    id: 'mise-en-place',
    title: 'Mise-en-Place',
    description: 'Smart recipe management and meal preparation platform designed to organise recipes, automate meal planning and prep schedules, and streamline grocery/ingredient inventory tracking.',
    category: 'Web / Application',
    tags: ['Python', 'JavaScript', 'Full-Stack', 'Automation', 'Recipe Management'],
    status: 'in-progress',
    currentPhase: 1,
    totalPhases: 4,
    progressPercent: 25,
    repoUrl: 'https://github.com/IkagengSebesho',
    liveUrl: '#',
    changelog: [
      { version: '0.1.0', date: '2025-01', notes: 'System architecture, recipe data model design, and initial meal planning workflow specifications.' },
    ],
  },
  {
    id: 'railway-crime-analytics',
    title: 'Geospatial Railway Crime Analytics & Heatmap',
    description: 'Exploratory data analysis, geospatial risk clustering, and interactive hotspot heatmaps to identify high-risk railway transit corridors and inform safety interventions.',
    category: 'Data & Analytics',
    tags: ['Python', 'Pandas', 'Power BI', 'GeoJSON', 'EDA', 'Data Visualisation'],
    status: 'completed',
    currentPhase: 4,
    totalPhases: 4,
    progressPercent: 100,
    repoUrl: '',
    liveUrl: '',
    changelog: [
      { version: '1.0.0', date: '2024-06', notes: 'Delivered interactive GeoJSON heatmap, automated ETL pipelines, and executive Power BI KPI dashboard for risk assessment.' },
    ],
  },
  {
    id: 'chemical-process-simulation-optimization',
    title: 'Chemical Process Numerical Simulation & Optimisation',
    description: 'Computational modelling, discretization, and constrained non-linear optimization for complex engineering dynamic systems and process efficiency analysis.',
    category: 'Engineering / Simulation',
    tags: ['Python', 'NumPy', 'SciPy', 'statsmodels', 'Numerical Simulation', 'Optimisation'],
    status: 'completed',
    currentPhase: 3,
    totalPhases: 3,
    progressPercent: 100,
    repoUrl: '',
    liveUrl: '',
    changelog: [
      { version: '1.0.0', date: '2024-11', notes: 'Implemented mathematical solvers and nonlinear optimization algorithms for continuous process modelling and parameter estimation.' },
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
