function Experience() {
  return (
    <section id="experience">
      <h2 className="heading">My <span>Experience</span></h2>

      <div className="exp-timeline">

        {/* ── IBM ── */}
        <div className="exp-company-group">
          <h3 className="exp-company-name">IBM</h3>

          <div className="exp-entry">
            <div className="exp-dot"></div>
            <div className="exp-content">
              <h4 className="exp-role">Information Technology Intern</h4>
              <span className="exp-date">Dec 2025 — Present · Johannesburg, ZA</span>
              <p>Working within IBM's enterprise technology environment, contributing to cloud, data, and AI-driven initiatives across internal and client-facing projects. Gained hands-on exposure to infrastructure, virtualisation, and cloud operations while developing practical skills in Python and data-driven workflows.</p>
              <p>Participated in Agile sprints and Design Thinking sessions — from ideation and problem framing through to iterative solution reviews — contributing to structured delivery in a fast-moving enterprise context.</p>
              <p>Operated with high autonomy, taking ownership of assigned technical tasks and adapting quickly to shifting priorities across multiple technology domains.</p>
              <div className="exp-pills">
                <span>Agile</span>
                <span>Design Thinking</span>
                <span>Python</span>
                <span>Cloud Operations</span>
                <span>Enterprise IT</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Parthenius-Air ── */}
        <div className="exp-company-group">
          <h3 className="exp-company-name">Parthenius-Air</h3>

          <div className="exp-entry">
            <div className="exp-dot"></div>
            <div className="exp-content">
              <h4 className="exp-role">Data Analyst Intern</h4>
              <span className="exp-date">May 2024 — Jun 2024 · South Africa</span>
              <p>Analysed regional railway crime data to surface high-risk zones and recurring incident patterns, transforming raw data into actionable intelligence for safety and operations teams.</p>
              <p>Built a GeoJSON-powered interactive heatmap that mapped crime hotspots by geolocation — giving field teams a spatial view of risk that static reports could not provide.</p>
              <p>Designed a dynamic Power BI dashboard with KPIs that directly informed strategic decisions around intervention zones, resource allocation, and priority areas.</p>
              <div className="exp-pills">
                <span>Python</span>
                <span>Power BI</span>
                <span>Excel</span>
                <span>GeoJSON</span>
                <span>Data Visualisation</span>
                <span>EDA</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Experience;
