import { useEffect, useState } from 'react';
import { typingRoles } from '../utils/helpers.js';

function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = typingRoles[roleIndex];
    const delay = !deleting && visibleCharacters === role.length
      ? 1400
      : deleting && visibleCharacters === 0
        ? 300
        : deleting ? 50 : 90;

    const timer = window.setTimeout(() => {
      if (!deleting && visibleCharacters < role.length) {
        setVisibleCharacters((count) => count + 1);
      } else if (deleting && visibleCharacters > 0) {
        setVisibleCharacters((count) => count - 1);
      } else if (!deleting) {
        setDeleting(true);
      } else {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % typingRoles.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, roleIndex, visibleCharacters]);

  const currentRole = typingRoles[roleIndex].slice(0, visibleCharacters);

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h3>Hello, My name is</h3>
        <h1>Ikageng Sebesho</h1>
        <h3>And I'm <span className="typing-text">{currentRole}</span></h3>
        <p>
          Aspiring AI Infrastructure &amp; Platform Engineer with a background in Chemical Engineering. Focused on designing and deploying scalable AI systems, data pipelines, and production-ready applications.
        </p>

        <div className="social-media">
          <a href="#" aria-label="GitHub"><i className="bx bxl-github"></i></a>
          <a href="#" className="hackerrank-link" aria-label="HackerRank">
            <img src="/hackerrank-logo-png_seeklogo-455716.png" alt="HackerRank" className="hackerrank-icon" />
          </a>
          <a href="#" aria-label="Instagram"><i className="bx bxl-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
        </div>

        <a href="#" className="btn">Download CV</a>
      </div>

      <div className="home-img">
        <div className="rhombus"></div>
        <div className="person">
          <img src="/Picture1.png" alt="Ikageng Sebesho" />
        </div>

        <div className="profession-container">
          <div className="profession-box">
            <div className="profession" style={{ '--i': 0 }}>
              <i className="bx bx-code-alt"></i><h3>Python<br />Developer</h3>
            </div>
            <div className="profession" style={{ '--i': 1 }}>
              <i className="bx bx-brain"></i><h3>AI Engineer</h3>
            </div>
            <div className="profession" style={{ '--i': 2 }}>
              <i className="bx bx-bot"></i><h3>Applied AI Developer</h3>
            </div>
            <div className="profession" style={{ '--i': 3 }}>
              <i className="bx bx-bulb"></i><h3>Solutions Developer</h3>
            </div>
          </div>
          <span className="arc"></span>
        </div>
      </div>
    </section>
  );
}

export default Home;
