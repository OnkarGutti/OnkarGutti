// Custom Glowing Cyber Cursor with trailing particle dynamics
export function initCustomCursor() {
  // Disable on mobile/touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Smooth lerp for outer ring
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Add scale up on interactive elements
  const hoverSelector = 'a, button, input, textarea, select, .interactive-card, .tab-btn, .cmd-item, .tech-chip';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) {
      ring.classList.remove('cursor-hover');
    }
  });

  document.addEventListener('mousedown', () => {
    ring.classList.add('cursor-active');
  });

  document.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-active');
  });
}
