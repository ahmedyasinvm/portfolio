import * as THREE from 'three';
import { useRef, useMemo, useEffect, useState, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



/* ────────────────────────────────────────────────────────────
   PHASE 4: SCROLL HIJACK CAMERA (GSAP & CATMULL-ROM SPLINE)
──────────────────────────────────────────────────────────── */
const flightPathCoordinates = [
  new THREE.Vector3(0, 150, 300),
  new THREE.Vector3(-80, 100, 150),
  new THREE.Vector3(50, 70, 0),
  new THREE.Vector3(-30, 40, -150),
  new THREE.Vector3(0, 20, -300)
];
const flightCurve = new THREE.CatmullRomCurve3(flightPathCoordinates, false, 'centripetal');

const scrollState = {
  progress: 0
};

function CinematicCamera() {
  const { camera } = useThree();

  useEffect(() => {
    // GSAP ScrollTrigger timeline to map scroll percentage directly to scrollProgress
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".matrix-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          scrollState.progress = self.progress;
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  useFrame((state) => {
    // Dynamically update the camera position and rotation
    // Get current position on the curve
    const camPos = flightCurve.getPointAt(scrollState.progress);
    // Look slightly ahead on the curve to simulate banking/turning
    const lookAtPos = flightCurve.getPointAt(Math.min(scrollState.progress + 0.05, 1.0));
    
    state.camera.position.copy(camPos);
    state.camera.lookAt(lookAtPos);
  });

  return null;
}

/* ────────────────────────────────────────────────────────────
   PHASE 2: REALISTIC CITY (PBR MATERIALS)
──────────────────────────────────────────────────────────── */
function MatrixCity() {
  const { scene } = useGLTF('/city.glb');

  useLayoutEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x0a0a0f, // Dark realistic asphalt/concrete
          roughness: 0.8,
          metalness: 0.3,
        });

        // Remove any existing edge lines from previous hot module reloads
        const oldLines = [];
        child.children.forEach(c => {
          if (c.isLineSegments) oldLines.push(c);
        });
        oldLines.forEach(c => child.remove(c));

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  if (!scene) return null;

  return (
    <primitive object={scene} scale={[2, 2, 2]} position={[0, -10, 0]} />
  );
}

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────── */
export default function MatrixCityScene() {
  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', width: '100%', position: 'relative' }}>
      {/* 
        This is the fixed Canvas container. Pure black background. 
        Zero standard lighting. 
      */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas
          shadows
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          {/* CAMERA FRUSTUM EXTENSION */}
          <PerspectiveCamera makeDefault position={[0, 100, 300]} near={0.1} far={50000} />
          
          <color attach="background" args={['#050508']} />
          <fog attach="fog" args={['#050508', 30, 800]} />
          
          {/* AMBIENT & SCENE FILL */}
          <ambientLight intensity={0.15} color="#112244" />
          <hemisphereLight skyColor="#000000" groundColor="#001133" intensity={0.5} />
          
          {/* THE MOON */}
          <mesh position={[1000, 800, -2000]}>
            <sphereGeometry args={[100, 64, 64]} />
            <meshStandardMaterial color="#ffffff" emissive="#88ccff" emissiveIntensity={5} />
          </mesh>

          {/* LUNAR DIRECTIONAL LIGHT */}
          <directionalLight 
            position={[1000, 800, -2000]} 
            intensity={2.5} 
            color="#aaccff"
            castShadow 
            shadow-mapSize={[4096, 4096]} 
            shadow-camera-left={-2000} 
            shadow-camera-right={2000} 
            shadow-camera-top={2000} 
            shadow-camera-bottom={-2000} 
            shadow-camera-far={8000} 
            shadow-bias={-0.0005} 
          />
          
          {/* CRITICAL SUSPENSE BOUNDARY FOR GLTF LOADING */}
          <Suspense fallback={null}>
            <MatrixCity />
          </Suspense>
          
          <CinematicCamera />

          {/* PHASE 3: VOLUMETRIC POST-PROCESSING */}
          {/* Non-negotiable Bloom settings */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.1} 
              luminanceSmoothing={0.9} 
              intensity={2.5} 
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 
        This empty scroll container provides height to hijack for GSAP. 
        The actual visual is in the fixed Canvas above.
      */}
      <div className="matrix-scroll-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '400vh', pointerEvents: 'none' }} />
    </div>
  );
}
