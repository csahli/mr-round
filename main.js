/**
 * ============================================================
 *  MISTER ROUND — Site Renderer
 *  Reads SITE_CONFIG from site-config.js and builds the page.
 *  You should NOT need to edit this file.
 *  All content changes go in site-config.js
 * ============================================================
 */

const C = SITE_CONFIG; // shorthand alias

/* ──────────────────────────────────────────────────────────
   1. APPLY THEME (CSS Variables from config)
────────────────────────────────────────────────────────── */
(function applyTheme() {
  const root = document.documentElement;
  const t = C.theme;
  if (!t) return;
  const map = {
    '--red':          t.colorPrimary,
    '--red-dark':     adjustColor(t.colorPrimary, -20),
    '--red-glow':     hexToRgba(t.colorPrimary, 0.35),
    '--gold':         t.colorGold,
    '--gold-light':   adjustColor(t.colorGold, 20),
    '--black':        t.colorBackground,
    '--dark':         t.colorDark,
    '--dark-2':       t.colorDark2,
    '--dark-3':       t.colorDark3,
    '--white':        t.colorText,
    '--gray-light':   t.colorTextMuted,
    '--gray':         t.colorTextGray,
    '--shadow-red':   `0 8px 40px ${hexToRgba(t.colorPrimary, 0.3)}`,
  };
  Object.entries(map).forEach(([k, v]) => { if (v) root.style.setProperty(k, v); });

  // Favicon
  if (C.brand && C.brand.favicon) {
    let fav = document.querySelector("link[rel='icon']");
    if (!fav) { fav = document.createElement('link'); fav.rel = 'icon'; document.head.appendChild(fav); }
    fav.href = C.brand.favicon;
  }
})();

/* ──────────────────────────────────────────────────────────
   2. BRAND / NAV
────────────────────────────────────────────────────────── */
function buildNav() {
  const b = C.brand;
  const n = C.nav;

  // Logo + brand name
  document.querySelector('#nav-logo-img').src = b.logo;
  document.querySelector('#nav-logo-img').alt = b.name;
  document.querySelector('#nav-brand-name').textContent = b.name;

  // CTA button
  const cta = document.getElementById('nav-cta-btn');
  cta.textContent = n.cta.label;
  cta.href = n.cta.href;

  // Desktop links
  const ul = document.getElementById('nav-links');
  ul.innerHTML = n.links
    .filter(l => l.enabled !== false)
    .map(l => `<li><a href="${l.href}" class="nav-link">${l.label}</a></li>`)
    .join('');

  // Mobile links
  const mob = document.getElementById('mobile-links');
  mob.innerHTML = n.links
    .filter(l => l.enabled !== false)
    .map(l => `<li><a href="${l.href}" class="mobile-link">${l.label}</a></li>`)
    .join('') +
    `<li><a href="${n.cta.href}" class="btn btn-primary" style="width:100%;text-align:center;">${n.cta.label}</a></li>`;
}

