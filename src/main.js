import { portfolioData } from './data/portfolioData.js';
import { Hero3DScene } from './three/scene.js';
import { initTerminal } from './components/terminal.js';
import { initApiModal } from './components/apiModal.js';
import { initContactForm } from './components/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Hero Badge Scene
  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (heroCanvas) {
    new Hero3DScene(heroCanvas);
  }

  // 2. Initialize Interactive Components
  initTerminal();
  initApiModal();
  initContactForm();

  // 3. Render Case Studies, Skills, Journey
  renderProjects();
  renderSkills();
  renderJourney();

  // 4. Update Live Time in Solapur (IST)
  initLiveClock();

  // 5. Active Nav indicator on scroll
  initScrollNav();
});

// Real-time Solapur, India (IST) clock
function initLiveClock() {
  const clockEl = document.getElementById('live-time-tag');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockEl.textContent = `Solapur, IN • ${timeStr} IST`;
  }

  update();
  setInterval(update, 1000);
}

// Render Engineering Case Studies
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = portfolioData.projects.map(p => `
    <article class="case-study-card">
      <div class="case-study-header">
        <h3 class="case-study-title">${p.title}</h3>
        <span class="case-study-category">${p.category} • ${p.year}</span>
      </div>
      
      <p class="case-study-tagline">${p.tagline}</p>

      <div class="case-study-grid">
        <!-- Left: The Narrative & Technical Decisions -->
        <div class="case-study-narrative">
          <div class="story-block">
            <div class="story-label">Motivation & Background</div>
            <p class="story-text">${p.whyBuilt}</p>
          </div>

          <div class="story-block">
            <div class="story-label">Technical Hurdle</div>
            <p class="story-text">${p.challenge}</p>
          </div>

          <div class="story-block">
            <div class="story-label">Engineering Solution</div>
            <p class="story-text">${p.solution}</p>
          </div>

          <div class="story-block">
            <div class="story-label">Core Capabilities</div>
            <ul class="features-list">
              ${p.keyFeatures.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Right: Tech Stack & Interactive API Sandbox -->
        <div class="case-study-side">
          <div class="story-label">Technologies Used</div>
          <div class="stack-tags">
            ${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}
          </div>

          <div class="story-label">API Architecture Preview</div>
          <div class="api-preview-box">
            <div class="api-preview-header">
              <span class="api-method">${p.mockApi.method}</span>
              <span style="color: var(--accent-blue);">${p.mockApi.endpoint}</span>
            </div>
            <div class="api-code-snippet">${JSON.stringify(p.mockApi.response, null, 2)}</div>
          </div>

          <button class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.88rem;" data-open-api="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Test Mock API in Sandbox</span>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Render Categorized Skills & Tools
function renderSkills() {
  const container = document.getElementById('skills-columns');
  if (!container) return;

  const categories = [
    {
      title: 'Backend & APIs',
      items: portfolioData.skills.backend.map(s => ({
        name: s.name,
        badge: s.exp,
        note: s.notes
      }))
    },
    {
      title: 'Databases & Storage',
      items: portfolioData.skills.databases.map(s => ({
        name: s.name,
        badge: s.exp,
        note: s.notes
      }))
    },
    {
      title: 'Programming Languages',
      items: portfolioData.skills.languages.map(s => ({
        name: s.name,
        badge: s.type,
        note: s.desc
      }))
    },
    {
      title: 'Frontend & UI',
      items: portfolioData.skills.frontend.map(s => ({
        name: s.name,
        badge: s.exp,
        note: s.notes
      }))
    },
    {
      title: 'Dev Tools & Testing',
      items: portfolioData.skills.tools.map(s => ({
        name: s.name,
        badge: 'Workflow',
        note: s.desc
      }))
    }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="skill-category-card">
      <div class="category-title">${cat.title}</div>
      <div class="skill-items-list">
        ${cat.items.map(item => `
          <div class="skill-row">
            <div class="skill-title-line">
              <span class="skill-text-name">${item.name}</span>
              <span class="skill-text-exp">${item.badge}</span>
            </div>
            <div class="skill-text-notes">${item.note}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Render Career Journey & Education
function renderJourney() {
  const container = document.getElementById('journey-container');
  if (!container) return;

  container.innerHTML = portfolioData.journey.map(j => `
    <div class="journey-card">
      <div class="journey-top">
        <div class="journey-role">${j.role}</div>
        <span class="journey-status-pill">${j.status}</span>
      </div>
      <div class="journey-inst">${j.institution}</div>
      <div class="journey-period">${j.period} • ${j.type}</div>
      <p class="journey-desc">${j.description}</p>
    </div>
  `).join('');
}

// Active Nav highlight on scroll
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
