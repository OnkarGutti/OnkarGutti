import * as THREE from 'three';

export class CyberCore {
  constructor() {
    this.group = new THREE.Group();
    this.currentMode = 'quantum'; // 'quantum' | 'cyber' | 'matrix'

    this.initMeshes();
  }

  initMeshes() {
    // 1. Inner Energy Core (Pulsing Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    this.coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
    });
    this.coreMesh = new THREE.Mesh(coreGeo, this.coreMat);
    this.group.add(this.coreMesh);

    // 1b. Inner Wireframe Overlay
    const wireCoreGeo = new THREE.IcosahedronGeometry(1.64, 1);
    this.wireCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    this.wireCoreMesh = new THREE.Mesh(wireCoreGeo, this.wireCoreMat);
    this.group.add(this.wireCoreMesh);

    // 2. Middle Gimbal Rings (Nested Energy Toruses)
    this.rings = [];
    const ringRadii = [2.4, 2.8, 3.2];
    const ringColors = [0x06b6d4, 0x8b5cf6, 0x10b981];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[i],
        emissive: ringColors[i],
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI * (0.2 * (i + 1));
      ringMesh.rotation.y = Math.PI * (0.3 * (i + 1));
      this.rings.push(ringMesh);
      this.group.add(ringMesh);
    });

    // 3. Outer Cybernetic Polyhedron Cage
    const cageGeo = new THREE.DodecahedronGeometry(3.6, 1);
    this.cageMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    this.cageMesh = new THREE.Mesh(cageGeo, this.cageMat);
    this.group.add(this.cageMesh);

    // 4. Vertex Node Spheres on Cage
    const pos = cageGeo.attributes.position;
    const vertexGeo = new THREE.SphereGeometry(0.08, 8, 8);
    this.vertexMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    this.vertexGroup = new THREE.Group();

    const uniquePoints = new Set();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
      if (!uniquePoints.has(key)) {
        uniquePoints.add(key);
        const node = new THREE.Mesh(vertexGeo, this.vertexMat);
        node.position.set(x, y, z);
        this.vertexGroup.add(node);
      }
    }
    this.group.add(this.vertexGroup);

    // 5. Orbiting Tech Shards / Data Nodes
    this.shards = [];
    const shardCount = 8;
    const shardGeo = new THREE.OctahedronGeometry(0.32, 0);

    for (let i = 0; i < shardCount; i++) {
      const shardMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x06b6d4 : 0x8b5cf6,
        emissive: i % 2 === 0 ? 0x0891b2 : 0x6d28d9,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.9,
      });
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / shardCount) * Math.PI * 2;
      const radius = 4.4 + (i % 2) * 0.6;
      shard.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius
      );
      shard.userData = {
        angle,
        radius,
        speed: 0.015 + (i % 3) * 0.005,
        yAmp: 0.6 + Math.random() * 0.4,
        yFreq: 1.5 + Math.random() * 1.5,
      };
      this.shards.push(shard);
      this.group.add(shard);
    }

    // Light attached to core
    this.corePointLight = new THREE.PointLight(0x06b6d4, 3, 20);
    this.group.add(this.corePointLight);
  }

  setMode(mode) {
    this.currentMode = mode;

    if (mode === 'quantum') {
      // Cyan & Electric Violet
      this.coreMat.color.setHex(0x06b6d4);
      this.coreMat.emissive.setHex(0x0891b2);
      this.corePointLight.color.setHex(0x06b6d4);
      this.cageMat.color.setHex(0x8b5cf6);
      this.cageMat.emissive.setHex(0x7c3aed);
      this.vertexMat.color.setHex(0x38bdf8);
      this.rings[0].material.color.setHex(0x06b6d4);
      this.rings[1].material.color.setHex(0x8b5cf6);
      this.rings[2].material.color.setHex(0x10b981);
    } else if (mode === 'cyber') {
      // Neon Magenta & Gold Amber
      this.coreMat.color.setHex(0xec4899);
      this.coreMat.emissive.setHex(0xbe185d);
      this.corePointLight.color.setHex(0xf43f5e);
      this.cageMat.color.setHex(0xf59e0b);
      this.cageMat.emissive.setHex(0xd97706);
      this.vertexMat.color.setHex(0xf472b6);
      this.rings[0].material.color.setHex(0xf43f5e);
      this.rings[1].material.color.setHex(0xfbbf24);
      this.rings[2].material.color.setHex(0xec4899);
    } else if (mode === 'matrix') {
      // Matrix Emerald Terminal
      this.coreMat.color.setHex(0x10b981);
      this.coreMat.emissive.setHex(0x059669);
      this.corePointLight.color.setHex(0x10b981);
      this.cageMat.color.setHex(0x22c55e);
      this.cageMat.emissive.setHex(0x16a34a);
      this.vertexMat.color.setHex(0x86efac);
      this.rings.forEach(r => r.material.color.setHex(0x10b981));
    }
  }

  update(time) {
    // Pulsing inner core
    const pulse = 1 + Math.sin(time * 3) * 0.08;
    this.coreMesh.scale.set(pulse, pulse, pulse);
    this.wireCoreMesh.scale.set(pulse, pulse, pulse);
    this.coreMesh.rotation.y = time * 0.4;
    this.coreMesh.rotation.x = time * 0.25;
    this.wireCoreMesh.rotation.y = -time * 0.3;

    // Gimbal ring rotations
    if (this.rings[0]) {
      this.rings[0].rotation.x += 0.012;
      this.rings[0].rotation.y += 0.008;
    }
    if (this.rings[1]) {
      this.rings[1].rotation.y -= 0.015;
      this.rings[1].rotation.z += 0.01;
    }
    if (this.rings[2]) {
      this.rings[2].rotation.x -= 0.009;
      this.rings[2].rotation.z -= 0.012;
    }

    // Outer cage rotation
    this.cageMesh.rotation.x = -time * 0.15;
    this.cageMesh.rotation.y = time * 0.2;
    this.vertexGroup.rotation.x = -time * 0.15;
    this.vertexGroup.rotation.y = time * 0.2;

    // Orbiting shards
    this.shards.forEach((shard) => {
      shard.userData.angle += shard.userData.speed;
      const x = Math.cos(shard.userData.angle) * shard.userData.radius;
      const z = Math.sin(shard.userData.angle) * shard.userData.radius;
      const y = Math.sin(time * shard.userData.yFreq) * shard.userData.yAmp;

      shard.position.set(x, y, z);
      shard.rotation.x += 0.03;
      shard.rotation.y += 0.04;
    });
  }
}
