import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * SceneLighting - Cinematic dark navy, cyan & violet lighting for Developer's Universe
 */
export default function SceneLighting() {
  const movingLightRef = useRef();

  useFrame((state) => {
    if (movingLightRef.current) {
      const t = state.clock.getElapsedTime();
      movingLightRef.current.position.x = Math.sin(t * 0.5) * 4;
      movingLightRef.current.position.z = Math.cos(t * 0.5) * 4;
    }
  });

  return (
    <>
      {/* Deep Navy/Black Ambient Foundation */}
      <ambientLight color="#080e28" intensity={0.8} />

      {/* Primary Cyber Violet Directional Light */}
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.0}
        color="#8b5cf6"
      />

      {/* Cyber Cyan Spotlight Focusing on Avatar & Platform */}
      <spotLight
        position={[-5, 7, 3]}
        angle={0.65}
        penumbra={0.8}
        intensity={2.8}
        color="#00f0ff"
        castShadow={false}
      />

      {/* Deep Blue Rim Light from Behind for Silhouette Separation */}
      <directionalLight
        position={[0, 4, -7]}
        intensity={1.5}
        color="#1d4ed8"
      />

      {/* Orbiting Soft Violet/Cyan Point Light */}
      <pointLight
        ref={movingLightRef}
        position={[0, 1.5, 3]}
        color="#a855f7"
        intensity={1.8}
        distance={9}
        decay={2}
      />

      {/* Subtle Ground Bounce Light */}
      <pointLight
        position={[0, -0.8, 0]}
        color="#00f0ff"
        intensity={1.2}
        distance={4}
        decay={2}
      />
    </>
  );
}
