import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const FLOATING_NODES = [
  {
    name: "Blender 3D",
    detail: "Character Rigging & Topology",
    pos: [-2.6, 1.2, 0.4],
    color: "#00f0ff",
    speed: 1.2,
    phase: 0,
    shape: "octahedron",
  },
  {
    name: "Three.js / R3F",
    detail: "WebGL Shaders & Lighting",
    pos: [2.6, 1.4, 0.2],
    color: "#8b5cf6",
    speed: 1.0,
    phase: 2,
    shape: "dodecahedron",
  },
  {
    name: "Unity / Unreal",
    detail: "Gameplay Mechanics & Physics",
    pos: [-2.2, -0.2, 1.2],
    color: "#38bdf8",
    speed: 0.9,
    phase: 4,
    shape: "icosahedron",
  },
  {
    name: "Gemini AI",
    detail: "RAG & Vector Retrieval",
    pos: [2.3, -0.1, 1.0],
    color: "#ec4899",
    speed: 1.1,
    phase: 1,
    shape: "tetrahedron",
  },
];

function SkillNode({ node }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = node.pos[1] + Math.sin(t * node.speed + node.phase) * 0.18;
      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group position={[node.pos[0], node.pos[1], node.pos[2]]}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.25 : 1.0}
      >
        {node.shape === 'octahedron' && <octahedronGeometry args={[0.22, 0]} />}
        {node.shape === 'dodecahedron' && <dodecahedronGeometry args={[0.22, 0]} />}
        {node.shape === 'icosahedron' && <icosahedronGeometry args={[0.22, 0]} />}
        {node.shape === 'tetrahedron' && <tetrahedronGeometry args={[0.24, 0]} />}

        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.2}
          metalness={0.8}
          wireframe={!hovered}
        />

        {/* Holographic Badge when hovered */}
        {hovered && (
          <Html position={[0, 0.45, 0]} center distanceFactor={9}>
            <div className="bg-space-dark/95 border border-cyber-cyan px-2.5 py-1.5 rounded-lg shadow-glow-cyan backdrop-blur-md whitespace-nowrap pointer-events-none text-center">
              <div className="text-xs font-mono font-bold text-cyber-cyan">
                {node.name}
              </div>
              <div className="text-[10px] text-slate-300 font-sans">
                {node.detail}
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

export default function FloatingSkills() {
  return (
    <group>
      {FLOATING_NODES.map((node, idx) => (
        <SkillNode key={idx} node={node} />
      ))}
    </group>
  );
}
