// Synthesized Web Audio API Sound Effects (Zero external audio asset dependencies)
let audioCtx = null;
let soundEnabled = false;

export function initAudio() {
  const toggleBtn = document.getElementById('audio-toggle');
  if (!toggleBtn) return;

  // Restore audio preference if saved
  const savedPref = localStorage.getItem('onkar_sound_enabled');
  if (savedPref === 'true') {
    soundEnabled = true;
    updateAudioUI(true);
  }

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    soundEnabled = !soundEnabled;
    localStorage.setItem('onkar_sound_enabled', soundEnabled ? 'true' : 'false');
    updateAudioUI(soundEnabled);

    if (soundEnabled) {
      playSound('activate');
    }
  });

  // Attach hover & click sounds to interactive items
  document.addEventListener('mouseover', (e) => {
    if (!soundEnabled) return;
    const target = e.target.closest('a, button, .interactive-card, .tab-btn, .cmd-item');
    if (target) {
      playSound('hover');
    }
  });

  document.addEventListener('click', (e) => {
    if (!soundEnabled) return;
    const target = e.target.closest('a, button, .interactive-card, .tab-btn, .cmd-item');
    if (target && !e.target.closest('#audio-toggle')) {
      playSound('click');
    }
  });
}

function updateAudioUI(enabled) {
  const toggleBtn = document.getElementById('audio-toggle');
  if (!toggleBtn) return;
  const statusEl = toggleBtn.querySelector('.audio-status');
  const iconEl = toggleBtn.querySelector('.audio-icon');

  if (enabled) {
    toggleBtn.classList.add('active');
    if (statusEl) statusEl.textContent = 'FX ON';
    if (iconEl) iconEl.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"></path>
      </svg>`;
  } else {
    toggleBtn.classList.remove('active');
    if (statusEl) statusEl.textContent = 'FX OFF';
    if (iconEl) iconEl.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>`;
  }
}

export function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'activate') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.18);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'api') {
      // Tech double chirp
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(900, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (err) {
    // Audio contexts might fail before user gesture, safely suppress
  }
}
