import { portfolioData } from '../data/portfolioData.js';
import { playSound } from './audio.js';
import confetti from 'canvas-confetti';

export function initTerminal() {
  const paletteInput = document.getElementById('palette-input');
  const paletteResults = document.getElementById('palette-results');
  const quickFilterBtns = document.querySelectorAll('.palette-filter-btn');

  if (!paletteInput || !paletteResults) return;

  const actions = [
    {
      id: 'projects',
      title: 'Explore Featured Projects',
      subtitle: 'Banking System, AI Interview Simulator & Course Platform',
      category: 'Projects',
      icon: 'folder',
      handler: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'api-demo',
      title: 'Open Live REST API Tester',
      subtitle: 'Test mock POST requests and simulate backend response flows',
      category: 'Interactive',
      icon: 'terminal',
      handler: () => {
        document.querySelector('[data-open-api="banking-system"]')?.click();
      }
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      subtitle: portfolioData.personal.email,
      category: 'Contact',
      icon: 'mail',
      handler: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        showPaletteNotice(`Copied ${portfolioData.personal.email} to clipboard!`);
      }
    },
    {
      id: 'copy-phone',
      title: 'Copy Phone Number',
      subtitle: portfolioData.personal.phone,
      category: 'Contact',
      icon: 'phone',
      handler: () => {
        navigator.clipboard.writeText(portfolioData.personal.phone);
        showPaletteNotice(`Copied ${portfolioData.personal.phone} to clipboard!`);
      }
    },
    {
      id: 'academics',
      title: 'View Academic Record (Rank #1)',
      subtitle: 'SPM Polytechnic (92%) & B.Tech at Orchid College, Solapur',
      category: 'Academics',
      icon: 'award',
      handler: () => {
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'hackathons',
      title: 'Hackathon Sprint Experience',
      subtitle: 'Orchathon (36h), BLDE Vijayapura (36h), SVERI Pandharpur (24h)',
      category: 'Engineering',
      icon: 'zap',
      handler: () => {
        document.getElementById('hackathons')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'health-check',
      title: 'Simulate Backend Health Check (GET /health)',
      subtitle: 'Status 200 OK • Node.js Cluster • MongoDB Atlas Latency 18ms',
      category: 'Interactive',
      icon: 'activity',
      handler: () => {
        showPaletteNotice('🟢 Health check passed: { status: "UP", uptime: "99.98%", cluster: "Node.js v24" }');
        playSound('api');
      }
    },
    {
      id: 'hire',
      title: 'Schedule Interview / Send Inbound Request',
      subtitle: 'Open to full-time Backend and Full-Stack Engineering roles',
      category: 'Careers',
      icon: 'send',
      handler: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }
  ];

  function renderResults(filterQuery = '', activeCategory = 'all') {
    const query = filterQuery.toLowerCase().trim();

    const filtered = actions.filter(act => {
      const matchCat = activeCategory === 'all' || act.category.toLowerCase() === activeCategory.toLowerCase();
      const matchText = act.title.toLowerCase().includes(query) ||
                        act.subtitle.toLowerCase().includes(query) ||
                        act.category.toLowerCase().includes(query);
      return matchCat && matchText;
    });

    if (filtered.length === 0) {
      paletteResults.innerHTML = `
        <div class="palette-empty">
          <p>No matching actions found for "<strong>${escapeHTML(filterQuery)}</strong>"</p>
          <span>Try searching for "project", "email", "api", "rank", or "hackathon".</span>
        </div>
      `;
      return;
    }

    paletteResults.innerHTML = filtered.map((item, idx) => `
      <div class="palette-item ${idx === 0 ? 'selected' : ''}" data-action-id="${item.id}">
        <div class="palette-item-left">
          <div class="palette-icon-box">
            ${getIconSVG(item.icon)}
          </div>
          <div>
            <div class="palette-item-title">${item.title}</div>
            <div class="palette-item-sub">${item.subtitle}</div>
          </div>
        </div>
        <div class="palette-item-meta">
          <span class="palette-badge">${item.category}</span>
          <span class="palette-enter-hint">↵</span>
        </div>
      </div>
    `).join('');

    // Attach click listeners
    paletteResults.querySelectorAll('.palette-item').forEach((row, i) => {
      row.addEventListener('click', () => {
        playSound('click');
        filtered[i].handler();
      });
    });
  }

  // Initial render
  renderResults();

  // Search input typing
  paletteInput.addEventListener('input', (e) => {
    const activeCat = document.querySelector('.palette-filter-btn.active')?.getAttribute('data-filter') || 'all';
    renderResults(e.target.value, activeCat);
  });

  // Category filter tabs
  quickFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quickFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';
      renderResults(paletteInput.value, cat);
      playSound('click');
    });
  });

  // Keyboard navigation (Enter to select first result)
  paletteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const firstItem = paletteResults.querySelector('.palette-item');
      if (firstItem) {
        firstItem.click();
      }
    }
  });

  function showPaletteNotice(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  function getIconSVG(icon) {
    switch (icon) {
      case 'folder':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
      case 'terminal':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`;
      case 'mail':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
      case 'phone':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
      case 'award':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
      case 'zap':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
      case 'activity':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`;
      default:
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
