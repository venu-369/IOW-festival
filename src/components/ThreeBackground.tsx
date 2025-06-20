"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  theme?: 'main' | 'pop' | 'rock' | 'electronic';
}

export default function ThreeBackground({ theme = 'main' }: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Theme-based colors
    const themeColors = {
      main: {
        primary: new THREE.Color(0x6366f1),
        secondary: new THREE.Color(0x8b5cf6),
        accent: new THREE.Color(0xf59e0b)
      },
      pop: {
        primary: new THREE.Color(0xff6b6b),
        secondary: new THREE.Color(0xfeca57),
        accent: new THREE.Color(0xff9ff3)
      },
      rock: {
        primary: new THREE.Color(0xdc2626),
        secondary: new THREE.Color(0xf97316),
        accent: new THREE.Color(0xfacc15)
      },
      electronic: {
        primary: new THREE.Color(0x06b6d4),
        secondary: new THREE.Color(0x8b5cf6),
        accent: new THREE.Color(0x10b981)
      }
    };

    const colors = themeColors[theme];

    // Create particles
    const particleCount = 150;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      // Color (randomly pick from theme colors)
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) color = colors.primary;
      else if (colorChoice < 0.66) color = colors.secondary;
      else color = colors.accent;

      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * 2 + 0.5;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Add floating animation
          mvPosition.y += sin(time + position.x * 0.01) * 0.1;
          mvPosition.x += cos(time + position.y * 0.01) * 0.1;
          
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Create geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.TetrahedronGeometry(0.4, 0)
    ];

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push(mesh);
      scene.add(mesh);
    }

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update particle shader
      particleMaterial.uniforms.time.value = time;

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 * (index + 1);
        shape.rotation.y += 0.003 * (index + 1);
        shape.rotation.z += 0.002 * (index + 1);
      });

      // Rotate particle system
      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.clear();
      renderer.dispose();
      particles.dispose();
      particleMaterial.dispose();
      
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
    };
  }, [theme]);

  return <div ref={mountRef} className="three-canvas" />;
} 