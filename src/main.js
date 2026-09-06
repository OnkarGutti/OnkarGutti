import { portfolioData } from './data/portfolioData.js';
import { Hero3DScene } from './three/scene.js';
import { initTerminal } from './components/terminal.js';
import { initApiModal } from './components/apiModal.js';
import { initContactForm } from './components/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Hardware Pass Scene
  const passCanvas = document.getElementById('pass-3d-canvas') || document.getElementById('hero-3d-canvas');
  if (passCanvas) {
    new Hero3DScene(passCanvas);
  }

  // 2. Initialize Interactive Components
  initTerminal();
  initApiModal();
  initContactForm();

  // 3. Render Case Studies, Skills, Certificates, Journey
  renderProjects();
  renderSkills();
  renderCertificates();
  renderJourney();

  // 4. Initialize Certificate Lightbox Modal
  initCertificateModal();

  // 5. Active Nav indicator on scroll
  initScrollNav();
});

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

// Render Verified Certifications
function renderCertificates() {
  const container = document.getElementById('certificates-container');
  if (!container) return;

  container.innerHTML = portfolioData.certifications.map(c => `
    <article class="cert-card" data-cert-id="${c.id}">
      <div class="cert-image-preview" data-open-cert="${c.id}" role="button" tabindex="0" title="Click to view full certificate">
        <img src="${c.image}" alt="${c.title}" class="cert-thumbnail" loading="lazy" />
        <div class="cert-hover-overlay">
          <div class="cert-hover-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>Inspect Full Certificate</span>
          </div>
        </div>
        <div class="cert-highlight-tag">${c.highlight}</div>
      </div>

      <div class="cert-content">
        <div class="cert-meta-tag-row">
          <span class="cert-issuer-tag">${c.issuer}</span>
          <span class="cert-date-tag">${c.date}</span>
        </div>

        <h3 class="cert-title">${c.title}</h3>
        <p class="cert-description">${c.description}</p>

        <div class="cert-skills-wrap">
          ${c.skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join('')}
        </div>

        <div class="cert-card-footer">
          <button class="btn-primary cert-view-btn" data-open-cert="${c.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>View Certificate</span>
          </button>
          
          <a href="${c.image}" target="_blank" rel="noopener noreferrer" class="cert-direct-link" title="Open certificate image in new tab">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

// Certificate Lightbox Modal Management
function initCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  const closeBtn = document.getElementById('close-cert-modal');
  const modalCloseBtn = document.getElementById('cert-modal-close-btn');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalCategory = document.getElementById('cert-modal-category');
  const modalIssuer = document.getElementById('cert-modal-issuer');
  const modalDate = document.getElementById('cert-modal-date');
  const modalId = document.getElementById('cert-modal-id');
  const modalDesc = document.getElementById('cert-modal-desc');
  const modalSkills = document.getElementById('cert-modal-skills');
  const modalLink = document.getElementById('cert-modal-open-link');

  if (!modal) return;

  function openCert(id) {
    const cert = portfolioData.certifications.find(c => c.id === id);
    if (!cert) return;

    if (modalImg) {
      modalImg.src = cert.image;
      modalImg.alt = cert.title;
    }
    if (modalTitle) modalTitle.textContent = cert.title;
    if (modalCategory) modalCategory.textContent = cert.category.toUpperCase();
    if (modalIssuer) modalIssuer.textContent = cert.issuer;
    if (modalDate) modalDate.textContent = cert.date;
    if (modalId) modalId.textContent = cert.credentialId || 'VERIFIED-CREDENTIAL';
    if (modalDesc) modalDesc.textContent = cert.description;
    if (modalLink) modalLink.href = cert.image;

    if (modalSkills) {
      modalSkills.innerHTML = cert.skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCert() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-cert]');
    if (trigger) {
      const id = trigger.getAttribute('data-open-cert');
      openCert(id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest?.('.cert-image-preview')) {
      e.preventDefault();
      const trigger = e.target.closest('[data-open-cert]');
      if (trigger) {
        openCert(trigger.getAttribute('data-open-cert'));
      }
    }
  });

  closeBtn?.addEventListener('click', closeCert);
  modalCloseBtn?.addEventListener('click', closeCert);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCert();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCert();
    }
  });
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
