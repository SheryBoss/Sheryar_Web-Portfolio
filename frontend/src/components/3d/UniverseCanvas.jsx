import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import SceneLighting from './SceneLighting';
import GlowingPlatform from './GlowingPlatform';
import Avatar3D from './Avatar3D';
import AvatarStage3D from './AvatarStage3D';
import FloatingSkills from './FloatingSkills';

/**
 * 3D Suspense Loading Fallback
 */
function StageLoadingFallback() {
  return (
    <Html center distanceFactor={8}>
      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-space-dark/90 border border-cyber-cyan/40 backdrop-blur-md shadow-glow-cyan text-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyber-cyan border-t-transparent animate-spin mb-2" />
        <span className="text-[11px] font-mono font-bold text-cyber-cyan uppercase tracking-wider">
          INITIALIZING 3D WEBGL ENGINE...
        </span>
        <span className="text-[10px] font-mono text-slate-400 mt-0.5">
          Loading Shaders & Lighting
        </span>
      </div>
    </Html>
  );
}

/**
 * ScrollCameraController - Dynamic Scroll-Driven 3D Motion
 * Smoothly shifts camera position and scene tilt based on page scroll depth.
 */
function ScrollCameraController({ scrollProgress }) {
  useFrame((state) => {
    const p = scrollProgress.current; // 0.0 (top) to 1.0 (bottom)
    const t = state.clock.getElapsedTime();

    // 1. Smooth Camera Glide on Scroll
    // Hero: center [0, 1.3, 5.0]
    // Middle: glides slightly right [0.6, 1.1, 4.8] to frame content
    // End: rises [0, 1.8, 5.2]
    const targetX = Math.sin(p * Math.PI) * 0.85;
    const targetY = 1.3 - p * 0.4 + Math.sin(t * 0.6) * 0.05;
    const targetZ = 5.0 + Math.sin(p * Math.PI * 1.5) * 0.4;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

    // Subtle lookAt target tracking
    state.camera.lookAt(0, 0.5 - p * 0.3, 0);
  });

  return null;
}

/**
 * UniverseCanvas - Primary 3D WebGL Viewport for Developer's Universe
 * Includes the 3D Avatar, Glowing Platform, Floating Skills, and Scroll Responsiveness.
 */
export default function UniverseCanvas() {
  const [viewMode, setViewMode] = useState('avatar'); // 'avatar' or 'stage'
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = window.scrollY / maxScroll;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      {/* 3D Viewport Controls HUD Overlay */}
      <div className="absolute top-20 right-6 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setViewMode(viewMode === 'avatar' ? 'stage' : 'avatar')}
          className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-space-card/80 border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan backdrop-blur-md shadow-glow-subtle transition-all"
          title="Toggle 3D View Mode"
        >
          {viewMode === 'avatar' ? '3D AVATAR: ACTIVE [SWITCH TO STAGE]' : '3D STAGE: ACTIVE [SWITCH TO AVATAR]'}
        </button>
      </div>

      <Canvas
        camera={{ position: [0, 1.3, 5.0], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        {/* Scroll-driven dynamic camera motion */}
        <ScrollCameraController scrollProgress={scrollProgress} />

        {/* Cinematic Orbit Controls (Allows free user exploration) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 2.8}
          rotateSpeed={0.5}
          dampingFactor={0.05}
        />

        {/* Cinematic Volumetric Lighting */}
        <SceneLighting />

        {/* Dynamic Multi-layered Starfield */}
        <Stars
          radius={80}
          depth={50}
          count={3500}
          factor={4}
          saturation={0.5}
          fade
          speed={0.8}
        />

        {/* Core Glowing Pedestal */}
        <GlowingPlatform />

        {/* 3D Content: Sheryar's Avatar (with Click-to-Wave) or Wireframe Stage */}
        <Suspense fallback={<StageLoadingFallback />}>
          {viewMode === 'avatar' ? (
            <Avatar3D />
          ) : (
            <AvatarStage3D />
          )}
          <FloatingSkills />
        </Suspense>
      </Canvas>
    </div>
  );
}
