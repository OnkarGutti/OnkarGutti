import { portfolioData } from '../data/portfolioData.js';
import { playSound } from './audio.js';
import confetti from 'canvas-confetti';

export function initTerminal() {
  const terminalBody = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const terminalForm = document.getElementById('terminal-form');
  const quickCmds = document.querySelectorAll('.cmd-chip');

  if (!terminalBody || !terminalInput || !terminalForm) return;

  // History tracking
  const commandHistory = [];
  let historyIndex = -1;

  // Banner welcome
  printOutput(`
<span class="term-cyan">=======================================================</span>
<span class="term-bold term-white">  ONKAR SHIVAJI GUTTI // BACKEND & MERN ARCHITECTURE CLI</span>
<span class="term-cyan">=======================================================</span>
System: Linux/Node v24.20.0 (x86_64) | Shell: onkar-zsh
Type <span class="term-highlight">help</span> to view available system commands.
`, false);

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmd = terminalInput.value.trim();
    if (!cmd) return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    printOutput(`<span class="term-prompt">onkar@portfolio:~$</span> <span class="term-user-cmd">${escapeHTML(cmd)}</span>`);
    executeCommand(cmd);
    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  });

  // History navigation with Arrow keys
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  // Quick command chips
  quickCmds.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        terminalForm.dispatchEvent(new Event('submit'));
        playSound('click');
      }
    });
  });

  function executeCommand(rawCmd) {
    const cleanCmd = rawCmd.trim().toLowerCase();
    const parts = cleanCmd.split(' ');
    const mainCmd = parts[0];

    playSound('api');

    switch (mainCmd) {
      case 'help':
        printOutput(`
<span class="term-header">Available Commands:</span>
  <span class="term-cyan">bio</span>            - View career objective & summary
  <span class="term-cyan">skills</span>         - Breakdown of backend, database & frontend skills
  <span class="term-cyan">projects</span>       - View featured MERN & backend architectures
  <span class="term-cyan">education</span>      - View B.Tech & Diploma (1st Rank) details
  <span class="term-cyan">awards</span>         - View 1st Prize & competitive achievements
  <span class="term-cyan">hackathons</span>     - View 36h & 24h Hackathon participation
  <span class="term-cyan">contact</span>        - Get direct contact info & channels
  <span class="term-cyan">curl /hire</span>     - Simulate hiring pipeline webhook
  <span class="term-cyan">clear</span>          - Clear terminal screen
`);
        break;

      case 'bio':
      case 'whoami':
        printOutput(`
<span class="term-bold term-white">${portfolioData.personal.name}</span>
<span class="term-muted">${portfolioData.personal.title} | ${portfolioData.personal.location}</span>

<span class="term-green">${portfolioData.personal.bio}</span>
Status: <span class="term-cyan">${portfolioData.personal.status}</span>
`);
        break;

      case 'skills':
        let skillText = `<span class="term-header">Technical Skillset Matrix:</span>\n`;
        skillText += `<span class="term-bold term-cyan">[Backend & APIs]</span>\n  ${portfolioData.skills.backend.map(s => `${s.name} (${s.level}%)`).join(' • ')}\n\n`;
        skillText += `<span class="term-bold term-purple">[Databases]</span>\n  ${portfolioData.skills.database.map(s => `${s.name} (${s.level}%)`).join(' • ')}\n\n`;
        skillText += `<span class="term-bold term-green">[Languages]</span>\n  ${portfolioData.skills.languages.map(s => s.name).join(' • ')}\n\n`;
        skillText += `<span class="term-bold term-yellow">[DevOps & Tools]</span>\n  ${portfolioData.skills.devops.map(s => s.name).join(' • ')}`;
        printOutput(skillText);
        break;

      case 'projects':
        let projText = `<span class="term-header">Featured Engineering Architectures:</span>\n\n`;
        portfolioData.projects.forEach((p, idx) => {
          projText += `<span class="term-bold term-cyan">[0${idx + 1}] ${p.title}</span>\n`;
          projText += `     Tech: <span class="term-muted">${p.tech.join(', ')}</span>\n`;
          projText += `     Note: ${p.tagline}\n\n`;
        });
        projText += `Tip: Click the project cards on the page to launch the interactive API tester!`;
        printOutput(projText);
        break;

      case 'education':
        let eduText = `<span class="term-header">Academic Qualifications:</span>\n\n`;
        portfolioData.education.forEach((e) => {
          eduText += `<span class="term-bold term-white">${e.degree}</span>\n`;
          eduText += `  • ${e.institution} (${e.period})\n`;
          eduText += `  • Score: <span class="term-green">${e.score}</span>\n\n`;
        });
        printOutput(eduText);
        break;

      case 'awards':
      case 'achievements':
        printOutput(`
<span class="term-header">Honors & Accolades:</span>
  🏆 <span class="term-bold term-yellow">1st Prize Winner</span> - Deram Technology Internship (MERN Course Platform)
  🥇 <span class="term-bold term-yellow">1st Rank Holder</span> - Diploma in Computer Science (92% Aggregate)
  ⚡ <span class="term-bold term-cyan">3x Hackathon Competitor</span> - Orchathon (36h), BLDE (36h), SVERI (24h)
`);
        break;

      case 'hackathons':
        let hackText = `<span class="term-header">Hackathon Experience:</span>\n\n`;
        portfolioData.hackathons.forEach(h => {
          hackText += `⚡ <span class="term-bold term-purple">${h.title}</span> (${h.type}, ${h.year})\n`;
          hackText += `   ${h.desc}\n\n`;
        });
        printOutput(hackText);
        break;

      case 'contact':
        printOutput(`
<span class="term-header">Direct Communication Endpoints:</span>
  Email:    <a href="mailto:${portfolioData.personal.email}" class="term-cyan">${portfolioData.personal.email}</a>
  Phone:    <span class="term-white">${portfolioData.personal.phone}</span>
  Location: <span class="term-muted">${portfolioData.personal.location}</span>
  Status:   <span class="term-green">🟢 Open to Full-Time / Internship Opportunities</span>
`);
        break;

      case 'curl':
        if (cleanCmd.includes('/hire') || cleanCmd.includes('hire')) {
          triggerHireCelebration();
        } else {
          printOutput(`<span class="term-red">curl: Unknown path. Try: curl -X POST /hire</span>`);
        }
        break;

      case 'hire':
        triggerHireCelebration();
        break;

      case 'clear':
        terminalBody.innerHTML = '';
        break;

      default:
        printOutput(`<span class="term-red">zsh: command not found: ${escapeHTML(rawCmd)}. Type <span class="term-highlight">help</span> for command directory.</span>`);
        break;
    }
  }

  function triggerHireCelebration() {
    printOutput(`
<span class="term-green">=======================================================</span>
<span class="term-bold term-yellow">  HTTP/1.1 200 OK - OFFER PIPELINE INITIALIZED! 🎉</span>
<span class="term-green">=======================================================</span>
Payload: {
  "candidate": "Onkar Shivaji Gutti",
  "matchStatus": "100% Fit for High-Impact Backend / Full-Stack",
  "response": "Thank you for reaching out! Direct message sent to inbox."
}
`);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  }

  function printOutput(html, scroll = true) {
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = html;
    terminalBody.appendChild(line);
    if (scroll) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
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
