import * as THREE from 'three';

// Ultra-Crisp, Eye-Pleasing Matte 3D Developer ID Pass
// Features: Razor-sharp high-DPI texture, non-glare satin finish, high-contrast readable typography
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

  // Load User's Photograph and redraw front canvas when ready
  loadUserPhoto() {
    const img = new Image();
    img.src = '/onkar-transparent.png';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.photoImage = img;
      this.redrawFrontCanvas();
    };
  }

  // Draw Front Face Canvas Texture with Razor-Sharp Typography & High Contrast
  renderFrontContent(ctx) {
    const W = 2048;
    const H = 2816;

    // 1. Deep Matte Charcoal/Obsidian Card Base
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#10131a');
    bgGrad.addColorStop(0.5, '#0b0d13');
    bgGrad.addColorStop(1, '#07080c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Subtle Precision Micro Grid (Clean & Non-distracting)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    for (let x = 80; x < W; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 80; y < H; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // 3. Precision Outer Borders
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, W - 140, H - 140);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(86, 86, W - 172, H - 172);

    // Corner Alignment Marks
    const corners = [[98, 98], [W - 98, 98], [98, H - 98], [W - 98, H - 98]];
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(cx - 24, cy);
      ctx.lineTo(cx + 24, cy);
      ctx.moveTo(cx, cy - 24);
      ctx.lineTo(cx, cy + 24);
      ctx.stroke();
    });

    // 4. Lanyard Strap Slot Marking
    ctx.fillStyle = '#05070a';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 100, 110, 200, 44, 22);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 5. Header Branding: High-Contrast & Clear
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 48px "Space Grotesk", sans-serif';
    ctx.fillText('N. K. ORCHID COLLEGE OF ENGINEERING & TECH', 130, 230);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 34px "JetBrains Mono", monospace';
    ctx.fillText('SOLAPUR • COMPUTER SCIENCE & ENGINEERING', 130, 280);

    // Verified Status Badge (Clear & Eye-Pleasing)
    ctx.fillStyle = 'rgba(6, 78, 59, 0.85)';
    ctx.beginPath();
    ctx.roundRect(W - 470, 185, 340, 76, 38);
    ctx.fill();
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = '800 34px "JetBrains Mono", monospace';
    ctx.fillText('● VERIFIED PASS', W - 440, 236);

    // 6. 24K Gold NFC Smart Chip (Clean Metallic Luster)
    const chipX = 130;
    const chipY = 350;
    const chipW = 340;
    const chipH = 260;

    const goldGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    goldGrad.addColorStop(0, '#fef08a');
    goldGrad.addColorStop(0.3, '#eab308');
    goldGrad.addColorStop(0.7, '#ca8a04');
    goldGrad.addColorStop(1, '#854d0e');
    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, chipW, chipH, 20);
    ctx.fill();
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Chip Micro-Circuits
    ctx.strokeStyle = '#713f12';
    ctx.lineWidth = 3;
    ctx.strokeRect(chipX + 44, chipY + 40, chipW - 88, chipH - 80);
    ctx.beginPath();
    ctx.moveTo(chipX + chipW / 2, chipY);
    ctx.lineTo(chipX + chipW / 2, chipY + chipH);
    ctx.moveTo(chipX, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW, chipY + chipH / 2);
    ctx.arc(chipX + chipW / 2, chipY + chipH / 2, 38, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#713f12';
    ctx.beginPath();
    ctx.arc(chipX + 85, chipY + chipH / 2, 8, 0, Math.PI * 2);
    ctx.arc(chipX + chipW - 85, chipY + chipH / 2, 8, 0, Math.PI * 2);
    ctx.fill();

    // Chip Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 26px "JetBrains Mono", monospace';
    ctx.fillText('24K GOLD NFC SMART CHIP', chipX + 8, chipY + chipH + 42);

    // 7. DEVELOPER PHOTOGRAPH APERTURE (Crisp & High Clarity)
    const photoX = 1360;
    const photoY = 320;
    const photoW = 550;
    const photoH = 690;

    // Photo Aperture Background & Bezel
    ctx.fillStyle = '#141722';
    ctx.beginPath();
    ctx.roundRect(photoX - 6, photoY - 6, photoW + 12, photoH + 12, 22);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();

    if (this.photoImage) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 18);
      ctx.clip();

      const img = this.photoImage;
      const srcW = img.width;
      const srcH = img.width * (photoH / photoW);
      const srcY = img.height * 0.04;
      ctx.drawImage(img, 0, srcY, srcW, srcH, photoX, photoY, photoW, photoH);

      ctx.restore();
    } else {
      // Clean high-contrast monogram fallback
      ctx.fillStyle = '#181e2e';
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 18);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 130px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OG', photoX + photoW / 2, photoY + photoH / 2 + 45);
      ctx.textAlign = 'left';
    }

    // Photo Indicator Dot
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(photoX + photoW - 32, photoY + photoH - 32, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0a0d14';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 8. Developer Name & Role (Large, Bold, High Contrast)
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 106px "Space Grotesk", sans-serif';
    ctx.fillText('ONKAR SHIVAJI GUTTI', 130, 770);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 56px "Space Grotesk", sans-serif';
    ctx.fillText('Full-Stack & Backend Developer', 130, 850);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 38px "Space Grotesk", sans-serif';
    ctx.fillText('Solapur, Maharashtra • B.Tech CSE (Class of 2027)', 130, 915);

    // 9. Verified Academic & Engineering Credentials Box
    const bannerY = 1040;
    const bannerW = W - 260;
    const bannerH = 490;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(130, bannerY, bannerW, bannerH, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    const rows = [
      { label: 'ACADEMIC RANK:', val: '🥇 1st Rank Across Institution (92% MSBTE Diploma)', col: '#fde047' },
      { label: 'INTERNSHIP:', val: '🏆 1st Prize Winner for MERN Platform @ Deram Tech', col: '#34d399' },
      { label: 'HACKATHONS:', val: '⚡ 3x Competitor • Orchathon (36h), BLDE, SVERI', col: '#38bdf8' },
      { label: 'DEGREE TRACK:', val: '🎓 B.Tech in Computer Science & Engg (Graduating 2027)', col: '#ffffff' }
    ];

    rows.forEach((r, i) => {
      const ry = bannerY + 84 + i * 105;
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 36px "JetBrains Mono", monospace';
      ctx.fillText(r.label, 170, ry);

      ctx.fillStyle = r.col;
      ctx.font = 'bold 44px "Space Grotesk", sans-serif';
      ctx.fillText(r.val, 560, ry);
    });

    // 10. Verified Technical Capabilities Stack
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 44px "Space Grotesk", sans-serif';
    ctx.fillText('VERIFIED CORE CAPABILITIES', 130, 1610);

    const skills = [
      'Node.js', 'Express.js', 'MongoDB', 'React.js',
      'PostgreSQL', 'RESTful APIs', 'JWT Auth', 'Docker',
      'Java & OOP', 'Database Design', 'TypeScript'
    ];

    let sx = 130;
    let sy = 1670;
    ctx.font = 'bold 38px "JetBrains Mono", monospace';

    skills.forEach(s => {
      const textW = ctx.measureText(s).width;
      const chipW = textW + 68;

      ctx.fillStyle = '#111622';
      ctx.beginPath();
      ctx.roundRect(sx, sy, chipW, 86, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(s, sx + 34, sy + 58);

      sx += chipW + 26;
      if (sx > W - 320) {
        sx = 130;
        sy += 114;
      }
    });

    // 11. Security Hologram Seal
    const holoX = 130;
    const holoY = 2240;
    const holoW = 380;
    const holoH = 340;

    const holoGrad = ctx.createLinearGradient(holoX, holoY, holoX + holoW, holoY + holoH);
    holoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
    holoGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.35)');
    holoGrad.addColorStop(0.7, 'rgba(52, 211, 153, 0.35)');
    holoGrad.addColorStop(1, 'rgba(250, 204, 21, 0.35)');

    ctx.fillStyle = holoGrad;
    ctx.beginPath();
    ctx.roundRect(holoX, holoY, holoW, holoH, 20);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 46px "Space Grotesk", sans-serif';
    ctx.fillText('VERIFIED', holoX + 85, holoY + 140);
    ctx.font = 'bold 34px "JetBrains Mono", monospace';
    ctx.fillText('PASS // 2027', holoX + 68, holoY + 220);

    // 12. Laser Barcode & Clean Coordinates
    const barcodeY = 2280;
    ctx.fillStyle = '#ffffff';
    let bx = 580;
    const barWidths = [12, 18, 8, 22, 10, 16, 24, 8, 14, 20, 8, 16, 22, 10, 18, 12, 26, 8, 16, 20, 8, 22, 12, 16, 10, 20, 24, 12, 16, 8, 22, 18, 10, 24, 14, 20, 10, 16, 22, 12, 18, 10, 24, 16, 12];
    barWidths.forEach(bw => {
      ctx.fillRect(bx, barcodeY, bw, 180);
      bx += bw + 11;
    });

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 40px "JetBrains Mono", monospace';
    ctx.fillText('PASS ID: OG-SOLAPUR-BTECH-2027-PASS', 580, 2530);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.fillText('COORDINATES: 17.6599° N, 75.9064° E (SOLAPUR, IN)', 580, 2590);
  }

  // Draw Reverse Face Canvas with Clear Engineering Manifesto
  renderBackContent(ctx) {
    const W = 2048;
    const H = 2816;

    // Deep brushed obsidian base
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, W, H);

    // Outer border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, W - 140, H - 140);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(86, 86, W - 172, H - 172);

    // Magnetic Security Stripe
    ctx.fillStyle = '#111520';
    ctx.fillRect(0, 280, W, 280);
    ctx.fillStyle = '#1c2233';
    ctx.fillRect(0, 335, W, 170);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.fillText('MAGNETIC ENCRYPTION TRACK // ONKAR SHIVAJI GUTTI // B.TECH CSE 2027', 120, 440);

    // Section 1: Philosophy & Manifesto
    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 56px "Space Grotesk", sans-serif';
    ctx.fillText('ENGINEERING MANIFESTO', 130, 720);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('"Clean code is not an accident. It comes from deep domain understanding,', 130, 815);
    ctx.fillText(' disciplined schema modeling, and writing software that solves real problems."', 130, 885);

    // Section 2: Authenticated Projects
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 52px "Space Grotesk", sans-serif';
    ctx.fillText('AUTHENTICATED FULL-STACK SYSTEMS:', 130, 1070);

    const architectures = [
      { name: 'ApexBank - Secure Enterprise Banking Portal', note: 'MERN Stack • ACID Transaction Guarantees • JWT Token Rotation' },
      { name: 'NexusAI - Mock Interview & Group Discussion Platform', note: 'AI Prompt Engineering • Speech Feedback Matrix • Dynamic Scoring' },
      { name: 'LearnFlow - Course Management Engine (1st Prize Winner)', note: 'Awarded 1st Prize @ Deram Tech • Role-Based RBAC • Clean MVC' }
    ];

    architectures.forEach((a, i) => {
      const ay = 1180 + i * 210;
      ctx.fillStyle = '#121622';
      ctx.beginPath();
      ctx.roundRect(130, ay, W - 260, 160, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 46px "Space Grotesk", sans-serif';
      ctx.fillText(a.name, 170, ay + 68);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 36px "JetBrains Mono", monospace';
      ctx.fillText(a.note, 170, ay + 124);
    });

    // Section 3: Hackathon Competitive Record
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 52px "Space Grotesk", sans-serif';
    ctx.fillText('HACKATHON COMPETITIVE RECORD:', 130, 1880);

    const hacks = [
      '⚡ Orchathon 2026 (36-Hour Sprint • Continuous Backend Deployment)',
      '⚡ BLDE Vijayapura Hackathon 2025 (36-Hour Sprint • Real-time MVP Under Pressure)',
      '⚡ SVERI Pandharpur Hackathon 2026 (24-Hour Sprint • High-Velocity MVC Prototyping)'
    ];

    hacks.forEach((h, i) => {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 42px "Space Grotesk", sans-serif';
      ctx.fillText(h, 130, 1980 + i * 95);
    });

    // Candidate Signature Line
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(130, 2450);
    ctx.lineTo(840, 2450);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'italic 56px "Space Grotesk", cursive';
    ctx.fillText('Onkar S. Gutti', 180, 2420);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 34px "JetBrains Mono", monospace';
    ctx.fillText('AUTHORIZED SIGNATURE // VERIFIED CANDIDATE', 130, 2510);
  }

  createFrontCanvas() {
    this.frontCanvas = document.createElement('canvas');
    this.frontCanvas.width = 2048;
    this.frontCanvas.height = 2816;
    this.frontCtx = this.frontCanvas.getContext('2d');
    this.renderFrontContent(this.frontCtx);

    const texture = new THREE.CanvasTexture(this.frontCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 16;
    return texture;
  }

  redrawFrontCanvas() {
    if (!this.frontCtx) return;
    this.renderFrontContent(this.frontCtx);
    if (this.frontTexture) {
      this.frontTexture.needsUpdate = true;
    }
  }

  createBackCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2816;
    const ctx = canvas.getContext('2d');
    this.renderBackContent(ctx);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 16;
    return texture;
  }

  initTextures() {
    this.frontTexture = this.createFrontCanvas();
    this.backTexture = this.createBackCanvas();
  }

  initPhysicalBadge() {
    const w = 4.8;
    const h = 6.6;
    const d = 0.12;

    const cardGeo = new THREE.BoxGeometry(w, h, d);

    // Brushed Dark Titanium Edge
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1a1d26,
      metalness: 0.8,
      roughness: 0.4
    });

    // Eye-Pleasing Matte Satin Front Material (NO Blinding Mirror Glare!)
    const frontMat = new THREE.MeshStandardMaterial({
      map: this.frontTexture,
      metalness: 0.04,
      roughness: 0.55,
      clearcoat: 0.1,
      clearcoatRoughness: 0.65
    });

    // Eye-Pleasing Matte Satin Back Material
    const backMat = new THREE.MeshStandardMaterial({
      map: this.backTexture,
      metalness: 0.04,
      roughness: 0.58,
      clearcoat: 0.08,
      clearcoatRoughness: 0.7
    });

    const materials = [titaniumMat, titaniumMat, titaniumMat, titaniumMat, frontMat, backMat];

    this.cardMesh = new THREE.Mesh(cardGeo, materials);
    this.cardMesh.castShadow = true;
    this.group.add(this.cardMesh);

    // Carabiner Hardware (Refined Warm Gunmetal)
    const hardwareGroup = new THREE.Group();

    const loopGeo = new THREE.TorusGeometry(0.38, 0.07, 16, 32);
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.9,
      roughness: 0.35
    });
    const loop = new THREE.Mesh(loopGeo, gunmetalMat);
    loop.position.set(0, h / 2 + 0.35, 0);
    hardwareGroup.add(loop);

    const claspGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
    const clasp = new THREE.Mesh(claspGeo, gunmetalMat);
    clasp.position.set(0, h / 2 + 0.8, 0);
    hardwareGroup.add(clasp);

    // College Fabric Strap
    const strapGeo = new THREE.BoxGeometry(0.55, 3.2, 0.04);
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.85
    });
    const strap = new THREE.Mesh(strapGeo, strapMat);
    strap.position.set(0, h / 2 + 2.5, 0);
    hardwareGroup.add(strap);

    this.cardMesh.add(hardwareGroup);

    // Subtle Glowing Micro-LEDs (Soft indicators, NOT blinding hot-spots)
    const ledGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const greenLedMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const greenLed = new THREE.Mesh(ledGeo, greenLedMat);
    greenLed.position.set(w / 2 - 0.45, h / 2 - 0.55, d / 2 + 0.01);
    this.cardMesh.add(greenLed);

    this.greenLight = new THREE.PointLight(0x34d399, 0.35, 2);
    this.greenLight.position.copy(greenLed.position);
    this.greenLight.position.z += 0.08;
    this.cardMesh.add(this.greenLight);

    const cyanLedMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const cyanLed = new THREE.Mesh(ledGeo, cyanLedMat);
    cyanLed.position.set(w / 2 - 0.75, h / 2 - 0.55, d / 2 + 0.01);
    this.cardMesh.add(cyanLed);

    this.cyanLight = new THREE.PointLight(0x38bdf8, 0.25, 2);
    this.cyanLight.position.copy(cyanLed.position);
    this.cyanLight.position.z += 0.08;
    this.cardMesh.add(this.cyanLight);
  }

  initLighting() {
    // Soft, Eye-Pleasing Diffused Studio Lighting (No harsh glare hotspots!)
    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    this.keyLight.position.set(4, 5, 6);
    this.group.add(this.keyLight);

    this.blueRim = new THREE.DirectionalLight(0x38bdf8, 0.65);
    this.blueRim.position.set(-5, -3, 3);
    this.group.add(this.blueRim);

    this.warmFill = new THREE.DirectionalLight(0xfef3c7, 0.45);
    this.warmFill.position.set(2, -4, 4);
    this.group.add(this.warmFill);
  }

  flipBadge() {
    this.isFlipped = !this.isFlipped;
  }

  update(time) {
    // Gentle natural suspended cord sway
    const floatY = Math.sin(time * 1.5) * 0.07;
    this.cardMesh.position.y = floatY;

    // Smooth spring rotation on flip
    const targetYRot = this.isFlipped ? Math.PI : 0;
    const sway = Math.sin(time * 0.8) * 0.04;
    this.cardMesh.rotation.y += (targetYRot + sway - this.cardMesh.rotation.y) * 0.08;

    // Gentle micro-LED breathing
    const p1 = 0.85 + Math.sin(time * 3) * 0.15;
    const p2 = 0.85 + Math.cos(time * 3.5) * 0.15;
    if (this.greenLight) this.greenLight.intensity = 0.35 * p1;
    if (this.cyanLight) this.cyanLight.intensity = 0.25 * p2;
  }
}
