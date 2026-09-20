import { useEffect, useRef } from 'react';

const SOFT_SKILLS = [
  'Leadership & Team Coordination',
  'Analytical & Critical Thinking',
  'Team Player',
  'Attention to Detail',
  'Structured Thinking',
  'Goal Oriented',
  'Perseverance',
  'Resourceful',
  'Collaboration',
];

/* Vivid colours per bubble — 9 entries cycling for 9 skills */
const BUBBLE_COLOURS = [
  { stroke: '#7b5cff', fill: 'rgba(123,92,255,0.13)', glow: 'rgba(123,92,255,0.75)' },
  { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.12)',  glow: 'rgba(34,211,238,0.75)'  },
  { stroke: '#a78bfa', fill: 'rgba(167,139,250,0.13)', glow: 'rgba(167,139,250,0.75)' },
  { stroke: '#38bdf8', fill: 'rgba(56,189,248,0.12)',  glow: 'rgba(56,189,248,0.75)'  },
  { stroke: '#c084fc', fill: 'rgba(192,132,252,0.13)', glow: 'rgba(192,132,252,0.75)' },
  { stroke: '#818cf8', fill: 'rgba(129,140,248,0.12)', glow: 'rgba(129,140,248,0.75)' },
  { stroke: '#34d399', fill: 'rgba(52,211,153,0.11)',  glow: 'rgba(52,211,153,0.70)'  },
  { stroke: '#60a5fa', fill: 'rgba(96,165,250,0.12)',  glow: 'rgba(96,165,250,0.75)'  },
  { stroke: '#e879f9', fill: 'rgba(232,121,249,0.12)', glow: 'rgba(232,121,249,0.75)' },
];

function makeBubbles(w, h) {
  // Base desktop reference dimension for proportional scaling
  const baseDim = 500;
  const currentDim = Math.min(w, h);
  const scale = Math.max(0.48, Math.min(1.05, currentDim / baseDim));

  return SOFT_SKILLS.map((label, i) => {
    const isSingleWord = !label.includes(' ');
    // Single-word bubbles are smaller than multi-word bubbles
    const baseR = isSingleWord
      ? (62 + (i % 3) * 6)
      : (94 + (i % 4) * 8);

    const r = Math.round(baseR * scale);
    const colour = BUBBLE_COLOURS[i % BUBBLE_COLOURS.length];
    
    // Scale velocity proportionally with scale factor for consistent timing/speed
    const speed = 0.85 * scale;
    const angle = Math.random() * Math.PI * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    return {
      label,
      r,
      scale,
      isSingleWord,
      x: r + Math.random() * Math.max(10, w - r * 2),
      y: r + Math.random() * Math.max(10, h - r * 2),
      vx: vx === 0 ? 0.5 * scale : vx,
      vy: vy === 0 ? 0.5 * scale : vy,
      colour,
    };
  });
}

function drawBubble(ctx, b) {
  const { x, y, r, label, colour, scale = 1, isSingleWord } = b;

  /* Glow + fill */
  ctx.save();
  ctx.shadowColor = colour.glow;
  ctx.shadowBlur  = Math.max(8, Math.round(24 * scale));
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle   = colour.fill;
  ctx.fill();
  ctx.strokeStyle = colour.stroke;
  ctx.lineWidth   = Math.max(1.5, 2.5 * scale);
  ctx.stroke();
  ctx.restore();

  /* Inner ring accent */
  ctx.save();
  ctx.beginPath();
  const innerOffset = Math.max(3, Math.round(6 * scale));
  ctx.arc(x, y, Math.max(1, r - innerOffset), 0, Math.PI * 2);
  ctx.strokeStyle = colour.stroke;
  ctx.globalAlpha = 0.2;
  ctx.lineWidth   = Math.max(1, 1.2 * scale);
  ctx.stroke();
  ctx.restore();

  /* Label — dynamic font size and line height proportional to bubble radius */
  const words = label.split(' ');
  const lines  = [];
  let cur      = '';
  const maxW   = r * 1.35;
  // Font size scaled with bubble radius and word count
  const fontSize = isSingleWord
    ? Math.max(10, Math.min(16, Math.round(r * 0.28)))
    : Math.max(9, Math.min(15, Math.round(r * 0.21)));

  ctx.font = `600 ${fontSize}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);

  const lineH  = fontSize + Math.max(3, Math.round(4 * scale));
  const totalH = lines.length * lineH;
  const startY = y - totalH / 2 + lineH * 0.5;

  ctx.save();
  ctx.fillStyle    = colour.stroke;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${fontSize}px -apple-system, "Segoe UI", system-ui, sans-serif`;
  lines.forEach((line, idx) => {
    ctx.fillText(line, x, startY + idx * lineH);
  });
  ctx.restore();
}

function resolveCollision(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = a.r + b.r;
  if (dist === 0 || dist >= minDist) return;

  const overlap = (minDist - dist) / 2;
  const nx = dx / dist;
  const ny = dy / dist;
  a.x -= nx * overlap;
  a.y -= ny * overlap;
  b.x += nx * overlap;
  b.y += ny * overlap;

  const relVx = a.vx - b.vx;
  const relVy = a.vy - b.vy;
  const dot   = relVx * nx + relVy * ny;
  if (dot > 0) return;
  a.vx -= dot * nx;
  a.vy -= dot * ny;
  b.vx += dot * nx;
  b.vy += dot * ny;
}

