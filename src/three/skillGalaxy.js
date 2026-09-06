import * as THREE from 'three';

export class SkillGalaxy {
  constructor(canvas) {
    if (!canvas) return;
    this.canvas = canvas;

    this.skills = [
      { name: "Node.js", color: 0x06b6d4 },
      { name: "Express.js", color: 0x38bdf8 },
      { name: "MongoDB", color: 0x10b981 },
      { name: "React.js", color: 0x60a5fa },
      { name: "REST APIs", color: 0x8b5cf6 },
      { name: "JWT Auth", color: 0xf59e0b },
      { name: "TypeScript", color: 0x3b82f6 },
      { name: "SQL", color: 0xec4899 },
      { name: "Docker", color: 0x0ea5e9 },
      { name: "Postman", color: 0xf97316 },
      { name: "Java", color: 0xef4444 },
      { name: "Python", color: 0x14b8a6 },
      { name: "MVC Pattern", color: 0xa855f7 },
      { name: "Mongoose", color: 0x34d399 }
    ];

    this.init();
  }

  init() {
    const width = this.canvas.clientWidth || 360;
    const height = this.canvas.clientHeight || 360;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.z = 7;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Distribute skills evenly on sphere surface using Fibonacci sphere algorithm
    const radius = 2.4;
    const count = this.skills.length;
    this.nodes = [];
    const positions = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY * radius;
      const py = y * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      positions.push(new THREE.Vector3(x, py, z));

      // Create glowing node
      const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: this.skills[i].color
      });
      const node = new THREE.Mesh(sphereGeo, sphereMat);
      node.position.set(x, py, z);
      this.group.add(node);

      // Add glow ring around node
      const haloGeo = new THREE.RingGeometry(0.15, 0.18, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: this.skills[i].color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(x, py, z);
      halo.lookAt(0, 0, 0);
      this.group.add(halo);

      this.nodes.push({ mesh: node, halo, name: this.skills[i].name });
    }

    // Connect nodes with glowing constellation lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePoints = [];

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (positions[i].distanceTo(positions[j]) < 2.5) {
          linePoints.push(positions[i].x, positions[i].y, positions[i].z);
          linePoints.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    this.group.add(lines);

    // Inner wireframe sphere
    const wireGeo = new THREE.SphereGeometry(2.38, 16, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    this.group.add(new THREE.Mesh(wireGeo, wireMat));

    // Interactive Drag Rotation
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.008;
      this.targetRotation.x += deltaY * 0.008;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.008;
      this.targetRotation.x += deltaY * 0.008;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    // Handle resize
    window.addEventListener('resize', () => {
      if (!this.canvas) return;
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      if (w && h) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      }
    });

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Auto rotate slowly if not dragging
    if (!this.isDragging) {
      this.targetRotation.y += 0.005;
    }

    // Smooth lerp
    this.group.rotation.y += (this.targetRotation.y - this.group.rotation.y) * 0.1;
    this.group.rotation.x += (this.targetRotation.x - this.group.rotation.x) * 0.1;

    this.renderer.render(this.scene, this.camera);
  }
}
