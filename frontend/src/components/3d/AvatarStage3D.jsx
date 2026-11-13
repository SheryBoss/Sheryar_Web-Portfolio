import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Cyber Chime synthesizer for interactive stage click
 */
function playStageClickSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Ignore audio restrictions
  }
}

/**
 * AvatarStage3D - Beautiful 3D Stage Placeholder for Sheryar's Future Blender Avatar
 * Features:
 * - Concentric glowing cyber rings
 * - Holographic humanoid wireframe mannequin placeholder
 * - Floating status HUD badge
 * - Interactive pointer tracking and click scan wave
 */
export default function AvatarStage3D({ onStageClick }) {
  const stageGroupRef = useRef();
  const mannequinRef = useRef();
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const beaconRef = useRef();

  const [hovered, setHovered] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    playStageClickSound();
    setPulseActive(true);
    setStatusMessage(true);
    if (onStageClick) onStageClick();

    setTimeout(() => setPulseActive(false), 800);
    setTimeout(() => setStatusMessage(false), 3500);
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    // Outer and Inner Ring Rotations
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.35;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.5;
    }

    // Holographic Mannequin Subtle Floating Hover & Pointer Tilt
    if (mannequinRef.current) {
      mannequinRef.current.position.y = 0.4 + Math.sin(t * 2) * 0.05;
      mannequinRef.current.rotation.y = THREE.MathUtils.lerp(
        mannequinRef.current.rotation.y,
        pointer.x * 0.4,
        0.08
      );
    }

    // Beacon Pulse
    if (beaconRef.current) {
      const scaleY = 1 + Math.sin(t * 3) * 0.15;
      beaconRef.current.scale.set(1, scaleY, 1);
    }
  });

  return (
    <group
      ref={stageGroupRef}
      position={[0, -0.6, 0]}
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        setHovered(false);
      }}
    >
      {/* Interactive 3D Speech/Status Tag above the stage */}
      {statusMessage && (
        <Html position={[0, 2.5, 0]} center distanceFactor={7}>
          <div className="bg-space-dark/95 border border-cyber-cyan p-3 rounded-xl shadow-glow-cyan backdrop-blur-md text-center w-64 animate-bounce pointer-events-none">
            <div className="text-xs font-mono font-bold text-cyber-cyan uppercase">
              ⚡ 3D AVATAR STAGE ACTIVE
            </div>
            <p className="text-xs text-slate-200 mt-1">
              "Awaiting custom rigged Blender GLB/glTF avatar export in public/models/avatar.glb"
            </p>
          </div>
        </Html>
      )}

      {/* Floating Hover Indicator */}
      {hovered && !statusMessage && (
        <Html position={[0, 2.3, 0]} center distanceFactor={8}>
          <div className="bg-space-dark/80 border border-cyber-cyan/50 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none shadow-glow-subtle whitespace-nowrap">
            <span className="text-[11px] font-mono text-cyber-cyan">
              👆 CLICK 3D STAGE TO TRIGGER SCAN
            </span>
          </div>
        </Html>
      )}

      {/* ============================================================== */}
      {/* 1. HOLOGRAPHIC AVATAR WIREFRAME MANNEQUIN (PLACEHOLDER)        */}
      {/* ============================================================== */}
      <group ref={mannequinRef} position={[0, 0.4, 0]}>
        {/* Floating Hologram Label */}
        <Html position={[0, 1.45, 0]} center distanceFactor={9}>
          <div className="pointer-events-none text-center">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyber-violet/20 border border-cyber-violet/50 text-[10px] font-mono font-bold text-cyber-violet uppercase tracking-wider shadow-glow-violet">
              BLENDER AVATAR STAGE
            </div>
          </div>
        </Html>

        {/* Head Sphere (Holographic Wireframe) */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={hovered ? 0.9 : 0.4}
            wireframe
          />
        </mesh>

        {/* Glasses Wireframe Frame (Sheryar's Signature) */}
        <mesh position={[0, 0.9, 0.2]}>
          <boxGeometry args={[0.22, 0.06, 0.02]} />
          <meshBasicMaterial color="#38bdf8" wireframe />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.12, 16]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>

        {/* Chest / Torso Hologram (Stylized Jacket & Shirt Silhouette) */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.38, 0.48, 0.22]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>

        {/* Emissive Core Crystal inside Chest */}
        <mesh position={[0, 0.45, 0]}>
          <octahedronGeometry args={[0.1, 0]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Left Arm Wireframe */}
        <mesh position={[-0.28, 0.38, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.06, 0.05, 0.48, 12]} />
          <meshStandardMaterial color="#38bdf8" wireframe />
        </mesh>

        {/* Right Arm Wireframe (Slightly Raised in Welcome Pose) */}
        <mesh position={[0.28, 0.42, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.06, 0.05, 0.48, 12]} />
          <meshStandardMaterial color="#38bdf8" wireframe />
        </mesh>

        {/* Pelvis & Waist Ring */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.18, 0.17, 0.08, 16]} />
          <meshStandardMaterial color="#00f0ff" wireframe />
        </mesh>

        {/* Legs Wireframe */}
        <mesh position={[-0.1, -0.25, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.65, 12]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
        <mesh position={[0.1, -0.25, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.65, 12]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. CYBERNETIC MULTI-RING GLOWING PEDESTAL                      */}
      {/* ============================================================== */}
      {/* Main Base Cylinder */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.4, 0.2, 48]} />
        <meshStandardMaterial
          color="#060919"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Emissive Center Core Disc */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial
          color={pulseActive ? "#ffffff" : "#00f0ff"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner Rotating Glyphs Ring */}
      <mesh
        ref={innerRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.03, 0]}
      >
        <ringGeometry args={[0.9, 1.25, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.65}
          wireframe
        />
      </mesh>

      {/* Outer Rotating Violet Ring */}
      <mesh
        ref={outerRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.04, 0]}
      >
        <ringGeometry args={[1.5, 1.9, 48]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>

      {/* Vertical Holographic Cylindrical Laser Cage */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 1.6, 24, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={hovered ? 0.25 : 0.12}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pedestal Point Light */}
      <pointLight
        position={[0, 0.5, 0]}
        color="#00f0ff"
        intensity={pulseActive ? 4.5 : 2.0}
        distance={4.5}
        decay={2}
      />
    </group>
  );
}
