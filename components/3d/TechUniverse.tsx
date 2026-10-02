"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { SkillCategory, SkillItem } from "@/types/portfolio";

export interface FlatSkillNode {
  category: string;
  categoryId: string;
  color: string;
  item: SkillItem;
  position: [number, number, number];
}

interface TechUniverseProps {
  categories: SkillCategory[];
  onSelectNode?: (node: FlatSkillNode | null) => void;
  selectedNodeName?: string | null;
}

function TechUniverseNode({
  node,
  isSelected,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  node: FlatSkillNode;
  isSelected: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = isSelected ? 1.5 : 1.0;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 8
    );
  });

  return (
    <group position={node.position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            onPointerOver();
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onPointerOut();
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isSelected ? 2.5 : 1.2}
            roughness={0.2}
            metalness={0.8}
            wireframe={!isSelected}
          />
        </mesh>

        {isSelected && (
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial
              color={node.color}
              wireframe
              transparent
              opacity={0.4}
            />
          </mesh>
        )}

        <Billboard follow={true}>
          <Text
            position={[0, -0.38, 0]}
            fontSize={0.16}
            color={isSelected ? "#ffffff" : "#cbd5e1"}
            anchorX="center"
            anchorY="middle"
          >
            {node.item.name}
          </Text>
        </Billboard>
      </Float>
    </group>
  );
}

export default function TechUniverse({
  categories,
  onSelectNode,
  selectedNodeName,
}: TechUniverseProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Spatially cluster categories into 4 distinct quadrants in 3D
  const flatNodes = useMemo<FlatSkillNode[]>(() => {
    const quadrantOffsets: Record<string, [number, number, number]> = {
      backend: [-2.4, 1.4, 0],
      ai: [2.4, 1.4, 0],
      infrastructure: [-2.4, -1.4, 0],
      frontend: [2.4, -1.4, 0],
    };

    const result: FlatSkillNode[] = [];

    categories.forEach((cat) => {
      const basePos = quadrantOffsets[cat.id] || [0, 0, 0];
      const count = cat.items.length;

      cat.items.forEach((item, idx) => {
        const angle = (idx / count) * Math.PI * 2;
        const radius = 1.25 + (idx % 2) * 0.4;
        const x = basePos[0] + Math.cos(angle) * radius;
        const y = basePos[1] + Math.sin(angle) * (radius * 0.7);
        const z = basePos[2] + (Math.sin(angle * 2) * 0.6);

        result.push({
          category: cat.name,
          categoryId: cat.id,
          color: cat.color,
          item,
          position: [x, y, z],
        });
      });
    });

    return result;
  }, [categories]);

  // Construct constellation lines connecting items within same category
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];

    categories.forEach((cat) => {
      const catNodes = flatNodes.filter((n) => n.categoryId === cat.id);
      for (let i = 0; i < catNodes.length; i++) {
        for (let j = i + 1; j < catNodes.length; j++) {
          const p1 = new THREE.Vector3(...catNodes[i].position);
          const p2 = new THREE.Vector3(...catNodes[j].position);
          // Connect if distance is within local cluster
          if (p1.distanceTo(p2) < 2.0) {
            points.push(p1);
            points.push(p2);
          }
        }
      }
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [categories, flatNodes]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 8]} intensity={2.5} color="#00f0ff" />
      <pointLight position={[-6, 4, -2]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[6, -4, -2]} intensity={1.5} color="#06b6d4" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.6}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
      />

      <group ref={groupRef}>
        {/* Constellation grid links */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Nodes */}
        {flatNodes.map((node) => (
          <TechUniverseNode
            key={`${node.categoryId}-${node.item.name}`}
            node={node}
            isSelected={selectedNodeName === node.item.name}
            onPointerOver={() => onSelectNode?.(node)}
            onPointerOut={() => onSelectNode?.(null)}
            onClick={() => onSelectNode?.(node)}
          />
        ))}
      </group>
    </>
  );
}
