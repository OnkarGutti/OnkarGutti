import * as THREE from 'three';
import { CyberCore } from './cyberCore.js';
import { Starfield } from './starfield.js';

export class Hero3DScene {
  constructor(canvas) {
    this.canvas = canvas;
    if (!this.canvas) return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.dragRotation = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;

    this.init();
    this.initEvents();
    this.animate(0);
  }

  init() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 11);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 3);
    dirLight1.position.set(5, 8, 6);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 2.5);
    dirLight2.position.set(-6, -5, -4);
    this.scene.add(dirLight2);

    // 3D Starfield
    this.starfield = new Starfield(1400);
    this.scene.add(this.starfield.group);

    // 3D Cyber Core
    this.cyberCore = new CyberCore();
    this.scene.add(this.cyberCore.group);
  }

  initEvents() {
    // Mouse move for subtle parallax
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Drag to rotate 3D model
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

      this.dragRotation.targetY += deltaX * 0.007;
      this.dragRotation.targetX += deltaY * 0.007;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support for drag
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

      this.dragRotation.targetY += deltaX * 0.007;
      this.dragRotation.targetX += deltaY * 0.007;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    // Scroll depth effect
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    // Resize
    window.addEventListener('resize', () => {
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      if (width && height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      }
    });

    // Mode switch buttons
    const modeButtons = document.querySelectorAll('[data-3d-mode]');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-3d-mode');
        this.setMode(mode);
      });
    });
  }

  setMode(mode) {
    if (this.cyberCore) {
      this.cyberCore.setMode(mode);
    }
  }

  animate(timeMs) {
    requestAnimationFrame((t) => this.animate(t));
    const time = timeMs * 0.001;

    // Smooth lerp for mouse parallax
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

    // Smooth lerp for drag rotation
    this.dragRotation.x += (this.dragRotation.targetX - this.dragRotation.x) * 0.08;
    this.dragRotation.y += (this.dragRotation.targetY - this.dragRotation.y) * 0.08;

    // Auto slow rotate if not dragged
    if (!this.isDragging) {
      this.dragRotation.targetY += 0.003;
    }

    // Apply rotations
    if (this.cyberCore) {
      this.cyberCore.update(time);
      this.cyberCore.group.rotation.x = this.dragRotation.x + this.mouse.y * 0.25;
      this.cyberCore.group.rotation.y = this.dragRotation.y + this.mouse.x * 0.35;
    }

    if (this.starfield) {
      this.starfield.update(time);
      this.starfield.group.rotation.y = time * 0.015 + this.mouse.x * 0.05;
      this.starfield.group.rotation.x = this.mouse.y * 0.05;
    }

    // Scroll depth effect: gentle camera pullback on scroll
    const scrollZ = 11 + this.scrollProgress * 4;
    this.camera.position.z += (scrollZ - this.camera.position.z) * 0.05;

    this.renderer.render(this.scene, this.camera);
  }
}
