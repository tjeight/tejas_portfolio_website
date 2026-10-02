"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { CoreTechNode } from "@/types/portfolio";

interface DeveloperCoreProps {
  nodes: CoreTechNode[];
  onHoverNode?: (node: CoreTechNode | null) => void;
  hoveredNodeName?: string | null;
}

// Single Tech Node in 3D Orbit
function TechOrbNode({
  node,
  position,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  node: CoreTechNode;
  position: [number, number, number];
  isHovered: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleTarget = isHovered ? 1.4 : 1.0;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), delta * 10);
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Node Sphere */}
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
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 2.5 : 1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer glowing halo ring on hover */}
        {isHovered && (
          <mesh>
            <ringGeometry args={[0.22, 0.26, 32]} />
            <meshBasicMaterial
              color={node.color}
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}

        {/* Always-facing Billboard Label */}
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text
            position={[0, -0.32, 0]}
            fontSize={0.14}
            color={isHovered ? "#ffffff" : "#94a3b8"}
            anchorX="center"
            anchorY="middle"
          >
            {node.name.toUpperCase()}
          </Text>
        </Billboard>
      </Float>
    </group>
  );
}

// Data Pulses travelling from core to nodes
function DataPackets({
  nodePositions,
}: {
  nodePositions: [number, number, number][];
}) {
  const packetRef = useRef<THREE.InstancedMesh>(null);
  const count = nodePositions.length;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!packetRef.current) return;
    const t = clock.getElapsedTime() * 0.8;

    for (let i = 0; i < count; i++) {
      const pos = nodePositions[i];
      // Travel outwards from center to node along line
      const progress = (t + (i * 0.35)) % 1;
      dummy.position.set(
        pos[0] * progress,
        pos[1] * progress,
        pos[2] * progress
      );
      dummy.scale.setScalar(0.04 * (1 - Math.abs(progress - 0.5) * 1.2));
      dummy.updateMatrix();
      packetRef.current.setMatrixAt(i, dummy.matrix);
    }
    packetRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={packetRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#00f0ff" blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export default function DeveloperCore({
  nodes,
  onHoverNode,
  hoveredNodeName,
}: DeveloperCoreProps) {
  const systemRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Distribute nodes evenly in an orbit shell around the core
  const nodePositions: [number, number, number][] = useMemo(() => {
    const total = nodes.length;
    const radius = 2.4;
    return nodes.map((_, idx) => {
      // Golden spiral distribution on sphere for balanced aesthetic dispersion
      const phi = Math.acos(1 - (2 * (idx + 0.5)) / total);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (idx + 0.5);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (radius * 0.85) * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return [x, y, z];
    });
  }, [nodes]);

  // Connecting lines geometry between central core and nodes
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    nodePositions.forEach((pos) => {
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(...pos));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodePositions]);

  useFrame(({ pointer }, delta) => {
    // Smooth mouse parallax lerp
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, pointer.x * 0.5, delta * 3);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, pointer.y * 0.5, delta * 3);

    if (systemRef.current) {
      systemRef.current.rotation.y += delta * 0.15;
      systemRef.current.rotation.x = mousePos.current.y * 0.3;
      systemRef.current.rotation.z = -mousePos.current.x * 0.2;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.35;
      innerRingRef.current.rotation.z += delta * 0.25;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.y -= delta * 0.3;
      outerRingRef.current.rotation.x -= delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#00f0ff" distance={8} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-5, -5, -5]} intensity={1.2} color="#06b6d4" />

      <group ref={systemRef}>
        {/* Central Core: Glowing Sphere */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial
            color="#091833"
            emissive="#00f0ff"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Central Core Wireframe Shield */}
        <mesh>
          <icosahedronGeometry args={[0.85, 2]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbiting Orbital Ring 1 */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.2, 0.012, 16, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Orbiting Orbital Ring 2 */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.01, 16, 64]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Network Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Data pulses travelling along lines */}
        <DataPackets nodePositions={nodePositions} />

        {/* Orbiting Tech Nodes */}
        {nodes.map((node, i) => (
          <TechOrbNode
            key={node.name}
            node={node}
            position={nodePositions[i]}
            isHovered={hoveredNodeName === node.name}
            onPointerOver={() => onHoverNode?.(node)}
            onPointerOut={() => onHoverNode?.(null)}
            onClick={() => onHoverNode?.(node)}
          />
        ))}
      </group>
    </>
  );
}
