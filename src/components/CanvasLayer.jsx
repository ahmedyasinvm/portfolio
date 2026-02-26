import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Instanced Particle Field
   Cursor-reactive, scroll-velocity-reactive
───────────────────────────────────────────── */
function ParticleField() {
  const ref = useRef();
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const scrollVelocityRef = useRef(0);
  const lastScrollY = useRef(0);

  // Generate 5000 random positions inside a sphere
  const positions = useMemo(() => {
    const count = 5000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere-like distribution
      const phi = Math.acos(1 - 2 * (i / count));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2 + Math.random() * 4;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      const prev = { ...mouseRef.current };
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.vx = mouseRef.current.x - prev.x;
      mouseRef.current.vy = mouseRef.current.y - prev.y;
    };
    const handleScroll = () => {
      scrollVelocityRef.current = (window.scrollY - lastScrollY.current) * 0.01;
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle auto-rotation
    ref.current.rotation.x += delta * 0.03;
    ref.current.rotation.y += delta * 0.05;

    // Cursor influence — tilt entire field
    ref.current.rotation.y += mouseRef.current.vx * 0.3;
    ref.current.rotation.x += mouseRef.current.vy * 0.3;
    mouseRef.current.vx *= 0.9;
    mouseRef.current.vy *= 0.9;

    // Scroll velocity warps the Z scale
    const targetZ = 1 + Math.abs(scrollVelocityRef.current) * 3;
    ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, targetZ, 0.1);
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1);
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, 1, 0.1);
    scrollVelocityRef.current *= 0.92;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00eaff"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────────
   Wireframe Geometry Terrain (mid-ground)
───────────────────────────────────────────── */
function WireframeTerrain() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1 - 0.5;
    meshRef.current.rotation.z = Math.cos(t * 0.1) * 0.05;
    meshRef.current.position.y = -2.5 + Math.sin(t * 0.2) * 0.15;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -2.5, -4]}>
      <planeGeometry args={[20, 20, 40, 40]} />
      <meshBasicMaterial
        color="#00eaff"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   Camera Rig — scroll-driven
───────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((state, delta) => {
    // Parallax camera drift from cursor
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x, mouseRef.current.x * 0.15, 0.04
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y, mouseRef.current.y * 0.1, 0.04
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─────────────────────────────────────────────
   Main Canvas Layer Export
───────────────────────────────────────────── */
export default function CanvasLayer() {
  return (
    <div className="webgl-layer">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#05050f', 8, 20]} />
        {/* Ambient light to show geometry */}
        <ambientLight intensity={0.2} />
        <pointLight position={[2, 3, 2]} intensity={1} color="#00eaff" />

        <CameraRig />
        <ParticleField />
        <WireframeTerrain />
      </Canvas>
    </div>
  );
}
