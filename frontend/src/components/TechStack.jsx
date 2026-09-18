function TechStack() {
  return (
<section id="stack" className="stack">
    <h2 className="heading">My Tech <span>Stack</span></h2>

    <div className="stack-layout">

      {/* Left column: animation centred on the Frameworks/Tools boundary */}
      <div className="stack-left">
        <div className="dw-wrapper" aria-hidden="true">
        <svg className="dw-svg" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 300 225" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* laptop frame: purpleÃ¢â€ â€™violetÃ¢â€ â€™cyan */}
            <linearGradient id="dw-frame" x1="70" y1="28" x2="230" y2="185" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#8b5cf6"/>
              <stop offset="55%"  stopColor="#6d28d9"/>
              <stop offset="100%" stopColor="#22d3ee"/>
            </linearGradient>
            {/* screen background: deep navy */}
            <linearGradient id="dw-screen" x1="80" y1="35" x2="220" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#17132f"/>
              <stop offset="100%" stopColor="#080a18"/>
            </linearGradient>
            {/* base: violetÃ¢â€ â€™purpleÃ¢â€ â€™cyan */}
            <linearGradient id="dw-base" x1="70" y1="170" x2="230" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#5b21b6"/>
              <stop offset="50%"  stopColor="#7c3aed"/>
              <stop offset="100%" stopColor="#0891b2"/>
            </linearGradient>
            {/* cup body: dark violet */}
            <linearGradient id="dw-cup" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#4c1d95"/>
              <stop offset="100%" stopColor="#2e1065"/>
            </linearGradient>
            {/* cup highlight */}
            <linearGradient id="dw-cup-hl" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
            </linearGradient>
            {/* desk surface */}
            <linearGradient id="dw-desk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#1e1b4b"/>
              <stop offset="100%" stopColor="#0f0e24"/>
            </linearGradient>
            {/* screen glow (radial, centred on screen) */}
            <radialGradient id="dw-sglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.28"/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
            </radialGradient>
            {/* soft drop shadow filter */}
            <filter id="dw-shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.5"/>
            </filter>
            {/* glow blur for screen */}
            <filter id="dw-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* screen clip */}
            <clipPath id="dw-clip">
              <rect x="80" y="33" width="140" height="95" rx="3"/>
            </clipPath>
          </defs>

          {/* Ã¢â€“â€˜Ã¢â€“â€˜ AMBIENT BACKGROUND GLOWS Ã¢â€“â€˜Ã¢â€“â€˜ */}
          <circle className="dw-bg-glow dw-bg-a" cx="145" cy="110" r="65" fill="#6d28d9"/>
          <circle className="dw-bg-glow dw-bg-b" cx="55"  cy="170" r="30" fill="#0891b2"/>

          {/* Ã¢â€“â€˜Ã¢â€“â€˜ DESK SURFACE Ã¢â€“â€˜Ã¢â€“â€˜ */}
          <rect x="0" y="188" width="300" height="37" fill="url(#dw-desk)"/>
          {/* desk top edge highlight */}
          <line x1="0" y1="188" x2="300" y2="188" stroke="#312e81" strokeWidth="1"/>
          {/* laptop shadow on desk */}
          <ellipse className="dw-shadow" cx="150" cy="193" rx="72" ry="6" fill="#000" opacity="0.35"/>
          {/* cup shadow on desk */}
          <ellipse className="dw-shadow" cx="54"  cy="193" rx="16" ry="3"  fill="#000" opacity="0.3"/>

          {/* Ã¢â€“â€˜Ã¢â€“â€˜ LAPTOP DEVICE (floats gently) Ã¢â€“â€˜Ã¢â€“â€˜ */}
          <g className="dw-device" filter="url(#dw-shadow)">

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Screen lid Ã¢â€â‚¬Ã¢â€â‚¬ */}
            <rect x="72" y="22" width="156" height="112" rx="8" fill="url(#dw-frame)"/>
            {/* inner bezel */}
            <rect x="77" y="27" width="146" height="102" rx="5" fill="#0d0f1e"/>
            {/* screen surface */}
            <rect x="80" y="33" width="140" height="95"  rx="3" fill="url(#dw-screen)"/>
            {/* camera dot */}
            <circle cx="150" cy="29.5" r="1.5" fill="#22d3ee"/>
            {/* subtle screen glow overlay (pulses) */}
            <rect className="dw-screen-pulse" x="80" y="33" width="140" height="95" rx="3" fill="url(#dw-sglow)"/>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Screen content (clipped) Ã¢â€â‚¬Ã¢â€â‚¬ */}
            <g clipPath="url(#dw-clip)">
              {/* shine sweep */}
              <rect className="dw-shine" x="-30" y="28" width="28" height="110" rx="4"
                    fill="#fff" opacity="0.06" transform="rotate(12 -30 28)"/>

              {/* traffic lights */}
              <circle cx="90"  cy="43" r="2.5" fill="#f87171"/>
              <circle cx="99"  cy="43" r="2.5" fill="#fbbf24"/>
              <circle cx="108" cy="43" r="2.5" fill="#34d399"/>

              {/* editor gutter line */}
              <line x1="118" y1="52" x2="118" y2="123" stroke="#8b5cf6" strokeOpacity="0.25"/>

              {/* file sidebar */}
              <rect x="83" y="55" width="24" height="2.5" rx="1.2" fill="#7c3aed"/>
              <rect x="83" y="63" width="18" height="2.5" rx="1.2" fill="#334155"/>
              <rect x="83" y="71" width="21" height="2.5" rx="1.2" fill="#334155"/>
              <rect x="83" y="79" width="15" height="2.5" rx="1.2" fill="#334155"/>
              <rect x="83" y="87" width="20" height="2.5" rx="1.2" fill="#334155"/>
              <rect x="83" y="95" width="16" height="2.5" rx="1.2" fill="#334155"/>
              <rect x="83" y="103" width="22" height="2.5" rx="1.2" fill="#334155"/>
              <rect x="83" y="111" width="17" height="2.5" rx="1.2" fill="#334155"/>

              {/* code lines (animate with scaleX from left) */}
              <rect className="dw-cl dw-cl-1" x="124" y="55"  width="72"  height="3.5" rx="1.7" fill="#22d3ee"/>
              <rect className="dw-cl dw-cl-2" x="124" y="64"  width="88"  height="3.5" rx="1.7" fill="#a78bfa"/>
              <rect className="dw-cl dw-cl-3" x="130" y="73"  width="56"  height="3.5" rx="1.7" fill="#f472b6"/>
              <rect className="dw-cl dw-cl-4" x="130" y="82"  width="76"  height="3.5" rx="1.7" fill="#34d399"/>
              <rect className="dw-cl dw-cl-5" x="124" y="91"  width="48"  height="3.5" rx="1.7" fill="#fbbf24"/>
              <rect className="dw-cl dw-cl-6" x="124" y="100" width="92"  height="3.5" rx="1.7" fill="#38bdf8"/>
              <rect className="dw-cl dw-cl-7" x="130" y="109" width="62"  height="3.5" rx="1.7" fill="#c084fc"/>
              <rect className="dw-cl dw-cl-8" x="124" y="118" width="80"  height="3.5" rx="1.7" fill="#f472b6"/>

              {/* cursor */}
              <rect className="dw-cursor" x="207" y="108" width="2" height="8" rx="1" fill="#fff"/>
            </g>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Hinge Ã¢â€â‚¬Ã¢â€â‚¬ */}
            <rect x="76" y="132" width="148" height="5" rx="2" fill="#1e1b4b"/>
            <rect x="76" y="133" width="148" height="2" rx="1" fill="#4c1d95" opacity="0.6"/>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Base Ã¢â€â‚¬Ã¢â€â‚¬ */}
            <path d="M62 137 H238 L252 188 H48 Z" fill="url(#dw-base)"/>
            {/* keyboard deck */}
            <path d="M68 141 H232 L244 184 H56 Z" fill="#17132f" opacity="0.8"/>

            {/* keyboard keys row 1 */}
            <g className="dw-keys" fill="#6d28d9">
              <rect x="70"  y="148" width="10" height="3" rx="1"/>
              <rect x="84"  y="148" width="10" height="3" rx="1"/>
              <rect x="98"  y="148" width="10" height="3" rx="1"/>
              <rect x="112" y="148" width="10" height="3" rx="1"/>
              <rect x="126" y="148" width="10" height="3" rx="1"/>
              <rect x="140" y="148" width="10" height="3" rx="1"/>
              <rect x="154" y="148" width="10" height="3" rx="1"/>
              <rect x="168" y="148" width="10" height="3" rx="1"/>
              <rect x="182" y="148" width="10" height="3" rx="1"/>
              <rect x="196" y="148" width="10" height="3" rx="1"/>
              <rect x="210" y="148" width="10" height="3" rx="1"/>
              {/* row 2 */}
              <rect x="74"  y="156" width="10" height="3" rx="1"/>
              <rect x="88"  y="156" width="10" height="3" rx="1"/>
              <rect x="102" y="156" width="10" height="3" rx="1"/>
              <rect x="116" y="156" width="10" height="3" rx="1"/>
              <rect x="130" y="156" width="10" height="3" rx="1"/>
              <rect x="144" y="156" width="10" height="3" rx="1"/>
              <rect x="158" y="156" width="10" height="3" rx="1"/>
              <rect x="172" y="156" width="10" height="3" rx="1"/>
              <rect x="186" y="156" width="10" height="3" rx="1"/>
              <rect x="200" y="156" width="10" height="3" rx="1"/>
              <rect x="214" y="156" width="10" height="3" rx="1"/>
              {/* row 3 */}
              <rect x="78"  y="164" width="10" height="3" rx="1"/>
              <rect x="92"  y="164" width="10" height="3" rx="1"/>
              <rect x="106" y="164" width="10" height="3" rx="1"/>
              <rect x="120" y="164" width="10" height="3" rx="1"/>
              <rect x="134" y="164" width="10" height="3" rx="1"/>
              <rect x="148" y="164" width="10" height="3" rx="1"/>
              <rect x="162" y="164" width="10" height="3" rx="1"/>
              <rect x="176" y="164" width="10" height="3" rx="1"/>
              <rect x="190" y="164" width="10" height="3" rx="1"/>
              <rect x="204" y="164" width="10" height="3" rx="1"/>
              {/* spacebar */}
              <rect x="106" y="172" width="88"  height="3" rx="1"/>
            </g>
            {/* trackpad */}
            <rect x="129" y="178" width="42" height="6" rx="3" fill="#1e1b4b" opacity="0.7"/>
          </g>

          {/* Ã¢â€“â€˜Ã¢â€“â€˜ COFFEE CUP (left of laptop) Ã¢â€“â€˜Ã¢â€“â€˜ */}
          <g className="dw-cup-group">
            {/* grounding shadow */}
            <ellipse cx="54" cy="191" rx="15" ry="3" fill="#000" opacity="0.25"/>
            {/* cup body */}
            <rect x="38" y="158" width="32" height="32" rx="4" fill="url(#dw-cup)"/>
            {/* cup body highlight strip */}
            <rect x="38" y="158" width="8"  height="32" rx="4" fill="url(#dw-cup-hl)"/>
            {/* cup rim */}
            <rect x="36" y="155" width="36" height="6"  rx="3" fill="#5b21b6"/>
            {/* rim highlight */}
            <rect x="38" y="155" width="32" height="2"  rx="1" fill="#8b5cf6" opacity="0.5"/>
            {/* cup base strip */}
            <rect x="40" y="186" width="28" height="3"  rx="1.5" fill="#3b0764"/>
            {/* handle */}
            <path d="M70 165 Q82 165 82 172 Q82 179 70 179" fill="none" stroke="#5b21b6" strokeWidth="3" strokeLinecap="round"/>
            {/* inner coffee surface */}
            <ellipse cx="54" cy="159" rx="14" ry="3.5" fill="#1e0a3c"/>
            {/* inner surface sheen */}
            <ellipse cx="50" cy="158" rx="5"  ry="1.5" fill="#7c3aed" opacity="0.3"/>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ STEAM trails (three, each independent loop) Ã¢â€â‚¬Ã¢â€â‚¬ */}
            {/* trail A */}
            <path className="dw-steam dw-steam-a"
                  d="M46 153 C44 147 48 141 46 135 C44 129 48 123 46 117"
                  fill="none" stroke="#a78bfa" strokeWidth="2"
                  strokeLinecap="round" opacity="0"/>
            {/* trail B */}
            <path className="dw-steam dw-steam-b"
                  d="M54 152 C52 146 56 140 54 134 C52 128 56 122 54 116"
                  fill="none" stroke="#c4b5fd" strokeWidth="1.5"
                  strokeLinecap="round" opacity="0"/>
            {/* trail C */}
            <path className="dw-steam dw-steam-c"
                  d="M62 153 C64 147 60 141 62 135 C64 129 60 123 62 117"
                  fill="none" stroke="#a78bfa" strokeWidth="1.8"
                  strokeLinecap="round" opacity="0"/>
          </g>

          {/* Ã¢â€“â€˜Ã¢â€“â€˜ SMALL DESK DETAILS Ã¢â€“â€˜Ã¢â€“â€˜ */}
          {/* cable loop on desk */}
          <path d="M240 192 Q255 188 265 192 Q275 196 265 200" fill="none"
                stroke="#4c1d95" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          {/* tiny dot accent top-right */}
          <circle className="dw-dot dw-dot-a" cx="268" cy="38" r="2" fill="#22d3ee" opacity="0.5"/>
          <circle className="dw-dot dw-dot-b" cx="280" cy="55" r="1.5" fill="#a78bfa" opacity="0.5"/>
          <circle className="dw-dot dw-dot-c" cx="22"  cy="48" r="1.8" fill="#f472b6" opacity="0.5"/>
          <circle className="dw-dot dw-dot-d" cx="30"  cy="30" r="1.2" fill="#38bdf8" opacity="0.5"/>

        </svg>
        </div>
      </div>

      {/* Right column: all four card groups */}
      <div className="stack-right">

        <div className="stack-group">
          <h3 className="stack-group-label">Languages</h3>
          <div className="stack-grid">
            <div className="stack-card"><i className="bx bxl-python"></i><span>Python</span></div>
            <div className="stack-card"><i className="bx bxl-javascript"></i><span>JavaScript</span></div>
            <div className="stack-card"><i className="bx bxl-html5"></i><span>HTML5</span></div>
            <div className="stack-card"><i className="bx bxl-css3"></i><span>CSS3</span></div>
            <div className="stack-card"><i className="bx bxs-data"></i><span>SQL</span></div>
            <div className="stack-card"><i className="bx bx-terminal"></i><span>Bash</span></div>
          </div>
        </div>

        <div className="stack-group">
          <h3 className="stack-group-label">Frameworks &amp; Libraries</h3>
          <div className="stack-grid">
            <div className="stack-card"><i className="bx bxl-react"></i><span>React</span></div>
            <div className="stack-card"><i className="bx bxl-python"></i><span>Pandas</span></div>
            <div className="stack-card"><i className="bx bxl-python"></i><span>NumPy</span></div>
            <div className="stack-card"><i className="bx bxl-python"></i><span>Scikit-Learn</span></div>
            <div className="stack-card"><i className="bx bx-line-chart"></i><span>Matplotlib</span></div>
            <div className="stack-card"><i className="bx bx-line-chart"></i><span>Seaborn</span></div>
            <div className="stack-card"><i className="bx bxl-python"></i><span>SciPy</span></div>
            <div className="stack-card"><i className="bx bxl-python"></i><span>Statsmodels</span></div>
          </div>
        </div>

        <div className="stack-group">
          <h3 className="stack-group-label">Tools &amp; Platforms</h3>
          <div className="stack-grid">
            <div className="stack-card"><i className="bx bxl-docker"></i><span>Docker</span></div>
            <div className="stack-card"><i className="bx bxl-git"></i><span>Git</span></div>
            <div className="stack-card"><i className="bx bx-bar-chart-alt-2"></i><span>Power BI</span></div>
            <div className="stack-card"><i className="bx bx-data"></i><span>MySQL</span></div>
            <div className="stack-card"><i className="bx bxl-microsoft"></i><span>MS Office</span></div>
            <div className="stack-card"><i className="bx bx-cloud"></i><span>AWS</span></div>
            <div className="stack-card"><i className="bx bx-terminal"></i><span>Linux</span></div>
          </div>
        </div>

        <div className="stack-group">
          <h3 className="stack-group-label">AI &amp; Automation</h3>
          <div className="stack-grid">
            <div className="stack-card"><i className="bx bx-bot"></i><span>watsonx Orchestrate</span></div>
            <div className="stack-card"><i className="bx bx-brain"></i><span>watsonx GenAI</span></div>
            <div className="stack-card"><i className="bx bx-chip"></i><span>AIOps</span></div>
            <div className="stack-card"><i className="bx bx-search-alt"></i><span>RAG</span></div>
            <div className="stack-card"><i className="bx bx-link"></i><span>LLM Integration</span></div>
            <div className="stack-card"><i className="bx bx-message-square-dots"></i><span>NLP</span></div>
          </div>
        </div>

      </div>
    </div>
  </section>
  );
}

export default TechStack;

