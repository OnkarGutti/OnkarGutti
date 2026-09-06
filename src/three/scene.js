import * as THREE from 'three';
import { CyberCore } from './cyberCore.js';

export class Hero3DScene {
  constructor(canvas) {
    this.canvas = canvas;
    if (!this.canvas) return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.dragRotation = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.velocity = { x: 0, y: 0 };
    this.scrollProgress = 0;
    this.autoSpin = true;

    this.init();
    this.initEvents();
    this.animate(0);
  }

  init() {
    const width = this.canvas.clientWidth || 540;
    const height = this.canvas.clientHeight || 540;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 12);

    // High performance WebGLRenderer with Antialiasing & Alpha
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // Studio Ambient Light
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(ambient);

    // 3D Developer Pass
    this.badge = new CyberCore();
    this.scene.add(this.badge.group);
  }

  initEvents() {
    // Mouse move for realistic specular glare and subtle tilt
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    let mouseDownPos = { x: 0, y: 0 };
    let mouseDownTime = 0;

    // Drag to rotate badge, click to flip
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.autoSpin = false;
      mouseDownPos = { x: e.clientX, y: e.clientY };
      mouseDownTime = performance.now();
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', (e) => {
      if (this.isDragging) {
        const moveDist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
        const duration = performance.now() - mouseDownTime;
        // If it was a quick click without dragging, flip the pass
        if (moveDist < 8 && duration < 350) {
          if (this.badge) this.badge.flipBadge();
        }
      }
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.velocity.y = deltaX * 0.007;
      this.velocity.x = deltaY * 0.007;

      this.dragRotation.targetY += this.velocity.y;
      this.dragRotation.targetX += this.velocity.x;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch interactions
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.autoSpin = false;
        mouseDownPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        mouseDownTime = performance.now();
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (this.isDragging && e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const moveDist = Math.hypot(touch.clientX - mouseDownPos.x, touch.clientY - mouseDownPos.y);
        const duration = performance.now() - mouseDownTime;
        if (moveDist < 12 && duration < 350) {
          if (this.badge) this.badge.flipBadge();
        }
      }
      this.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.velocity.y = deltaX * 0.007;
      this.velocity.x = deltaY * 0.007;

      this.dragRotation.targetY += this.velocity.y;
      this.dragRotation.targetX += this.velocity.x;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    // Scroll depth tracking
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    // Window Resize
    window.addEventListener('resize', () => {
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      if (width && height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      }
    });
  }

  animate(timeMs) {
    requestAnimationFrame((t) => this.animate(t));
    const time = timeMs * 0.001;

    // Smooth lerp for mouse parallax
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

    // Subtle automatic slow turn if autoSpin is on
    if (this.autoSpin && !this.isDragging) {
      this.dragRotation.targetY += 0.004;
    }

    // Smooth inertia lerp for drag rotation
    this.dragRotation.x += (this.dragRotation.targetX - this.dragRotation.x) * 0.1;
    this.dragRotation.y += (this.dragRotation.targetY - this.dragRotation.y) * 0.1;

    // Apply rotation to badge group
    if (this.badge) {
      this.badge.update(time);
      this.badge.group.rotation.x = this.dragRotation.x - this.mouse.y * 0.18;
      this.badge.group.rotation.y = this.dragRotation.y + this.mouse.x * 0.22;
    }

    // Depth zoom on scroll
    const scrollZ = 12 + this.scrollProgress * 2;
    this.camera.position.z += (scrollZ - this.camera.position.z) * 0.05;

    this.renderer.render(this.scene, this.camera);
  }
}
