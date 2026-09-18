function Education() {
  return (
    <section id="education">
      <h2 className="heading">My <span>Education</span></h2>

      <div className="edu-timeline">

        {/* ── University of Cape Town ── */}
        <div className="edu-institution-group">
          <h3 className="edu-institution-name">University of Cape Town (UCT)</h3>

          <div className="edu-entry">
            <div className="edu-dot"></div>
            <div className="edu-content">
              <h4 className="edu-qualification">Bachelor of Science in Engineering (BSc Eng) in Chemical Engineering</h4>
              <span className="edu-field">Graduated</span>
              <span className="edu-date">2025 · Cape Town, South Africa</span>
              <p>
                Completed a rigorous Chemical Engineering degree applying mathematics, science, and
                engineering principles to the analysis, design, and optimisation of industrial processes.
                Built practical expertise across thermodynamics, fluid mechanics, heat &amp; mass transfer,
                reaction engineering, process control, and simulation — using computational and analytical
                methods to solve complex problems and evaluate design alternatives on technical and economic
                grounds. This systems-thinking foundation directly underpins my approach to infrastructure
                and technology: breaking complexity into workable parts and building solutions grounded
                in first principles.
              </p>
              <div className="edu-pills">
                <span>Process Design</span>
                <span>Thermodynamics</span>
                <span>Fluid Mechanics</span>
                <span>Reaction Engineering</span>
                <span>Process Control</span>
                <span>Process Simulation</span>
                <span>Project Management</span>
                <span>Systems Thinking</span>
                <span>Technical Communication</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── UJ Metropolitan Academy ── */}
        <div className="edu-institution-group">
          <h3 className="edu-institution-name">UJ Metropolitan Academy</h3>

          <div className="edu-entry">
            <div className="edu-dot"></div>
            <div className="edu-content">
              <h4 className="edu-qualification">National Senior Certificate (NSC)</h4>
              <span className="edu-field">Matriculation</span>
              <span className="edu-date">2017 · Johannesburg, South Africa</span>
              <p>
                Completed my National Senior Certificate at UJ Metropolitan Academy in Johannesburg,
                establishing the academic foundations in mathematics, physical sciences, and analytical
                reasoning that shaped my engineering and technology path.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Education;
