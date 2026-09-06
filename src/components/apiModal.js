import { portfolioData } from '../data/portfolioData.js';
import { playSound } from './audio.js';

export function initApiModal() {
  const modal = document.getElementById('api-modal');
  const closeBtn = document.getElementById('close-modal');
  const sendBtn = document.getElementById('api-send-btn');
  const endpointEl = document.getElementById('api-endpoint');
  const methodEl = document.getElementById('api-method');
  const payloadEl = document.getElementById('api-payload');
  const responseEl = document.getElementById('api-response');
  const statusBadge = document.getElementById('api-status-badge');
  const timeBadge = document.getElementById('api-time-badge');
  const modalTitle = document.getElementById('modal-project-title');

  if (!modal) return;

  let activeProject = null;

  // Open modal trigger
  document.querySelectorAll('[data-open-api]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-open-api');
      activeProject = portfolioData.projects.find(p => p.id === projectId);
      if (!activeProject || !activeProject.mockApi) return;

      modalTitle.textContent = activeProject.title;
      methodEl.textContent = activeProject.mockApi.method;
      endpointEl.textContent = activeProject.mockApi.endpoint;
      payloadEl.value = JSON.stringify(activeProject.mockApi.payload, null, 2);
      
      // Reset response view
      responseEl.textContent = '// Click "Send Request" to simulate backend execution...';
      statusBadge.textContent = 'STATUS: IDLE';
      statusBadge.className = 'status-tag idle';
      timeBadge.textContent = '0ms';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playSound('activate');
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    playSound('click');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Execute Mock API Request
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (!activeProject || !activeProject.mockApi) return;

      playSound('api');
      sendBtn.disabled = true;
      sendBtn.innerHTML = `
        <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Executing...
      `;

      statusBadge.textContent = 'STATUS: 102 PROCESSING';
      statusBadge.className = 'status-tag pending';

      const startTime = performance.now();

      setTimeout(() => {
        const duration = Math.round(performance.now() - startTime + Math.random() * 40 + 20);
        let parsedPayload;
        try {
          parsedPayload = JSON.parse(payloadEl.value);
        } catch (err) {
          parsedPayload = activeProject.mockApi.payload;
        }

        // Build simulated dynamic response
        const resp = {
          ...activeProject.mockApi.response,
          _meta: {
            server: "Node.js Express Cluster",
            database: "MongoDB Atlas ReplicaSet",
            authVerified: true,
            latency: `${duration}ms`,
            requestId: `req_${Math.random().toString(36).substring(2, 9)}`
          },
          receivedPayload: parsedPayload
        };

        responseEl.textContent = JSON.stringify(resp, null, 2);
        statusBadge.textContent = `STATUS: ${activeProject.mockApi.response.status || 200} OK`;
        statusBadge.className = 'status-tag success';
        timeBadge.textContent = `${duration}ms`;

        sendBtn.disabled = false;
        sendBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg> Send Request
        `;
        playSound('activate');
      }, 420);
    });
  }
}
