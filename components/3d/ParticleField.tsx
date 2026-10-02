"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  speed?: number;
  spread?: number;
  color?: string;
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
}

export default function ParticleField({
  count = 200,
  speed = 0.05,
  spread = 15,
  color = "#00f0ff",
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Pure deterministic particle generation
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * spread;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * spread;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * spread;
      sca[i] = pseudoRandom(i + 10) * 0.5 + 0.5;
    }

    return [pos, sca];
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed * 0.2;
    pointsRef.current.rotation.x += delta * speed * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