/* ──────────────────────────────────────────────────────────
   3. HERO SLIDER
────────────────────────────────────────────────────────── */
function buildHero() {
  const h = C.hero;
  const slider = document.getElementById('hero-slider');
  const dotsEl = document.getElementById('hero-dots');

  slider.innerHTML = h.slides.map((s, i) => `
    <div class="hero-slide${i === 0 ? ' active' : ''}" style="--bg: url('${s.image}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-eyebrow">${s.eyebrow}</div>
        <h1 class="hero-title">${s.title}</h1>
        <p class="hero-sub">${s.subtitle}</p>
        <div class="hero-btns">
          ${s.buttons.map(b => `<a href="${b.href}" class="btn btn-${b.style} btn-lg">${b.label}</a>`).join('')}
        </div>
      </div>
      ${s.caption ? `
      <div class="hero-slide-caption">
        <span class="caption-tag">${s.caption.tag}</span>
        <p class="caption-text">${s.caption.text}</p>
      </div>` : ''}
    </div>
  `).join('');

  dotsEl.innerHTML = h.slides.map((_, i) =>
    `<button class="hero-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
  ).join('');
}

/* ──────────────────────────────────────────────────────────
   4. STATS STRIP
────────────────────────────────────────────────────────── */
function buildStats() {
  const el = document.getElementById('stats-inner');
  el.innerHTML = C.stats.map((s, i) => `
    ${i > 0 ? '<div class="stat-divider"></div>' : ''}
    <div class="stat-item">
      <div class="stat-value-row">
        <span class="stat-number" data-target="${s.number}">0</span>
        <span class="stat-suffix">${s.suffix}</span>
      </div>
      <span class="stat-label">${s.label}</span>
    </div>
  `).join('');
}

/* ──────────────────────────────────────────────────────────
   5. ABOUT SECTION
────────────────────────────────────────────────────────── */
function buildAbout() {
  const a = C.about;
  if (!a || a.enabled === false) { document.getElementById('about').style.display = 'none'; return; }

  const iconMap = {
    star:  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    award: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  };

  document.getElementById('about').innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-img-col">
          <div class="about-img-wrapper reveal">
            <img src="${a.image}" alt="Boxing training at Mister Round" class="about-img" loading="lazy" />
            <div class="about-badge">
              <img src="${C.brand.logo}" alt="${C.brand.name}" class="about-badge-logo" />
            </div>
          </div>
        </div>
        <div class="about-text-col">
          <div class="section-eyebrow reveal">${a.eyebrow}</div>
          <h2 class="section-title reveal">${a.title}</h2>
          ${a.paragraphs.map(p => `<p class="section-body reveal">${p}</p>`).join('')}
          ${a.valuesList && a.valuesList.length ? `
            <div class="values-chips reveal">
              ${a.valuesList.map(v => `<span class="value-chip"><strong>${v.name}</strong> &bull; ${v.desc}</span>`).join('')}
            </div>
          ` : ''}
          <div class="pillars reveal" style="margin-top:2rem">
            ${a.pillars.map(p => `
              <div class="pillar">
                <div class="pillar-icon">${iconMap[p.icon] || ''}</div>
                <div><strong>${p.title}</strong><p>${p.desc}</p></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   6. PROGRAMS SECTION
────────────────────────────────────────────────────────── */
function buildPrograms() {
  const p = C.programs;
  if (!p || p.enabled === false) { document.getElementById('programs').style.display = 'none'; return; }

  const disciplineIcons = {
    'strength-conditioning': `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12M4 7v10M20 7v10"/></svg>`,
    'hiit-cardio': `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    'recovery-mobility': `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
    default: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  };

  const summaries = {
    'scopes-boxing': 'Official Boxing Ontario facility. 5-step boxing method for all fitness levels & ages.',
    'strength-conditioning': 'Progressive compound strength, core stability, and athletic movement integrity.',
    'hiit-cardio': 'High-energy athletic interval training to boost aerobic lung capacity & stamina.',
    'recovery-mobility': 'Spine decompression, joint mobility & functional recovery for lasting vitality.'
  };

  const cardHTML = p.items.map(item => {
    const isLive = item.status === 'live';
    const featuredClass = item.featured ? 'program-card--featured' : 'program-card--coming';
    const iconSvg = disciplineIcons[item.id] || disciplineIcons.default;
    const summaryText = summaries[item.id] || (item.desc ? item.desc.slice(0, 90) + '...' : '');

    return `
      <div class="program-card ${featuredClass} reveal" id="prog-${item.id}" tabindex="0" role="region" aria-label="${item.title}">
        <div class="program-card-img${!item.image ? ' program-card-img--dark' : ''}">
          ${item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" />`
            : `<div class="coming-icon">${iconSvg}</div>`
          }
          <div class="program-card-badge${!isLive ? ' program-card-badge--soon' : ''}">
            ${item.badge || (isLive ? 'NOW LIVE' : 'IN DEVELOPMENT')}
          </div>
        </div>
        <div class="program-card-body">
          <div class="program-number">${item.number}</div>
          <h3 class="program-title">${item.title}</h3>
          <p class="program-summary">${summaryText}</p>

          <button class="program-tile-toggle" type="button" aria-expanded="false" aria-controls="prog-details-${item.id}">
            <span class="toggle-label">VIEW DETAILS</span>
            <span class="toggle-chevron">▾</span>
          </button>

          <!-- COLLAPSIBLE DETAILS (Shown only when tile is clicked) -->
          <div class="program-card-details" id="prog-details-${item.id}">
            <p class="program-desc">${item.desc}</p>
            ${item.features ? `
              <ul class="program-features">
                ${item.features.map(f => `<li><span class="check">✓</span> <span>${f}</span></li>`).join('')}
              </ul>
            ` : ''}
            <a href="${item.cta.href}" class="btn ${isLive ? 'btn-primary' : 'btn-outline'} program-btn">${item.cta.label}</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('programs').innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <div class="section-eyebrow">${p.eyebrow}</div>
        <h2 class="section-title">${p.title}</h2>
        <p class="section-sub">${p.subtitle}</p>
      </div>
      <div class="programs-grid">${cardHTML}</div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   7. SCOPES BOXING SECTION
────────────────────────────────────────────────────────── */
function buildScopes() {
  const s = C.scopes;
  if (!s || s.enabled === false) { document.getElementById('scopes').style.display = 'none'; return; }

  document.getElementById('scopes').innerHTML = `
    <div class="scopes-bg">
      <div class="container">
        <div class="scopes-header reveal">
          <div class="section-eyebrow" style="color:var(--gold)">${s.eyebrow}</div>
          <h2 class="section-title" style="color:#fff">${s.title}</h2>
          <p class="section-sub" style="color:rgba(255,255,255,0.7)">${s.subtitle}</p>
        </div>

        <div class="scopes-pentagon-layout reveal" id="scopes-pentagon-layout">
          <!-- Dynamic Dotted Connecting Line Overlay -->
          <svg class="pentagon-live-arrow-svg" id="pentagon-live-arrow-svg" aria-hidden="true">
            <path id="pentagon-arrow-path" class="pentagon-arrow-path" />
          </svg>

          <!-- LEFT COLUMN: BIG PENTAGON DIVIDED INTO 5 CLICKABLE SECTIONS -->
          <div class="pentagon-left-col">
            <div class="pentagon-badge-strip">
              <span class="pentagon-badge-icon">⚡</span>
              <span class="pentagon-badge-text">THE 5-SECTION METHOD PENTAGON</span>
            </div>
            <div class="pentagon-svg-wrapper">
              <svg viewBox="0 0 600 600" class="scopes-pentagon-svg" id="scopes-pentagon-svg" role="img" aria-label="Interactive 5-Section Scopes Method Pentagon">
                <defs>
                  <filter id="wedge-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <linearGradient id="wedge-active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.35"/>
                    <stop offset="60%" stop-color="#222530" stop-opacity="0.95"/>
                    <stop offset="100%" stop-color="#181920" stop-opacity="0.98"/>
                  </linearGradient>
                </defs>

                <!-- Rotating Wheel of 5 Clickable Triangular Wedges -->
                <g id="pentagon-rotating-wheel" class="pentagon-rotating-wheel">
                  <!-- SECTION 1: Top-Right (Eyes Speed) -->
                  <g class="pentagon-wedge-group is-active" data-section="1" id="wedge-sec-1" role="button" tabindex="0">
                    <polygon points="300,300 300,45 542.5,221.2" class="pentagon-wedge" />
                    <g class="wedge-label-group" id="wedge-label-1">
                      <circle cx="380" cy="165" r="18" class="wedge-badge-circle" />
                      <text x="380" y="171" text-anchor="middle" class="wedge-badge-num">01</text>
                      <text x="380" y="200" text-anchor="middle" class="wedge-text-title">EYES SPEED</text>
                      <text x="380" y="214" text-anchor="middle" class="wedge-text-tag">FOCUS</text>
                    </g>
                  </g>

                  <!-- SECTION 2: Bottom-Right (Lungs Capacity) -->
                  <g class="pentagon-wedge-group" data-section="2" id="wedge-sec-2" role="button" tabindex="0">
                    <polygon points="300,300 542.5,221.2 449.9,506.3" class="pentagon-wedge" />
                    <g class="wedge-label-group" id="wedge-label-2">
                      <circle cx="430" cy="322" r="18" class="wedge-badge-circle" />
                      <text x="430" y="328" text-anchor="middle" class="wedge-badge-num">02</text>
                      <text x="430" y="357" text-anchor="middle" class="wedge-text-title">LUNGS</text>
                      <text x="430" y="371" text-anchor="middle" class="wedge-text-tag">ENDURANCE</text>
                    </g>
                  </g>

                  <!-- SECTION 3: Bottom (Upper Body Strength) -->
                  <g class="pentagon-wedge-group" data-section="3" id="wedge-sec-3" role="button" tabindex="0">
                    <polygon points="300,300 449.9,506.3 150.1,506.3" class="pentagon-wedge" />
                    <g class="wedge-label-group" id="wedge-label-3">
                      <circle cx="300" cy="417" r="18" class="wedge-badge-circle" />
                      <text x="300" y="423" text-anchor="middle" class="wedge-badge-num">03</text>
                      <text x="300" y="452" text-anchor="middle" class="wedge-text-title">UPPER BODY</text>
                      <text x="300" y="466" text-anchor="middle" class="wedge-text-tag">POWER</text>
                    </g>
                  </g>

                  <!-- SECTION 4: Bottom-Left (Lower Body Strength) -->
                  <g class="pentagon-wedge-group" data-section="4" id="wedge-sec-4" role="button" tabindex="0">
                    <polygon points="300,300 150.1,506.3 57.5,221.2" class="pentagon-wedge" />
                    <g class="wedge-label-group" id="wedge-label-4">
                      <circle cx="170" cy="322" r="18" class="wedge-badge-circle" />
                      <text x="170" y="328" text-anchor="middle" class="wedge-badge-num">04</text>
                      <text x="170" y="357" text-anchor="middle" class="wedge-text-title">LOWER BODY</text>
                      <text x="170" y="371" text-anchor="middle" class="wedge-text-tag">STABILITY</text>
                    </g>
                  </g>

                  <!-- SECTION 5: Top-Left (Technical Skills) -->
                  <g class="pentagon-wedge-group" data-section="5" id="wedge-sec-5" role="button" tabindex="0">
                    <polygon points="300,300 57.5,221.2 300,45" class="pentagon-wedge" />
                    <g class="wedge-label-group" id="wedge-label-5">
                      <circle cx="220" cy="165" r="18" class="wedge-badge-circle" />
                      <text x="220" y="171" text-anchor="middle" class="wedge-badge-num">05</text>
                      <text x="220" y="200" text-anchor="middle" class="wedge-text-title">TECHNIQUE</text>
                      <text x="220" y="214" text-anchor="middle" class="wedge-text-tag">MASTERY</text>
                    </g>
                  </g>
                </g>

                <!-- Center Emblem Hub -->
                <g class="pentagon-hub" transform="translate(300, 300)">
                  <circle r="46" class="hub-base" />
                  <circle r="40" class="hub-ring" />
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" />
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" />
                  <text y="-4" text-anchor="middle" class="hub-txt-top">SCOPES</text>
                  <text y="14" text-anchor="middle" class="hub-txt-bot">METHOD</text>
                </g>
              </svg>
            </div>
            <p class="pentagon-hint-text">Click any of the 5 sections on the pentagon to view its training method</p>
          </div>

          <!-- RIGHT COLUMN: DESCRIPTION OF THE SELECTED AREA ALIGNED WITH PENTAGON -->
          <div class="pentagon-right-col">
            <div class="pentagon-detail-card" id="pentagon-detail-card">
              <div class="detail-card-header">
                <div class="detail-badge-group">
                  <span class="detail-pill" id="detail-pill">PILLAR 01 • FOCUS</span>
                  <span class="detail-status">● ACTIVE SELECTION</span>
                </div>
                <div class="detail-num" id="detail-num">01</div>
              </div>

              <h3 class="detail-title" id="detail-title">Eyes Speed</h3>
              <p class="detail-tagline" id="detail-tagline">Reaction & Visual Focus Under Pressure</p>
              
              <p class="detail-desc" id="detail-desc">
                Boosts focus and reaction speed for attack, defense, work, play, even cooking.
              </p>

              <div class="detail-bullets" id="detail-bullets">
                <div class="detail-bullet-item">
                  <div class="bullet-icon">⚡</div>
                  <div>
                    <strong id="detail-b1-title">Reflexes & Visual Acuity</strong>
                    <p id="detail-b1-desc">Trains split-second response time and peripheral threat awareness.</p>
                  </div>
                </div>
                <div class="detail-bullet-item">
                  <div class="bullet-icon">🎯</div>
                  <div>
                    <strong id="detail-b2-title">Why It Works</strong>
                    <p id="detail-b2-desc">When you see movement early, you expend far less energy defending and countering.</p>
                  </div>
                </div>
                <div class="detail-bullet-item">
                  <div class="bullet-icon">🥊</div>
                  <div>
                    <strong id="detail-b3-title">How We Train It</strong>
                    <p id="detail-b3-desc">Reaction balls, mitt drills, slipped punches, and coach-guided speed work.</p>
                  </div>
                </div>
              </div>

              <div class="detail-footer">
                <div class="detail-dots" id="detail-dots">
                  <button class="dot-btn is-active" data-section="1" type="button" aria-label="Section 1"></button>
                  <button class="dot-btn" data-section="2" type="button" aria-label="Section 2"></button>
                  <button class="dot-btn" data-section="3" type="button" aria-label="Section 3"></button>
                  <button class="dot-btn" data-section="4" type="button" aria-label="Section 4"></button>
                  <button class="dot-btn" data-section="5" type="button" aria-label="Section 5"></button>
                </div>
                <div class="detail-nav-buttons">
                  <button class="btn-prev-section" id="btn-prev-sec" type="button">← PREV</button>
                  <button class="btn-next-section" id="btn-next-sec" type="button">NEXT PILLAR →</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="first-timer-banner reveal">
          <div class="first-timer-item">
            <span class="first-timer-num">1</span>
            <div><strong>Wear Regular Gym Clothes</strong><p>T-shirt, shorts/trackpants, and clean running shoes.</p></div>
          </div>
          <div class="first-timer-item">
            <span class="first-timer-num">2</span>
            <div><strong>Free Gear Provided</strong><p>Hand wraps, gloves, and protective gear provided.</p></div>
          </div>
          <div class="first-timer-item">
            <span class="first-timer-num">3</span>
            <div><strong>Your Pace & 100% Free</strong><p>Certified coaches guide you individually with zero pressure.</p></div>
          </div>
        </div>

        <div class="scopes-cta reveal">
          <p class="scopes-cta-text">${s.info.address || s.info.location} &bull; ${s.info.phone} &bull; ${s.info.hours}</p>
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem;">
            <a href="#contact" class="btn btn-primary btn-lg">BOOK YOUR FIRST CLASS</a>
            <a href="${s.mapsUrl || s.info.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-lg">📍 VIEW ON GOOGLE MAPS</a>
            <a href="${s.facebookUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-lg">VISIT ON FACEBOOK</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   8. HOW IT WORKS
────────────────────────────────────────────────────────── */
function buildHowItWorks() {
  const h = C.howItWorks;
  if (!h || h.enabled === false) { document.getElementById('how-it-works').style.display = 'none'; return; }

  document.getElementById('how-it-works').innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <div class="section-eyebrow">${h.eyebrow}</div>
        <h2 class="section-title">${h.title.replace(/\n/g, '<br/>')}</h2>
      </div>
      <div class="steps-grid">
        ${h.steps.map((s, i) => `
          <div class="step reveal" data-delay="${i * 0.1}">
            <div class="step-number">${s.number}</div>
            <div class="step-content">
              <h3 class="step-title">${s.title}</h3>
              <p class="step-desc">${s.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   9. COACHES SECTION
────────────────────────────────────────────────────────── */
function buildCoaches() {
  const c = C.coaches;
  if (!c || c.enabled === false) { document.getElementById('coaches').style.display = 'none'; return; }

  document.getElementById('coaches').innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <div class="section-eyebrow">${c.eyebrow}</div>
        <h2 class="section-title">${c.title}</h2>
        <p class="section-sub">${c.subtitle}</p>
      </div>
      <div class="coaches-grid">
        ${c.items.map((coach, i) => `
          <div class="coach-card reveal" id="coach-${coach.id}" data-delay="${i * 0.15}">
            <div class="coach-img-wrapper">
              <img src="${coach.image}" alt="${coach.displayName}" class="coach-img" loading="lazy" />
              <div class="coach-role-badge${coach.badgeStyle === 'gold' ? ' coach-role-badge--assist' : ''}">${coach.badge}</div>
            </div>
            <div class="coach-info">
              <div class="coach-meta">
                <div class="coach-flag">${coach.flag}</div>
                <div class="coach-years">${coach.experience}</div>
              </div>
              <h3 class="coach-name">${coach.show ? coach.name : coach.displayName}</h3>
              <p class="coach-title">${coach.role}</p>
              <p class="coach-bio">${coach.bio}</p>
              <div class="coach-specialties">
                ${coach.specialties.map(s => `<span class="specialty-tag">${s}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="coaches-cta reveal">
        <p class="coaches-cta-text">Both coaches are on the floor for every session — no exceptions.</p>
        <a href="#contact" class="btn btn-primary btn-lg">TRAIN WITH THEM</a>
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   10. GALLERY SECTION + LIGHTBOX
────────────────────────────────────────────────────────── */
let galleryItems = [];
let lightboxIndex = 0;

function buildGallery() {
  const g = C.gallery;
  const section = document.getElementById('gallery');
  if (!g || g.enabled === false || !g.items.length) { section.style.display = 'none'; return; }

  galleryItems = g.items;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <div class="section-eyebrow">${g.eyebrow}</div>
        <h2 class="section-title">${g.title}</h2>
        <p class="section-sub">${g.subtitle}</p>
      </div>

      <!-- UNIFORM GALLERY CAROUSEL -->
      <div class="gallery-carousel-wrapper reveal" id="gallery-carousel">
        <div class="gallery-carousel-stage">
          <div class="gallery-carousel-viewport">
            <div class="gallery-carousel-track" id="gallery-carousel-track">
              ${g.items.map((item, i) => `
                <div class="gallery-slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
                  <div class="gallery-slide-card" role="button" tabindex="0" aria-label="View photo ${i + 1}: ${item.caption}">
                    <img src="${item.src}" alt="${item.caption || 'Boxing gym moment'}" class="gallery-slide-img" loading="${i === 0 ? 'eager' : 'lazy'}" />
                    <div class="gallery-slide-overlay">
                      <div class="slide-meta">
                        <span class="slide-tag">GYM MOMENT</span>
                        <span class="slide-counter">${String(i + 1).padStart(2, '0')} / ${String(g.items.length).padStart(2, '0')}</span>
                      </div>
                      <h4 class="slide-caption">${item.caption}</h4>
                      <div class="slide-zoom-hint">
                        <span class="zoom-icon">🔍</span>
                        <span>Click to enlarge in full screen</span>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Carousel Controls: Previous and Next Arrows -->
          <button class="carousel-arrow carousel-arrow--prev" id="gallery-prev-btn" type="button" aria-label="Previous photo">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="carousel-arrow carousel-arrow--next" id="gallery-next-btn" type="button" aria-label="Next photo">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <!-- Uniform Thumbnail Navigation Strip -->
        <div class="gallery-thumbs-strip" id="gallery-thumbs-strip">
          ${g.items.map((item, i) => `
            <button class="gallery-thumb-item ${i === 0 ? 'is-active' : ''}" data-index="${i}" type="button" aria-label="Go to photo ${i + 1}">
              <img src="${item.src}" alt="" class="thumb-img" loading="lazy" />
            </button>
          `).join('')}
        </div>

        <!-- Pagination Indicator Dots -->
        <div class="gallery-dots" id="gallery-dots">
          ${g.items.map((_, i) => `
            <button class="gallery-dot-btn ${i === 0 ? 'is-active' : ''}" data-index="${i}" type="button" aria-label="Slide ${i + 1}"></button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function buildGalleryThumb(item, i) {
  if (item.type === 'photo') {
    return `<img src="${item.src}" alt="${item.caption || 'Gallery image'}" loading="lazy" class="gallery-img" />`;
  }
  if (item.type === 'video') {
    return `
      <video class="gallery-img" preload="metadata" muted ${item.poster ? `poster="${item.poster}"` : ''}>
        <source src="${item.src}" type="video/mp4" />
      </video>
      <div class="gallery-play-icon">▶</div>
    `;
  }
  if (item.type === 'youtube') {
    const vid = extractYouTubeId(item.src);
    return `
      <img src="https://img.youtube.com/vi/${vid}/hqdefault.jpg" alt="${item.caption || 'Video'}" class="gallery-img" loading="lazy" />
      <div class="gallery-play-icon">▶</div>
    `;
  }
  return '';
}

function openLightbox(index) {
  lightboxIndex = index;
  renderLightboxContent();
  document.getElementById('lightbox').classList.add('open');
  document.getElementById('lightbox-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightbox-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  // Stop any playing video
  document.querySelectorAll('#lightbox-content video').forEach(v => v.pause());
}

function renderLightboxContent() {
  const item = galleryItems[lightboxIndex];
  const content = document.getElementById('lightbox-content');
  const caption = document.getElementById('lightbox-caption');
  const counter = document.getElementById('lightbox-counter');

  // Stop previous video
  content.querySelectorAll('video').forEach(v => v.pause());

  if (item.type === 'photo') {
    content.innerHTML = `<img src="${item.src}" alt="${item.caption || ''}" class="lightbox-img" />`;
  } else if (item.type === 'video') {
    content.innerHTML = `
      <video class="lightbox-video" controls autoplay ${item.poster ? `poster="${item.poster}"` : ''}>
        <source src="${item.src}" type="video/mp4" />
      </video>
    `;
  } else if (item.type === 'youtube') {
    const vid = extractYouTubeId(item.src);
    content.innerHTML = `<iframe class="lightbox-video" src="https://www.youtube.com/embed/${vid}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  caption.textContent = item.caption || '';
  counter.textContent = `${lightboxIndex + 1} / ${galleryItems.length}`;
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
  renderLightboxContent();
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % galleryItems.length;
  renderLightboxContent();
}

function extractYouTubeId(url) {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : '';
}

/* ──────────────────────────────────────────────────────────
   11. CALLOUT SECTION
────────────────────────────────────────────────────────── */
function buildCallout() {
  const c = C.callout;
  const section = document.getElementById('callout-section');
  if (!c || c.enabled === false) { section.style.display = 'none'; return; }

  section.innerHTML = `
    <div class="callout-img-wrapper">
      <img src="${c.image}" alt="Expert coaching" class="callout-img" loading="lazy" />
      <div class="callout-overlay">
        <div class="callout-content reveal">
          <div class="section-eyebrow" style="color:var(--gold)">${c.eyebrow}</div>
          <h2 class="callout-title">${c.title.replace(/\n/g, '<br/>')}</h2>
          <p class="callout-desc">${c.desc}</p>
          <a href="${c.cta.href}" class="btn btn-primary btn-lg">${c.cta.label}</a>
        </div>
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   12. TESTIMONIALS
────────────────────────────────────────────────────────── */
function buildTestimonials() {
  const t = C.testimonials;
  const section = document.getElementById('testimonials');
  if (!t || t.enabled === false) { section.style.display = 'none'; return; }

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <div class="section-eyebrow">${t.eyebrow}</div>
        <h2 class="section-title">${t.title}</h2>
      </div>
      <div class="testimonials-grid">
        ${t.items.map((r, i) => `
          <div class="testimonial-card reveal" data-delay="${i * 0.1}">
            <div class="testimonial-stars">${'★'.repeat(r.stars)}</div>
            <p class="testimonial-text">"${r.text}"</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">${r.initials}</div>
              <div>
                <strong>${r.author}</strong>
                <span>${r.role}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   12. FAQ (QUICK ANSWERS)
────────────────────────────────────────────────────────── */
function buildFAQ() {
  const f = C.faq;
  const section = document.getElementById('faq');
  if (!section) return;
  if (!f || f.enabled === false) { section.style.display = 'none'; return; }

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal" style="text-align:center;max-width:700px;margin:0 auto 3rem auto;">
        <div class="section-eyebrow" style="color:var(--gold)">${f.eyebrow}</div>
        <h2 class="section-title">${f.title}</h2>
        <p class="section-sub">${f.subtitle}</p>
      </div>

      <div class="faq-grid reveal">
        ${f.items.map(item => `
          <div class="faq-card">
            <h4 class="faq-question">${item.q}</h4>
            <p class="faq-answer">${item.a}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   13. CONTACT SECTION
────────────────────────────────────────────────────────── */
function buildContact() {
  const c = C.contact;
  const section = document.getElementById('contact');
  if (!c || c.enabled === false) { section.style.display = 'none'; return; }

  const iconMap = {
    'map-pin': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    'phone':   `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    'mail':    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    'clock':   `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  };
  const socialIcons = {
    facebook:  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    twitter:   `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>`,
  };

  section.innerHTML = `
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info reveal">
          <div class="section-eyebrow">${c.eyebrow}</div>
          <h2 class="section-title">${c.title.replace(/\n/g, '<br/>')}</h2>
          <p class="section-body">${c.subtitle}</p>
          <div class="contact-details">
            ${c.details.map(d => `
              <div class="contact-detail">
                <div class="contact-detail-icon">${iconMap[d.icon] || ''}</div>
                <div>
                  ${d.link ? `<a href="${d.link}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;"><strong>${d.label}</strong></a>` : `<strong>${d.label}</strong>`}
                  <span>${d.sub}</span>
                </div>
              </div>
            `).join('')}
            ${c.socials.filter(s => s.enabled).length ? `
              <div class="contact-detail">
                <div style="display:flex;gap:.75rem;margin-top:.25rem">
                  ${c.socials.filter(s => s.enabled).map(s => `
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="${s.platform}">
                      ${socialIcons[s.platform] || ''}
                    </a>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="contact-form-wrap reveal" data-delay="0.1">
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-group">
              <label for="name-input" class="form-label">Full Name</label>
              <input type="text" id="name-input" name="name" class="form-input" placeholder="Your full name" required />
            </div>
            <div class="form-group">
              <label for="email-input" class="form-label">Email Address</label>
              <input type="email" id="email-input" name="email" class="form-input" placeholder="your@email.com" required />
            </div>
            <div class="form-group">
              <label for="program-select" class="form-label">Program Interest</label>
              <select id="program-select" name="program" class="form-input">
                <option value="">Select a program...</option>
                ${c.form.programOptions.map(o => `<option value="${o}">${o}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="message-input" class="form-label">Message (Optional)</label>
              <textarea id="message-input" name="message" class="form-input form-textarea" placeholder="Tell us about your goals or ask any questions..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full" id="submit-btn">${c.form.submitLabel}</button>
            <p class="form-note">No commitment required. We'll reach out within 24 hours.</p>
          </form>
        </div>
      </div>
    </div>
  `;

  // Form submission
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    if (!name || !email) { showToast('Please fill in your name and email.'); return; }
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'SENDING...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = C.contact.form.submitLabel;
      btn.disabled = false;
      document.getElementById('contact-form').reset();
      showToast(`Thanks, ${name}! ${C.contact.form.successMessage}`);
    }, 1200);
  });
}

/* ──────────────────────────────────────────────────────────
   14. FOOTER
────────────────────────────────────────────────────────── */
function buildFooter() {
  const f = C.footer;
  const n = C.nav;

  document.getElementById('footer-grid').innerHTML = `
    <div class="footer-brand">
      <img src="${C.brand.logo}" alt="${C.brand.name}" class="footer-logo" />
      <p class="footer-tagline">${C.brand.name} — ${C.brand.tagline}</p>
      <div class="footer-socials">
        ${C.contact.socials.filter(s => s.enabled).map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="${s.platform}">
            ${s.platform === 'facebook'
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
            }
          </a>
        `).join('')}
      </div>
    </div>
    <div class="footer-col">
      <h4 class="footer-col-title">Programs</h4>
      <ul class="footer-links">
        ${C.programs.items.map(p => `<li><a href="#prog-${p.id}" class="footer-link">${p.title}</a></li>`).join('')}
      </ul>
    </div>
    <div class="footer-col">
      <h4 class="footer-col-title">Company</h4>
      <ul class="footer-links">
        <li><a href="#about" class="footer-link">About</a></li>
        <li><a href="#faq" class="footer-link">FAQ</a></li>
        <li><a href="#gallery" class="footer-link">Gallery</a></li>
        <li><a href="#testimonials" class="footer-link">Community</a></li>
        <li><a href="#contact" class="footer-link">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 class="footer-col-title">Get Started</h4>
      <p class="footer-col-text">Ready to step into the ring? Your first class is on us.</p>
      <a href="${n.cta.href}" class="btn btn-primary" style="margin-top:1rem;display:inline-block;">${n.cta.label}</a>
    </div>
  `;

  document.getElementById('footer-bottom-inner').innerHTML = `
    <p>${f.copyright}</p>
    <p class="footer-partner">${f.partnerText} <a href="${f.partnerUrl}" target="_blank" rel="noopener noreferrer">${f.partnerName}</a> — ${f.partnerSub}</p>
  `;
}

/* ──────────────────────────────────────────────────────────
   15. INTERACTIVITY (Navbar, Slider, Scroll Reveal, etc.)
────────────────────────────────────────────────────────── */
function initInteractivity() {
  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNavLink();
  }, { passive: true });

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-link, .mobile-menu .btn').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (document.getElementById('lightbox').classList.contains('open')) {
        closeLightbox();
      }
    }
  });

  // Hero slider
  initSlider();

  // Programs click-to-expand
  initProgramsAccordion();

  // Scroll reveal
  initReveal();

  // Stat counters
  initCounters();

  // Scopes feature bars & Pentagon
  initFeatureBars();
  initPentagonInteractivity();

  // Gallery Carousel
  initGalleryCarousel();

  // Lightbox
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-backdrop').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', lightboxPrev);
  document.getElementById('lightbox-next').addEventListener('click', lightboxNext);
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = 80;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
      }
    });
  });
}

function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  let interval;

  function go(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { go(current + 1); }
  function prev() { go(current - 1); }
  function resetInterval() { clearInterval(interval); interval = setInterval(next, C.hero.autoplayInterval || 5000); }

  interval = setInterval(next, C.hero.autoplayInterval || 5000);

  document.getElementById('hero-next').addEventListener('click', () => { next(); resetInterval(); });
  document.getElementById('hero-prev').addEventListener('click', () => { prev(); resetInterval(); });
  document.querySelectorAll('.hero-dot').forEach(dot => {
    dot.addEventListener('click', () => { go(parseInt(dot.dataset.index)); resetInterval(); });
  });

  // Touch swipe
  let tx = 0;
  const sl = document.getElementById('hero-slider');
  sl.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  sl.addEventListener('touchend', e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetInterval(); }
  }, { passive: true });

  // Parallax
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      const activeSlide = document.querySelector('.hero-slide.active');
      if (activeSlide) activeSlide.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

function initProgramsAccordion() {
  const cards = document.querySelectorAll('.program-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const toggleBtn = card.querySelector('.program-tile-toggle');
    const toggleLabel = card.querySelector('.toggle-label');

    function toggleTile(e) {
      if (e) {
        e.stopPropagation();
      }
      const isExpanded = card.classList.contains('is-expanded');

      // Close other cards so mental load stays low
      cards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('is-expanded')) {
          otherCard.classList.remove('is-expanded');
          const btn = otherCard.querySelector('.program-tile-toggle');
          const lbl = otherCard.querySelector('.toggle-label');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          if (lbl) lbl.textContent = 'VIEW DETAILS';
        }
      });

      if (isExpanded) {
        card.classList.remove('is-expanded');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        if (toggleLabel) toggleLabel.textContent = 'VIEW DETAILS';
      } else {
        card.classList.add('is-expanded');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
        if (toggleLabel) toggleLabel.textContent = 'HIDE DETAILS';
      }
    }

    // Clicking anywhere on the tile card (except the CTA link inside) toggles details
    card.addEventListener('click', e => {
      if (e.target.closest('.program-btn')) return;
      toggleTile(e);
    });

    // Keyboard support: Enter / Space triggers toggle when card is focused
    card.addEventListener('keydown', e => {
      if (e.target.closest('.program-btn')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTile(e);
      }
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('click', e => {
        e.stopPropagation();
        toggleTile(e);
      });
    }
  });
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initCounters() {
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (done || !entries[0].isIntersecting) return;
    done = true;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target);
      const step = 16;
      const inc = target / (1800 / step);
      let cur = 0;
      const t = setInterval(() => {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = Math.floor(cur);
      }, step);
    });
    obs.disconnect();
  }, { threshold: 0.5 });
  const strip = document.getElementById('stats-strip');
  if (strip) obs.observe(strip);
}

function initFeatureBars() {
  const bars = document.querySelectorAll('.scopes-feature-bar');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => { entry.target.style.width = '40px'; entry.target.style.opacity = '1'; }, i * 100);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => {
    b.style.cssText = 'width:0;opacity:0;transition:width 0.6s ease,opacity 0.4s ease';
    obs.observe(b);
  });
}

