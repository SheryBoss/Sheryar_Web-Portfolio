import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * GlowingPlatform - Futuristic cybernetic pedestal with emissive energy rings
 */
export default function GlowingPlatform() {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const pulseDiscRef = useRef();

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.25;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.4;
    }
    if (pulseDiscRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.04;
      pulseDiscRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      {/* Main Solid Metallic Base Disc */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.7, 0.2, 48]} />
        <meshStandardMaterial
          color="#06091a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Primary Cyan Emissive Core Ring */}
      <mesh
        ref={pulseDiscRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
      >
        <ringGeometry args={[1.5, 1.85, 48]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Rotating Violet Outer Ring with Segmented Accents */}
      <mesh
        ref={outerRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.04, 0]}
      >
        <ringGeometry args={[2.0, 2.3, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>

      {/* Counter-Rotating Inner Glyphs Ring */}
      <mesh
        ref={innerRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 0]}
      >
        <ringGeometry args={[0.7, 1.1, 24]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>

      {/* Emissive Center Cyber Node */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.9} />
      </mesh>

      {/* Subtle Bottom Glow Light Plane */}
      <pointLight
        position={[0, 0.2, 0]}
        color="#00f0ff"
        intensity={2.2}
        distance={3.5}
        decay={2}
      />
    </group>
  );
}
