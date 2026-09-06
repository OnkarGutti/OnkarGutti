import * as THREE from 'three';

export class Starfield {
  constructor(count = 1800) {
    this.group = new THREE.Group();
    this.count = count;

    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorChoices = [
      new THREE.Color(0x38bdf8), // Light Cyan
      new THREE.Color(0xa78bfa), // Light Violet
      new THREE.Color(0x34d399), // Emerald
      new THREE.Color(0xffffff)  // Pure White
    ];

    for (let i = 0; i < count; i++) {
      // Spread stars in a wide spherical cloud
      const r = 20 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const col = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material
    const mat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.points = new THREE.Points(geo, mat);
    this.group.add(this.points);
  }

  update(time) {
    this.points.rotation.y = time * 0.02;
    this.points.rotation.x = Math.sin(time * 0.01) * 0.05;
  }
}
