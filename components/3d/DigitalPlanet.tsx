"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DigitalPlanet() {
  const planetRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Generate satellite nodes on the sphere surface
  const satellitePositions = useMemo(() => {
    const points: [number, number, number][] = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.1;
      points.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]);
    }
    return points;
  }, []);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
      planetRef.current.rotation.x += delta * 0.04;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.18;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={2.5} color="#00f0ff" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#8b5cf6" />

      <group ref={planetRef}>
        {/* Deep dark sphere core */}
        <mesh>
          <sphereGeometry args={[1.95, 32, 32]} />
          <meshStandardMaterial
            color="#040b1a"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Digital Wireframe Grid */}
        <mesh>
          <sphereGeometry args={[2.0, 24, 24]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Outer glowing atmospheric mesh */}
        <mesh ref={atmosphereRef}>
          <icosahedronGeometry args={[2.15, 2]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Equatorial cyber ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.8, 0, 0]}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Surface satellite nodes */}
        {satellitePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00f0ff" : i % 3 === 1 ? "#8b5cf6" : "#38bdf8"}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
