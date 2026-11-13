import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PLACEHOLDERS } from '../../data/placeholders';

/**
 * Web Audio Synthesizer: Cyber Greeting Chime for Avatar Wave
 */
function playCyberChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Major Cyber Arpeggio)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
    });
  } catch (e) {
    // Audio context may be restricted by browser until first interaction
  }
}

/**
 * Custom GLB Model Loader for Sheryar Amir's uploaded avatar.glb
 */
function RealAvatarModel({ hovered, isWaving, waveTimerRef }) {
  // Load user's uploaded avatar.glb
  const { scene } = useGLTF('/models/avatar.glb');
  const modelRef = useRef();

  // Clone scene so materials/properties are isolated
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    if (modelRef.current) {
      if (isWaving) {
        // Cheerful wave tilt and bounce when clicked
        const waveAngle = Math.sin(waveTimerRef.current * 12) * 0.12;
        modelRef.current.rotation.z = waveAngle;
        modelRef.current.position.y = 0.95 + Math.abs(Math.sin(waveTimerRef.current * 8)) * 0.08;
      } else {
        // Real-time cursor tracking: Avatar smoothly rotates to look toward mouse pointer
        const targetRotY = pointer.x * 0.55;
        const targetRotX = -pointer.y * 0.2;
        modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY, 0.08);
        modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX, 0.08);
        modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, 0, 0.08);

        // Gentle breathing hover physics
        modelRef.current.position.y = 0.95 + Math.sin(t * 1.8) * 0.035;
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      position={[0, 0.95, 0]}
      scale={[1.15, 1.15, 1.15]}
    />
  );
}

/**
 * Avatar3D - Main Interactive Avatar Component
 * - Renders user's uploaded avatar.glb
 * - Click interaction: waves, chimes, pops dialogue bubble
 * - Real-time cursor head tracking & breathing hover
 */
export default function Avatar3D({ onWave }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [speechBubble, setSpeechBubble] = useState(false);
  const waveTimerRef = useRef(0);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    if (isWaving) return;

    setIsWaving(true);
    setSpeechBubble(true);
    waveTimerRef.current = 0;
    playCyberChime();

    if (onWave) onWave();

    // Auto-hide speech bubble after 3.5 seconds
    setTimeout(() => {
      setSpeechBubble(false);
    }, 3500);
  };

  useFrame((state, delta) => {
    if (isWaving) {
      waveTimerRef.current += delta;
      if (waveTimerRef.current > 2.8) {
        setIsWaving(false);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.9, 0]}
      onClick={handleAvatarClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        setHovered(false);
      }}
    >
      {/* Interactive Speech Bubble HUD when Avatar waves */}
      {speechBubble && (
        <Html position={[0, 2.3, 0]} center distanceFactor={7}>
          <div className="bg-space-dark/95 border border-cyber-cyan p-3.5 rounded-xl shadow-glow-cyan backdrop-blur-md text-center w-64 animate-bounce pointer-events-none">
            <div className="text-xs font-mono font-bold text-cyber-cyan flex items-center justify-center gap-1.5 mb-1">
              <span>👋</span>
              <span>{PLACEHOLDERS.STUDENT_NAME.toUpperCase()} SPEAKS:</span>
            </div>
            <p className="text-xs text-slate-100 font-sans leading-tight">
              "Hi! I'm Sheryar Amir. Welcome to my Developer's Universe portfolio!"
            </p>
            <div className="text-[10px] font-mono text-cyber-violet mt-1.5">
              [Click again anytime to interact!]
            </div>
          </div>
        </Html>
      )}

      {/* Hover Tooltip when cursor points at Sheryar */}
      {hovered && !speechBubble && (
        <Html position={[0, 2.1, 0]} center distanceFactor={8}>
          <div className="bg-space-dark/85 border border-cyber-cyan/60 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none whitespace-nowrap shadow-glow-subtle">
            <span className="text-[11px] font-mono text-cyber-cyan font-semibold">
              👆 CLICK SHERYAR TO WAVE HI
            </span>
          </div>
        </Html>
      )}

      {/* Interactive Target Hologram at Sheryar's Feet */}
      {hovered && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.85, 32]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
        </mesh>
      )}

      {/* Load User's avatar.glb */}
      <Suspense fallback={null}>
        <RealAvatarModel
          hovered={hovered}
          isWaving={isWaving}
          waveTimerRef={waveTimerRef}
        />
      </Suspense>
    </group>
  );
}

// Pre-load avatar.glb for instantaneous rendering
useGLTF.preload('/models/avatar.glb');
