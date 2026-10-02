"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { ArchitectureNode } from "@/types/portfolio";

interface FeaturedProject3DProps {
  nodes: ArchitectureNode[];
  onSelectNode: (node: ArchitectureNode | null) => void;
  selectedNodeId: string | null;
}

function ArchFlowNode({
  node,
  position,
  isSelected,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  node: ArchitectureNode;
  position: [number, number, number];
  isSelected: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = isSelected ? 1.35 : 1.0;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 8
    );
  });

  const nodeColor = useMemo(() => {
    switch (node.type) {
      case "entry":
        return "#38bdf8";
      case "gateway":
        return "#00f0ff";
      case "orchestrator":
        return "#8b5cf6";
      case "graph":
        return "#a855f7";
      case "agents":
        return "#ec4899";
      case "tools":
        return "#f59e0b";
      case "cache":
        return "#ef4444";
      case "storage":
        return "#10b981";
      default:
        return "#00f0ff";
    }
  }, [node.type]);

  return (
    <group position={position}>
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
        <boxGeometry args={[0.7, 0.45, 0.2]} />
        <meshStandardMaterial
          color={isSelected ? "#ffffff" : nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isSelected ? 2.0 : 0.8}
          roughness={0.2}
          metalness={0.7}
          wireframe={!isSelected}
        />
      </mesh>

      {/* Glow aura */}
      {isSelected && (
        <mesh>
          <boxGeometry args={[0.82, 0.55, 0.3]} />
          <meshBasicMaterial
            color={nodeColor}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* Label */}
      <Billboard follow={true}>
        <Text
          position={[0, -0.42, 0]}
          fontSize={0.14}
          color={isSelected ? "#00f0ff" : "#cbd5e1"}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
          textAlign="center"
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

// Data packet flow along pipeline
function FlowingPackets({
  positions,
}: {
  positions: [number, number, number][];
}) {
  const packetRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const segmentCount = positions.length - 1;

  useFrame(({ clock }) => {
    if (!packetRef.current) return;
    const t = (clock.getElapsedTime() * 0.7) % 1;

    for (let i = 0; i < segmentCount; i++) {
      const p1 = positions[i];
      const p2 = positions[i + 1];

      // Lerp between adjacent nodes
      dummy.position.set(
        p1[0] + (p2[0] - p1[0]) * t,
        p1[1] + (p2[1] - p1[1]) * t,
        p1[2] + (p2[2] - p1[2]) * t
      );
      dummy.scale.setScalar(0.06);
      dummy.updateMatrix();
      packetRef.current.setMatrixAt(i, dummy.matrix);
    }
    packetRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={packetRef} args={[undefined, undefined, segmentCount]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color="#00f0ff" blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export default function FeaturedProject3D({
  nodes,
  onSelectNode,
  selectedNodeId,
}: FeaturedProject3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Layout architecture in a structured cyber S-curve pipeline
  const positions: [number, number, number][] = useMemo(() => {
    // 8 nodes in a dual-row pipeline:
    // Row 1 (top, left-to-right): 0 to 3
    // Row 2 (bottom, right-to-left): 4 to 7
    return nodes.map((_, i) => {
      if (i < 4) {
        return [-2.7 + i * 1.8, 1.1, 0];
      } else {
        const offset = i - 4;
        return [2.7 - offset * 1.8, -1.1, 0];
      }
    });
  }, [nodes]);

  // Construct connecting pipeline line geometry
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < positions.length - 1; i++) {
      points.push(new THREE.Vector3(...positions[i]));
      points.push(new THREE.Vector3(...positions[i + 1]));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [positions]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 2, 5]} intensity={2.0} color="#00f0ff" />
      <pointLight position={[0, -2, 5]} intensity={1.5} color="#8b5cf6" />

      <group ref={groupRef}>
        {/* Pipeline connecting conduit line */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Moving data packets */}
        <FlowingPackets positions={positions} />

        {/* Nodes */}
        {nodes.map((node, idx) => (
          <ArchFlowNode
            key={node.id}
            node={node}
            position={positions[idx]}
            isSelected={selectedNodeId === node.id}
            onPointerOver={() => onSelectNode(node)}
            onPointerOut={() => onSelectNode(null)}
            onClick={() => onSelectNode(node)}
          />
        ))}
      </group>
    </>
  );
}
