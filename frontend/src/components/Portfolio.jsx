import { useEffect, useState } from 'react';
import { fallbackProjects, getStatusLabel } from '../utils/helpers.js';

function ProjectCard({ project, index }) {
  const latestUpdate = project.changelog?.at(-1);
  const progress = project.progressPercent || 0;

  return (
    <div
      className="project-card-wrapper"
      style={{ top: `${8 + index * 1.5}rem`, zIndex: index + 1 }}
    >
      <div className="project-card">
        <div className="card-header">
          <div className="card-dots">
            <span className="dot-red"></span>
            <span className="dot-yellow"></span>
            <span className="dot-green"></span>
          </div>
          <div className="card-header-title">{project.title}</div>
          <div className="card-header-actions">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" title="View Source Code">
                <i className="bx bxl-github"></i>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Preview">
                <i className="bx bx-link-external"></i>
              </a>
            )}
          </div>
        </div>

        <div className="card-body">
          <div className="code-line">
            <span className="syn-keyword">const</span> <span className="syn-var">project</span> <span className="syn-accent">=</span> <span className="syn-bracket">&#123;</span>
          </div>
          <div className="code-line code-indent">
            <span className="syn-prop">name</span><span className="syn-colon">:</span> <span className="syn-string">'{project.title}'</span><span className="syn-comma">,</span>
          </div>
          <div className="code-line code-indent">
            <span className="syn-prop">category</span><span className="syn-colon">:</span> <span className="syn-string">'{project.category}'</span><span className="syn-comma">,</span>
          </div>
          <div className="code-line code-indent">
            <span className="syn-prop">tools</span><span className="syn-colon">:</span> <span className="syn-bracket">[</span>
            {project.tags.map((tag) => <span className="syn-string" key={tag}>'{tag}' </span>)}
            <span className="syn-bracket">]</span><span className="syn-comma">,</span>
          </div>
          <div className="code-line code-indent">
            <span className="syn-prop">description</span><span className="syn-colon">:</span> <span className="syn-desc">'{project.description}'</span><span className="syn-comma">,</span>
          </div>

          <div className="card-meta-bar">
            <div className={`status-badge ${project.status || 'in-progress'}`}>
              <span className="status-dot"></span>
              <span>{getStatusLabel(project.status)}</span>
            </div>
            <div className="progress-container">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="progress-label">
                Phase {project.currentPhase || 0} of {project.totalPhases || 1} ({progress}%)
              </span>
            </div>
          </div>

          {latestUpdate && (
            <div className="changelog-summary">
              <strong>Latest Update ({latestUpdate.version}):</strong> <span>{latestUpdate.notes}</span>
            </div>
          )}

          <div className="code-line" style={{ marginTop: '.8rem' }}>
            <span className="syn-bracket">&#125;;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    let cancelled = false;

    fetch('/projects.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch(() => {
        if (!cancelled) setProjects(fallbackProjects);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="portfolio" id="portfolio">
      <h2 className="heading">Featured <span>Projects</span></h2>
      <div className="portfolio-stack-container">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