function initPentagonInteractivity() {
  const layout = document.getElementById('scopes-pentagon-layout');
  const wedges = document.querySelectorAll('.pentagon-wedge-group');
  const arrowPath = document.getElementById('pentagon-arrow-path');
  const card = document.getElementById('pentagon-detail-card');
  const dots = document.querySelectorAll('#detail-dots .dot-btn');
  const prevBtn = document.getElementById('btn-prev-sec');
  const nextBtn = document.getElementById('btn-next-sec');

  if (!layout || !wedges.length || !card) return;

  const sectionDetails = {
    1: {
      number: "01",
      tag: "FOCUS",
      title: "Eyes Speed",
      tagline: "Reaction & Visual Focus Under Pressure",
      desc: "Boosts focus and reaction speed for attack, defense, work, play, even cooking. Sharp visual acuity allows you to read movements before they occur and stay calm in high-intensity moments.",
      bullets: [
        { icon: "⚡", title: "Reflexes Under Pressure", desc: "Trains split-second response time and threats detection from peripheral vision." },
        { icon: "🎯", title: "Why It Works", desc: "When you see movement early, you expend far less energy defending and countering." },
        { icon: "🥊", title: "How We Train It", desc: "Special reaction balls, coach mitt cues, slipped punch drills, and visual pacing." }
      ]
    },
    2: {
      number: "02",
      tag: "ENDURANCE",
      title: "Lungs Capacity",
      tagline: "Cardiovascular Stamina & Aerobic Energy",
      desc: "Bigger lungs, better stamina and endurance in boxing and everyday life. Controlled breathing allows you to recover between rounds and keep mental composure when fatigued.",
      bullets: [
        { icon: "🫁", title: "Deep Lung Conditioning", desc: "Increases VO2 max and builds stamina so you finish round after round with high energy." },
        { icon: "⏱️", title: "Rhythm & Recovery", desc: "Learn controlled nasal breathing and relaxed tempo to instantly lower heart rate." },
        { icon: "🥊", title: "How We Train It", desc: "Interval heavy bag rounds, jump rope tempo shifts, and continuous boxing circuits." }
      ]
    },
    3: {
      number: "03",
      tag: "POWER",
      title: "Upper Body Strength",
      tagline: "Functional Strength & Kinetic Force",
      desc: "Functional strength and tone to reach your goals when the moment comes. Builds upper back, shoulder stability, and core rotation without bulky, restrictive muscle mass.",
      bullets: [
        { icon: "💥", title: "Kinetic Punching Power", desc: "Channels rotational force through hips, shoulders, and arms with zero joint strain." },
        { icon: "🛡️", title: "Defensive Guard Integrity", desc: "Bulletproofs the rotator cuff, upper back, and neck to maintain a high, safe guard." },
        { icon: "🥊", title: "How We Train It", desc: "Medicine ball slams, calisthenics, power bag snaps, and band-resisted strikes." }
      ]
    },
    4: {
      number: "04",
      tag: "STABILITY",
      title: "Lower Body Strength",
      tagline: "Footwork, Balance & Foundation Integrity",
      desc: "Strong legs keep you moving smoothly and standing tall without fading. Every great punch and defensive slip starts from the ground up through grounded footwork.",
      bullets: [
        { icon: "🦵", title: "Solid Base & Agility", desc: "Develops calves, quads, and hips for smooth lateral shifts, pivot turns, and balance." },
        { icon: "⚡", title: "Pivot & Weight Transfer", desc: "Generates explosive leverage while staying balanced and ready to escape danger." },
        { icon: "🥊", title: "How We Train It", desc: "Agility ladder sequences, stance push-offs, plyometric hops, and defensive slides." }
      ]
    },
    5: {
      number: "05",
      tag: "MASTERY",
      title: "Technical Skills",
      tagline: "Clean Boxing Fundamentals & Precision",
      desc: "Master clean boxing technique to do much more with far less effort. Fundamentals allow you to land punches cleanly, slip counters, and protect yourself with natural flow.",
      bullets: [
        { icon: "🎯", title: "Maximum Efficiency", desc: "Delivers clean, crisp impact using body mechanics rather than brute strain." },
        { icon: "🛡️", title: "Seamless Flow", desc: "Integrate stance, guard, jab, cross, hooks, and slips into fluid muscle memory." },
        { icon: "🥊", title: "How We Train It", desc: "One-on-one coach mitt drills, mirror shadowboxing, and guided partner flow." }
      ]
    }
  };

  const wheel = document.getElementById('pentagon-rotating-wheel');
  let currentSection = 1;
  let currentRotation = 54;
  let arrowAnimId = null;

  // Angles to rotate each wedge so it faces directly toward the description card:
  // Desktop: Card is on the RIGHT (East, 0 deg)
  const targetAnglesDesktop = {
    1: 54,    // 1 base angle -54° -> +54° rotates to 0° (right)
    2: -18,   // 2 base angle +18° -> -18° rotates to 0° (right)
    3: -90,   // 3 base angle +90° -> -90° rotates to 0° (right)
    4: -162,  // 4 base angle +162° -> -162° rotates to 0° (right)
    5: 126    // 5 base angle -126° -> +126° rotates to 0° (right)
  };

  // Mobile: Card is on the BOTTOM (South, 90 deg)
  const targetAnglesMobile = {
    1: 144,
    2: 72,
    3: 0,
    4: -72,
    5: -144
  };

  const labelCentroids = {
    1: [380, 185],
    2: [430, 345],
    3: [300, 440],
    4: [170, 345],
    5: [220, 185]
  };

  function updateArrow() {
    if (!arrowPath || !layout || !card) return;
    const layoutRect = layout.getBoundingClientRect();
    if (layoutRect.width === 0 || layoutRect.height === 0) return;

    const activeWedge = document.querySelector(`.pentagon-wedge-group[data-section="${currentSection}"]`);
    const badge = activeWedge ? activeWedge.querySelector('.wedge-badge-circle') : null;
    if (!badge) return;

    const badgeRect = badge.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const isDesktop = window.innerWidth > 1024;
    let x1, y1, x2, y2, d;

    if (isDesktop) {
      // The active wedge has pivoted to face the right side of the pentagon!
      // Start right at the outer edge of the badge
      x1 = badgeRect.right - layoutRect.left + 2;
      y1 = badgeRect.top + badgeRect.height / 2 - layoutRect.top;
      x2 = cardRect.left - layoutRect.left - 6;
      y2 = cardRect.top + 65 - layoutRect.top;

      const dx = Math.max(20, (x2 - x1) * 0.4);
      d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + dx).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - dx).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    } else {
      // Mobile: The active wedge has pivoted to the bottom of the pentagon!
      x1 = badgeRect.left + badgeRect.width / 2 - layoutRect.left;
      y1 = badgeRect.bottom - layoutRect.top + 2;
      x2 = cardRect.left + cardRect.width / 2 - layoutRect.left;
      y2 = cardRect.top - layoutRect.top - 8;

      d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }

    arrowPath.setAttribute('d', d);
  }

  function pivotPentagonToSection(secNum) {
    const isDesktop = window.innerWidth > 1024;
    const targetMap = isDesktop ? targetAnglesDesktop : targetAnglesMobile;
    const targetAngle = targetMap[secNum] !== undefined ? targetMap[secNum] : 0;

    // Calculate shortest angular turn
    const diff = ((targetAngle - (currentRotation % 360) + 540) % 360) - 180;
    currentRotation += diff;

    if (wheel) {
      wheel.style.transform = `rotate(${currentRotation}deg)`;
    }

    // Keep labels and badges upright during/after rotation
    for (let i = 1; i <= 5; i++) {
      const lbl = document.getElementById(`wedge-label-${i}`);
      if (lbl && labelCentroids[i]) {
        const [cx, cy] = labelCentroids[i];
        lbl.style.transformOrigin = `${cx}px ${cy}px`;
        lbl.style.transform = `rotate(${-currentRotation}deg)`;
        lbl.setAttribute('transform', `rotate(${-currentRotation}, ${cx}, ${cy})`);
      }
    }

    // Animate arrow dynamically as the wheel pivots so it remains connected in real time
    if (arrowAnimId) cancelAnimationFrame(arrowAnimId);
    const start = performance.now();
    function trackArrow(now) {
      updateArrow();
      if (now - start < 600) {
        arrowAnimId = requestAnimationFrame(trackArrow);
      } else {
        updateArrow();
      }
    }
    arrowAnimId = requestAnimationFrame(trackArrow);
  }

  function renderSection(secNum) {
    currentSection = parseInt(secNum, 10);
    const data = sectionDetails[currentSection];
    if (!data) return;

    // Pivot the pentagon so the selected area faces directly towards the description card
    pivotPentagonToSection(currentSection);

    wedges.forEach(w => {
      const active = parseInt(w.dataset.section, 10) === currentSection;
      w.classList.toggle('is-active', active);
      w.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    dots.forEach(d => {
      d.classList.toggle('is-active', parseInt(d.dataset.section, 10) === currentSection);
    });

    card.classList.add('is-switching');
    setTimeout(() => {
      const pill = document.getElementById('detail-pill');
      const num = document.getElementById('detail-num');
      const title = document.getElementById('detail-title');
      const tagline = document.getElementById('detail-tagline');
      const desc = document.getElementById('detail-desc');
      const bulletsCont = document.getElementById('detail-bullets');

      if (pill) pill.textContent = `PILLAR ${data.number} • ${data.tag}`;
      if (num) num.textContent = data.number;
      if (title) title.textContent = data.title;
      if (tagline) tagline.textContent = data.tagline;
      if (desc) desc.textContent = data.desc;

      if (bulletsCont && data.bullets) {
        bulletsCont.innerHTML = data.bullets.map(b => `
          <div class="detail-bullet-item">
            <div class="bullet-icon">${b.icon}</div>
            <div>
              <strong>${b.title}</strong>
              <p>${b.desc}</p>
            </div>
          </div>
        `).join('');
      }

      card.classList.remove('is-switching');
      updateArrow();
    }, 120);

    updateArrow();
  }

  wedges.forEach(w => {
    w.addEventListener('click', () => {
      renderSection(w.dataset.section);
    });
    w.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        renderSection(w.dataset.section);
      }
    });
  });

  dots.forEach(d => {
    d.addEventListener('click', () => {
      renderSection(d.dataset.section);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prevSec = currentSection === 1 ? 5 : currentSection - 1;
      renderSection(prevSec);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextSec = currentSection === 5 ? 1 : currentSection + 1;
      renderSection(nextSec);
    });
  }

  window.addEventListener('resize', updateArrow, { passive: true });
  window.addEventListener('scroll', updateArrow, { passive: true });

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      updateArrow();
    }
  }, { threshold: 0.1 });
  obs.observe(layout);

  renderSection(1);
  setTimeout(updateArrow, 100);
}