function About() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf;
    let bubbles;

    function resize() {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      // Set the drawing buffer to match the exact CSS-rendered size × DPR
      // This guarantees a 1:1 pixel mapping so arcs stay circular
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.scale(dpr, dpr);
      // Bubble coordinates are in CSS pixels (rect dimensions)
      bubbles = makeBubbles(rect.width, rect.height);
    }

    resize();
    window.addEventListener('resize', resize);

    function tick() {
      const dpr = window.devicePixelRatio || 1;
      // Work in CSS pixels — divide buffer size back down
      const W = canvas.width  / dpr;
      const H = canvas.height / dpr;
      ctx.clearRect(0, 0, W, H);

      /* ── Watermark: "Soft Skills" ── */
      const isDark = document.body.classList.contains('dark-mode');
      const wmSize = Math.min(W, H) * 0.28;
      ctx.save();
      ctx.font         = `800 ${wmSize}px -apple-system, "Segoe UI", system-ui, sans-serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '0.04em';
      /* "Soft" — black in light mode, white in dark mode */
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
      ctx.fillText('Soft', W * 0.52, H * 0.42);
      /* "Skills" — purple tint */
      ctx.fillStyle = 'rgba(123,92,255,0.055)';
      ctx.fillText('Skills', W * 0.52, H * 0.42 + wmSize * 1.05);
      ctx.restore();

      for (const b of bubbles) {
        b.x += b.vx;
        b.y += b.vy;
        /* Wall collisions:
           On desktop (>900px), left wall is open allowing bubbles to drift off-screen left and re-enter.
           On mobile (<=900px), the container is full-width with overflow:hidden; left wall bounces so bubbles remain visible and readable inside the allocated container */
        const isMobile = W <= 600;
        if (isMobile) {
          if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx); }
        } else {
          if (b.x + b.r < 0) { b.x = -b.r + 1; b.vx = Math.abs(b.vx); }
        }

        if (b.x + b.r > W)  { b.x = W - b.r;  b.vx = -Math.abs(b.vx); }
        if (b.y - b.r < 0)  { b.y = b.r;       b.vy = Math.abs(b.vy);  }
        if (b.y + b.r > H)  { b.y = H - b.r;   b.vy = -Math.abs(b.vy); }
      }

      for (let i = 0; i < bubbles.length; i++)
        for (let j = i + 1; j < bubbles.length; j++)
          resolveCollision(bubbles[i], bubbles[j]);

      for (const b of bubbles) drawBubble(ctx, b);

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="about" id="about">
      {/* Title — centred across the full section width */}
      <h2 className="heading about-title">About <span>Me</span></h2>

      {/* Body row: bubble zone left, text right */}
      <div className="about-body">
        {/* Bubble playground — left column, can bleed off left edge */}
        <div className="about-bubble-zone" aria-hidden="true">
          <canvas ref={canvasRef} className="about-bubbles" />
        </div>

        {/* Text column — right */}
        <div className="about-content">
          <h3>Infrastructure &amp; Platform Engineer</h3>
          <p>
            I&apos;m a Chemical Engineer by training and an aspiring Infrastructure &amp; Platform Engineer,
            with a growing foundation across cloud computing, programming, data, and enterprise technology.
            I enjoy working at the intersection of engineering and technology, particularly where complex
            systems, automation, and practical problem-solving come together. My engineering background
            gives me a systems-oriented approach, while my experience with Python, data analysis, and cloud
            technologies has taught me to turn that thinking into things that are useful and tangible.
          </p>
          <p>
            I&apos;m at my best when I&apos;m learning, building, and figuring things out. I&apos;m
            particularly interested in infrastructure, cloud platforms, networking, automation, and the
            technologies that make modern digital environments work. I&apos;m also naturally curious about
            new technology and enjoy going beyond simply using something to understanding how it works
            underneath. That curiosity, combined with analytical thinking and a willingness to teach myself
            what I don&apos;t know, is probably one of my biggest strengths.
          </p>
          <p>
            Outside of work, I&apos;m not particularly good at sitting still. I&apos;m energetic, social,
            and creative, and I like having interests that have nothing to do with engineering. I&apos;m an
            avid sports fan &mdash; especially Manchester United, football, rugby, basketball, and F1 &mdash;
            and I&apos;m also into gaming, computing, networking, cooking, anime, and a ridiculously broad
            range of music. Having that balance matters to me; I enjoy technology, but I don&apos;t want it
            to be my entire personality.
          </p>
          <p>
            So, why care about what I do? Because I&apos;m someone who genuinely enjoys{' '}
            <strong>building and solving</strong>. I don&apos;t need to already know the answer to be
            interested in a problem &mdash; figuring it out is often the best part. I&apos;m still
            developing my expertise, but I bring an engineering mindset, technical curiosity, adaptability,
            and the willingness to keep learning until I can make something work. I&apos;m interested in
            building reliable systems, solving meaningful problems, and becoming the kind of engineer who
            understands not just what a technology does, but why and how it works.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
