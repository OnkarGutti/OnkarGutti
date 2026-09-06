import * as THREE from 'three';

// Ultra-Premium 3D Physical Developer ID Pass with Photo, Holographic Foil, Metallic Gold NFC, and Studio Shaders
export class CyberCore {
  constructor() {
    this.group = new THREE.Group();
    this.isFlipped = false;
    this.photoImage = null;

    this.initTextures();
    this.initPhysicalBadge();
    this.initLighting();
    this.loadUserPhoto();
  }

  // Load User's Real Photograph and redraw front canvas when loaded
  loadUserPhoto() {
    const img = new Image();
    img.src = '/onkar.jpg';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.photoImage = img;
      // Redraw front canvas with the loaded real photo
      this.redrawFrontCanvas();
      if (this.frontTexture) {
        this.frontTexture.needsUpdate = true;
      }
    };
  }

  // Generate Guilloche / Banknote-grade Security Wave Pattern
  drawGuilloche(ctx, cx, cy, radius, step) {
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
    ctx.lineWidth = 1;
    for (let r = 20; r < radius; r += step) {
      ctx.beginPath();
      for (let theta = 0; theta < Math.PI * 2; theta += 0.05) {
        const wave = Math.sin(theta * 8) * 8;
        const x = cx + (r + wave) * Math.cos(theta);
        const y = cy + (r + wave) * Math.sin(theta);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw Front Face Canvas Texture
  renderFrontContent(ctx) {
    // 1. Base Layer: Deep Matte Charcoal / Obsidian Titanium
    const bgGrad = ctx.createRadialGradient(1024, 1400, 100, 1024, 1400, 1800);
    bgGrad.addColorStop(0, '#151821');
    bgGrad.addColorStop(0.6, '#0f1118');
    bgGrad.addColorStop(1, '#08090d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 2048, 2800);

    // 2. Micro Carbon Texture & Security Guilloche Patterns
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1.5;
    for (let x = 60; x < 2048; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 2800);
      ctx.stroke();
    }
    for (let y = 60; y < 2800; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    this.drawGuilloche(ctx, 1024, 1400, 800, 30);
    this.drawGuilloche(ctx, 1600, 700, 400, 25);

    // 3. Precision Outer Border Frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 80, 1888, 2640);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(96, 96, 1856, 2608);

    // Corner Alignment Reticles
    const corners = [[110, 110], [1938, 110], [110, 2690], [1938, 2690]];
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy);
      ctx.lineTo(cx + 20, cy);
      ctx.moveTo(cx, cy - 20);
      ctx.lineTo(cx, cy + 20);
      ctx.stroke();
    });

    // 4. Lanyard Carabiner Slot Marking
    ctx.fillStyle = '#06070a';
    ctx.beginPath();
    ctx.roundRect(924, 120, 200, 48, 24);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 5;
    ctx.stroke();

    // 5. Header Bar: College & Pass Identification
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.fillText('N. K. ORCHID COLLEGE OF ENGINEERING & TECH', 140, 240);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 30px "JetBrains Mono", monospace';
    ctx.fillText('SOLAPUR • COMPUTER SCIENCE & ENGINEERING', 140, 288);

    // Active Status Pill
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.roundRect(1620, 200, 280, 76, 38);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 34px "JetBrains Mono", monospace';
    ctx.fillText('● VERIFIED', 1665, 252);

    // 6. Realistic Gold NFC Microchip
    const chipX = 140;
    const chipY = 370;
    const chipW = 320;
    const chipH = 250;

    const goldGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    goldGrad.addColorStop(0, '#fffbeb');
    goldGrad.addColorStop(0.2, '#fef08a');
    goldGrad.addColorStop(0.5, '#eab308');
    goldGrad.addColorStop(0.8, '#ca8a04');
    goldGrad.addColorStop(1, '#854d0e');
    ctx.fillStyle = goldGrad;
    ctx.roundRect(chipX, chipY, chipW, chipH, 24);
    ctx.fill();
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Internal Chip Circuit Traces
    ctx.strokeStyle = '#713f12';
    ctx.lineWidth = 3;
    ctx.strokeRect(chipX + 40, chipY + 40, chipW - 80, chipH - 80);
    ctx.beginPath();
    ctx.moveTo(chipX + chipW / 2, chipY);
    ctx.lineTo(chipX + chipW / 2, chipY + chipH);
    ctx.moveTo(chipX, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW, chipY + chipH / 2);
    ctx.arc(chipX + chipW / 2, chipY + chipH / 2, 35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#713f12';
    ctx.beginPath();
    ctx.arc(chipX + 80, chipY + chipH / 2, 8, 0, Math.PI * 2);
    ctx.arc(chipX + chipW - 80, chipY + chipH / 2, 8, 0, Math.PI * 2);
    ctx.fill();

    // Chip Label
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText('NFC SMART ID CHIP', chipX + 30, chipY + chipH + 40);

    // 7. DEVELOPER REAL PHOTOGRAPH CONTAINER
    const photoX = 1380;
    const photoY = 340;
    const photoW = 520;
    const photoH = 650;

    // Photo Outer Bezel
    ctx.fillStyle = '#181b24';
    ctx.roundRect(photoX - 8, photoY - 8, photoW + 16, photoH + 16, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Photo if loaded, otherwise placeholder
    if (this.photoImage) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 22);
      ctx.clip();

      // Draw image cropped focused on face & upper torso
      const img = this.photoImage;
      const srcW = img.width;
      const srcH = img.width * (photoH / photoW);
      const srcY = img.height * 0.05; // start near top of head
      ctx.drawImage(img, 0, srcY, srcW, srcH, photoX, photoY, photoW, photoH);

      // Subtle warm vignette on photo edges
      const photoVignette = ctx.createRadialGradient(
        photoX + photoW / 2, photoY + photoH / 2, photoW * 0.4,
        photoX + photoW / 2, photoY + photoH / 2, photoW * 0.75
      );
      photoVignette.addColorStop(0, 'rgba(0,0,0,0)');
      photoVignette.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = photoVignette;
      ctx.fillRect(photoX, photoY, photoW, photoH);

      ctx.restore();
    } else {
      // Monogram placeholder while image loads
      ctx.fillStyle = '#141824';
      ctx.roundRect(photoX, photoY, photoW, photoH, 22);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 140px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OG', photoX + photoW / 2, photoY + photoH / 2 + 40);
      ctx.textAlign = 'left';
    }

    // Photo Tag Badge
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(photoX + photoW - 35, photoY + photoH - 35, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#090a0f';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 8. Developer Name & Role
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 102px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '-0.03em';
    ctx.fillText('ONKAR SHIVAJI GUTTI', 140, 780);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 56px "Space Grotesk", sans-serif';
    ctx.fillText('Full-Stack & Backend Developer', 140, 860);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Solapur, Maharashtra • B.Tech Computer Science (2024–2027)', 140, 920);

    // 9. Highlights & Academic Distinction Banner
    const bannerY = 1040;
    const bannerW = 1768;
    const bannerH = 460;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.roundRect(140, bannerY, bannerW, bannerH, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rows of Achievements with Icons
    const rows = [
      { label: '🥇 ACADEMIC RANK', val: '1st Rank in Diploma in Computer Science (92% Aggregate)', col: '#eab308' },
      { label: '🏆 INTERNSHIP', val: '1st Prize Winner for MERN Course Platform @ Deram Tech', col: '#10b981' },
      { label: '⚡ HACKATHONS', val: '3x Competitor • Orchathon (36h), BLDE (36h), SVERI (24h)', col: '#38bdf8' },
      { label: '🎓 DEGREE TRACK', val: 'B.Tech in Computer Science & Engineering (Expected 2027)', col: '#f8fafc' }
    ];

    rows.forEach((r, i) => {
      const ry = bannerY + 85 + i * 98;
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 34px "JetBrains Mono", monospace';
      ctx.fillText(r.label, 180, ry);

      ctx.fillStyle = r.col;
      ctx.font = 'bold 40px "Space Grotesk", sans-serif';
      ctx.fillText(r.val, 560, ry);
    });

    // 10. Stack Chips Grid
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 40px "Space Grotesk", sans-serif';
    ctx.fillText('VERIFIED TECHNICAL STACK', 140, 1600);

    const skills = [
      'Node.js', 'Express.js', 'MongoDB', 'React.js',
      'PostgreSQL', 'RESTful APIs', 'JWT Auth', 'Docker',
      'TypeScript', 'ACID Transactions', 'MVC Pattern'
    ];

    let sx = 140;
    let sy = 1660;
    ctx.font = 'bold 36px "JetBrains Mono", monospace';

    skills.forEach(s => {
      const textW = ctx.measureText(s).width;
      const chipW = textW + 64;

      ctx.fillStyle = '#161922';
      ctx.roundRect(sx, sy, chipW, 80, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(s, sx + 32, sy + 54);

      sx += chipW + 28;
      if (sx > 1700) {
        sx = 140;
        sy += 110;
      }
    });

    // 11. Security Hologram Seal
    const holoX = 140;
    const holoY = 2240;
    const holoW = 380;
    const holoH = 340;

    const holoGrad = ctx.createLinearGradient(holoX, holoY, holoX + holoW, holoY + holoH);
    holoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    holoGrad.addColorStop(0.3, 'rgba(192, 132, 252, 0.4)');
    holoGrad.addColorStop(0.7, 'rgba(52, 211, 153, 0.4)');
    holoGrad.addColorStop(1, 'rgba(251, 191, 36, 0.4)');

    ctx.fillStyle = holoGrad;
    ctx.roundRect(holoX, holoY, holoW, holoH, 20);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.fillText('VERIFIED', holoX + 80, holoY + 140);
    ctx.font = '32px "JetBrains Mono", monospace';
    ctx.fillText('PASS // 2027', holoX + 65, holoY + 220);

    // 12. Laser Barcode & Coordinates
    const barcodeY = 2280;
    ctx.fillStyle = '#ffffff';
    let bx = 600;
    while (bx < 1850) {
      const bw = (Math.random() > 0.45 ? 6 : 14);
      ctx.fillRect(bx, barcodeY, bw, 180);
      bx += bw + (Math.random() > 0.5 ? 8 : 14);
    }

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.fillText('PASS ID: OG-SOLAPUR-BTECH-2027-PASS', 600, 2530);
    ctx.fillText('COORDINATES: 17.6599° N, 75.9064° E', 600, 2590);
  }

  createFrontCanvas() {
    this.frontCanvas = document.createElement('canvas');
    this.frontCanvas.width = 2048;
    this.frontCanvas.height = 2800;
    this.frontCtx = this.frontCanvas.getContext('2d');
    this.renderFrontContent(this.frontCtx);

    const texture = new THREE.CanvasTexture(this.frontCanvas);
    texture.anisotropy = 16;
    return texture;
  }

  redrawFrontCanvas() {
    if (!this.frontCtx) return;
    this.renderFrontContent(this.frontCtx);
  }

  // Reverse Side Texture
  createBackCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2800;
    const ctx = canvas.getContext('2d');

    // Deep brushed obsidian
    ctx.fillStyle = '#0a0c10';
    ctx.fillRect(0, 0, 2048, 2800);

    // Outer frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 80, 1888, 2640);

    // Magnetic Security Stripe
    ctx.fillStyle = '#14161f';
    ctx.fillRect(0, 280, 2048, 300);
    ctx.fillStyle = '#222736';
    ctx.fillRect(0, 340, 2048, 180);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.fillText('SECURITY MAGNETIC ENCRYPTION TRACK // ONKAR SHIVAJI GUTTI', 120, 445);

    // Section 1: Philosophy
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 54px "Space Grotesk", sans-serif';
    ctx.fillText('DEVELOPER MANIFESTO', 140, 740);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('"Clean code is not an accident. It comes from deep domain understanding,', 140, 840);
    ctx.fillText(' disciplined schema modeling, and writing software that solves real problems."', 140, 915);

    // Section 2: Verified Architectures
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px "Space Grotesk", sans-serif';
    ctx.fillText('AUTHENTICATED FULL-STACK SYSTEMS:', 140, 1100);

    const architectures = [
      { name: 'ApexBank - Secure Enterprise Banking Portal', note: 'MERN Stack • ACID Transaction Guarantees • JWT Token Rotation' },
      { name: 'NexusAI - Mock Interview & Group Discussion Platform', note: 'AI Prompt Engineering • Speech Feedback Matrix • Dynamic Scoring' },
      { name: 'LearnFlow - Course Management Engine (1st Prize Winner)', note: 'Awarded 1st Prize @ Deram Tech • Role-Based RBAC • Clean MVC' }
    ];

    architectures.forEach((a, i) => {
      const ay = 1220 + i * 200;
      ctx.fillStyle = '#141722';
      ctx.roundRect(140, ay, 1768, 150, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 44px "Space Grotesk", sans-serif';
      ctx.fillText(a.name, 180, ay + 65);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '36px "JetBrains Mono", monospace';
      ctx.fillText(a.note, 180, ay + 118);
    });

    // Section 3: Hackathon Record
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px "Space Grotesk", sans-serif';
    ctx.fillText('HACKATHON COMPETITIVE RECORD:', 140, 1860);

    const hacks = [
      '⚡ Orchathon 2026 (36-Hour Sprint • Continuous Deployment)',
      '⚡ BLDE Vijayapura Hackathon 2025 (36-Hour Sprint • Real-time MVP)',
      '⚡ SVERI Pandharpur Hackathon 2026 (24-Hour Sprint • Rapid Prototyping)'
    ];

    hacks.forEach((h, i) => {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 40px "Space Grotesk", sans-serif';
      ctx.fillText(h, 140, 1960 + i * 90);
    });

    // Signature Line
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(140, 2440);
    ctx.lineTo(840, 2440);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 52px "Space Grotesk", cursive';
    ctx.fillText('Onkar S. Gutti', 200, 2410);

    ctx.fillStyle = '#64748b';
    ctx.font = '32px "JetBrains Mono", monospace';
    ctx.fillText('AUTHORIZED SIGNATURE // VERIFIED CANDIDATE', 140, 2500);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }

  initTextures() {
    this.frontTexture = this.createFrontCanvas();
    this.backTexture = this.createBackCanvas();
  }

  initPhysicalBadge() {
    // 1. Physical Badge Core Geometry
    const w = 4.8;
    const h = 6.6;
    const d = 0.14;

    const cardGeo = new THREE.BoxGeometry(w, h, d);

    // Titanium Edge Material
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x181a22,
      metalness: 0.95,
      roughness: 0.25,
      envMapIntensity: 1.5
    });

    // High Quality Front Material with Specular Sheen
    const frontMat = new THREE.MeshStandardMaterial({
      map: this.frontTexture,
      metalness: 0.2,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15
    });

    // Back Material
    const backMat = new THREE.MeshStandardMaterial({
      map: this.backTexture,
      metalness: 0.2,
      roughness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2
    });

    const materials = [titaniumMat, titaniumMat, titaniumMat, titaniumMat, frontMat, backMat];

    this.cardMesh = new THREE.Mesh(cardGeo, materials);
    this.cardMesh.castShadow = true;
    this.group.add(this.cardMesh);

    // 2. Realistic Heavy Gunmetal Carabiner Hardware
    const hardwareGroup = new THREE.Group();

    // Clip Loop
    const loopGeo = new THREE.TorusGeometry(0.38, 0.07, 16, 32);
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Warm Antique Brass / Gunmetal
      metalness: 0.95,
      roughness: 0.2
    });
    const loop = new THREE.Mesh(loopGeo, gunmetalMat);
    loop.position.set(0, h / 2 + 0.35, 0);
    hardwareGroup.add(loop);

    // Swivel Clasp
    const claspGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
    const clasp = new THREE.Mesh(claspGeo, gunmetalMat);
    clasp.position.set(0, h / 2 + 0.8, 0);
    hardwareGroup.add(clasp);

    // Woven Blue/Navy Orchid Fabric Strap (matching his college lanyard!)
    const strapGeo = new THREE.BoxGeometry(0.55, 3.2, 0.04);
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // Navy Blue matching Orchid College Lanyard
      roughness: 0.8
    });
    const strap = new THREE.Mesh(strapGeo, strapMat);
    strap.position.set(0, h / 2 + 2.5, 0);
    hardwareGroup.add(strap);

    this.cardMesh.add(hardwareGroup);

    // 3. Glowing Micro LED Indicators (Emerald Status & Cyan Data)
    const ledGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const greenLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const greenLed = new THREE.Mesh(ledGeo, greenLedMat);
    greenLed.position.set(w / 2 - 0.45, h / 2 - 0.55, d / 2 + 0.02);
    this.cardMesh.add(greenLed);

    this.greenLight = new THREE.PointLight(0x10b981, 2, 5);
    this.greenLight.position.copy(greenLed.position);
    this.greenLight.position.z += 0.1;
    this.cardMesh.add(this.greenLight);

    const cyanLedMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const cyanLed = new THREE.Mesh(ledGeo, cyanLedMat);
    cyanLed.position.set(w / 2 - 0.75, h / 2 - 0.55, d / 2 + 0.02);
    this.cardMesh.add(cyanLed);

    this.cyanLight = new THREE.PointLight(0x38bdf8, 1.5, 4);
    this.cyanLight.position.copy(cyanLed.position);
    this.cyanLight.position.z += 0.1;
    this.cardMesh.add(this.cyanLight);
  }

  initLighting() {
    // Studio 3-Point Specular Lighting for Sharp Reflections
    this.keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    this.keyLight.position.set(5, 7, 8);
    this.group.add(this.keyLight);

    this.blueRim = new THREE.DirectionalLight(0x38bdf8, 2.4);
    this.blueRim.position.set(-6, -4, 4);
    this.group.add(this.blueRim);

    this.amberFill = new THREE.DirectionalLight(0xf59e0b, 1.2);
    this.amberFill.position.set(0, -6, -5);
    this.group.add(this.amberFill);
  }

  flipBadge() {
    this.isFlipped = !this.isFlipped;
  }

  update(time) {
    // Natural suspended cord pendulum physics
    const floatY = Math.sin(time * 1.8) * 0.12;
    this.cardMesh.position.y = floatY;

    // Smooth spring rotation to target face
    const targetYRot = this.isFlipped ? Math.PI : 0;
    const sway = Math.sin(time * 0.9) * 0.06;
    this.cardMesh.rotation.y += (targetYRot + sway - this.cardMesh.rotation.y) * 0.08;

    // LED Pulses
    const p1 = 0.8 + Math.sin(time * 4) * 0.4;
    const p2 = 0.8 + Math.cos(time * 6) * 0.4;
    if (this.greenLight) this.greenLight.intensity = 2 * p1;
    if (this.cyanLight) this.cyanLight.intensity = 1.6 * p2;
  }
}
