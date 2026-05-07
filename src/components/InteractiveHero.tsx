'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const objectsRef = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d9ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create interconnected nodes system
    const nodeGeometry = new THREE.IcosahedronGeometry(0.2, 3);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2,
    });

    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    // Create 8 nodes in a cube formation
    const positions = [
      [-2, -2, -2],
      [2, -2, -2],
      [-2, 2, -2],
      [2, 2, -2],
      [-2, -2, 2],
      [2, -2, 2],
      [-2, 2, 2],
      [2, 2, 2],
    ];

    positions.forEach((pos) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      node.position.set(pos[0], pos[1], pos[2]);
      scene.add(node);
      nodes.push(node);
      nodePositions.push(node.position.clone());
      objectsRef.current.push(node);
    });

    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.3,
    });

    const edges = [
      [0, 1],
      [0, 2],
      [0, 4],
      [1, 3],
      [1, 5],
      [2, 3],
      [2, 6],
      [3, 7],
      [4, 5],
      [4, 6],
      [5, 7],
      [6, 7],
    ];

    edges.forEach(([start, end]) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([
            nodePositions[start].x,
            nodePositions[start].y,
            nodePositions[start].z,
            nodePositions[end].x,
            nodePositions[end].y,
            nodePositions[end].z,
          ]),
          3
        )
      );
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
      objectsRef.current.push(line);
    });

    // Create central rotating torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 64);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 0.2,
      metalness: 0.9,
      roughness: 0.1,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    objectsRef.current.push(torus);

    // Mouse tracking
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate nodes with mouse influence
      nodes.forEach((node, idx) => {
        const originalPos = nodePositions[idx];
        const mouseInfluence = 0.5;
        node.position.x =
          originalPos.x + mouseRef.current.x * mouseInfluence;
        node.position.y =
          originalPos.y + mouseRef.current.y * mouseInfluence;

        // Self rotation
        node.rotation.x += 0.005;
        node.rotation.y += 0.008;

        // Pulsing scale
        const pulse = 1 + Math.sin(Date.now() * 0.003 + idx) * 0.15;
        node.scale.set(pulse, pulse, pulse);
      });

      // Rotate central torus
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.002;

      // Rotate entire scene based on mouse
      scene.rotation.x = mouseRef.current.y * 0.3;
      scene.rotation.y = mouseRef.current.x * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            10DiE.T
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 font-light tracking-wide mb-4">
            Systems designed with clarity
          </p>
          <p className="text-lg md:text-xl text-purple-300/70 font-light">
            Interactions crafted for delight
          </p>
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" />
    </div>
  );
}
