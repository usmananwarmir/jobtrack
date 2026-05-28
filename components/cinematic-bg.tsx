"use client";

import { Float, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function FloatingOrb({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.8} rotationIntensity={1.6} floatIntensity={2}>
      <mesh position={position}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
    </Float>
  );
}

export function CinematicBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 4, 4]} intensity={10} />
        <pointLight position={[-6, -4, 2]} intensity={8} color="#7c3aed" />
        <FloatingOrb position={[-2.8, 1.4, 0]} color="#00ccff" />
        <FloatingOrb position={[2.5, -1.2, -0.5]} color="#a855f7" />
        <FloatingOrb position={[0.4, 2.3, -1.2]} color="#ec4899" />
      </Canvas>
    </div>
  );
}