function initGalleryCarousel() {
  const carousel = document.getElementById('gallery-carousel');
  const track = document.getElementById('gallery-carousel-track');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  const thumbs = document.querySelectorAll('.gallery-thumb-item');
  const dots = document.querySelectorAll('.gallery-dot-btn');
  const slideCards = document.querySelectorAll('.gallery-slide-card');

  if (!carousel || !track || !slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const strip = document.getElementById('gallery-thumbs-strip');

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((s, i) => s.classList.toggle('is-active', i === currentSlide));
    thumbs.forEach((t, i) => t.classList.toggle('is-active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === currentSlide));

    // Smoothly center the active thumbnail strictly inside its horizontal container (never scroll window)
    const activeThumb = thumbs[currentSlide];
    if (activeThumb && strip) {
      const scrollLeft = activeThumb.offsetLeft - (strip.clientWidth / 2) + (activeThumb.offsetWidth / 2);
      strip.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', e => {
      e.preventDefault();
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', e => {
      e.preventDefault();
      nextSlide();
    });
  }

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', e => {
      e.preventDefault();
      goToSlide(idx);
    });
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', e => {
      e.preventDefault();
      goToSlide(idx);
    });
  });

  slideCards.forEach((card, idx) => {
    card.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(idx);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  // Touch Swipe for mobile/tablets
  let touchStartX = 0;
  let touchStartY = 0;
  const stage = carousel.querySelector('.gallery-carousel-stage');
  if (stage) {
    stage.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    stage.addEventListener('touchend', e => {
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }, { passive: true });
  }

  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Initial slide display
  goToSlide(0);
}

function updateActiveNavLink() {
  const sections = C.nav.links.filter(l => l.enabled !== false).map(l => l.href.replace('#', ''));
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const section = document.getElementById(id);
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!section || !link) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ──────────────────────────────────────────────────────────
   16. TOAST
────────────────────────────────────────────────────────── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}

/* ──────────────────────────────────────────────────────────
   UTILITIES
────────────────────────────────────────────────────────── */
function hexToRgba(hex, alpha) {
  if (!hex) return '';
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function adjustColor(hex, amount) {
  if (!hex) return '';
  let r = parseInt(hex.slice(1,3),16);
  let g = parseInt(hex.slice(3,5),16);
  let b = parseInt(hex.slice(5,7),16);
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

/* ──────────────────────────────────────────────────────────
   BOOT: Build everything from config
────────────────────────────────────────────────────────── */
(function boot() {
  buildNav();
  buildHero();
  buildStats();
  buildAbout();
  buildPrograms();
  buildScopes();
  buildHowItWorks();
  buildCoaches();
  buildGallery();
  buildCallout();
  buildTestimonials();
  buildFAQ();
  buildContact();
  buildFooter();
  initInteractivity();

  console.log('%cMister Round 🥊', 'font-size:24px;font-weight:bold;color:' + (C.theme.colorPrimary || '#C8102E'));
  console.log('%cEdit site-config.js to update all content.', 'color:' + (C.theme.colorGold || '#C9A84C') + ';font-size:13px;');
})();
