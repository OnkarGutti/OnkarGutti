import { portfolioData } from './data/portfolioData.js';
import { Hero3DScene } from './three/scene.js';
import { SkillGalaxy } from './three/skillGalaxy.js';
import { initAudio } from './components/audio.js';
import { initCustomCursor } from './components/cursor.js';
import { init3DTilt } from './components/tilt.js';
import { initTerminal } from './components/terminal.js';
import { initApiModal } from './components/apiModal.js';
import { initContactForm } from './components/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Hero Scene
  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (heroCanvas) {
    new Hero3DScene(heroCanvas);
  }

  // 2. Initialize 3D Skill Galaxy
  const skillsCanvas = document.getElementById('skills-canvas');
  if (skillsCanvas) {
    new SkillGalaxy(skillsCanvas);
  }

  // 3. Initialize Audio, Cursor, Tilt, Terminal, API Modal, Contact Form
  initAudio();
  initCustomCursor();
  initTerminal();
  initApiModal();
  initContactForm();

  // 4. Typing Animation in Hero
  initTypingEffect();

  // 5. Populate Skills Section
  renderSkills('backend');
  initSkillTabs();

  // 6. Populate Projects Section
  renderProjects();

  // 7. Populate Certifications Section
  renderCertifications();

  // 8. Initialize 3D Tilt on dynamic cards
  init3DTilt();

  // 9. Active Navigation Indicator on Scroll
  initScrollNav();
});

// Typing effect
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const titles = [
    "MERN Stack Developer",
    "Backend Architecture Specialist",
    "RESTful API & Security Architect",
    "Diploma CS Academic Rank #1 (92%)",
    "Scalable Full-Stack Engineer"
  ];

  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const current = titles[titleIdx];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Render Skills by Category
function renderSkills(category) {
  const container = document.getElementById('skills-display');
  if (!container) return;

  const items = portfolioData.skills[category] || [];
  container.innerHTML = items.map(skill => `
    <div class="skill-card">
      <div class="skill-header">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-pct">${skill.level}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
      </div>
      <div class="skill-desc">${skill.desc || 'Core engineering proficiency and best practices.'}</div>
    </div>
  `).join('');
}

function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tabs .tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderSkills(category);
    });
  });
}

// Render Projects with 3D Tilt and API Modal Trigger
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = portfolioData.projects.map((proj, idx) => `
    <div class="project-card interactive-card" data-tilt>
      <div class="project-details">
        <span class="project-badge">${proj.badge}</span>
        <h3 class="project-title">${proj.title}</h3>
        <div class="project-tagline">${proj.subtitle}</div>
        <p class="project-desc">${proj.description}</p>

        <ul class="project-highlights">
          ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <div class="project-tech-tags">
          ${proj.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>

        <div class="project-actions">
          <button class="btn-primary" data-open-api="${proj.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Test Mock API</span>
          </button>
        </div>
      </div>

      <div class="project-preview-side">
        <div class="preview-bar">
          <span class="preview-dot dot-red"></span>
          <span class="preview-dot dot-yellow"></span>
          <span class="preview-dot dot-green"></span>
          <span class="preview-url">${proj.mockApi.method} ${proj.mockApi.endpoint}</span>
        </div>
        <div class="preview-code-block">${JSON.stringify(proj.mockApi.response, null, 2)}</div>
      </div>
    </div>
  `).join('');
}

// Render Certifications
function renderCertifications() {
  const container = document.getElementById('certs-container');
  if (!container) return;

  container.innerHTML = portfolioData.certifications.map(cert => `
    <div class="cert-card interactive-card">
      <div class="cert-icon-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      </div>
      <div class="cert-title">${cert.title}</div>
      <div class="cert-issuer">${cert.issuer}</div>
      <span class="cert-badge">${cert.badge}</span>
      <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 8px;">${cert.desc}</p>
    </div>
  `).join('');
}

// Active Nav link tracking on scroll
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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
