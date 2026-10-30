"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroSceneCopy } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const warningGlobal = globalThis as typeof globalThis & {
  __threeClockWarningPatched?: boolean;
};

if (typeof window !== "undefined" && !warningGlobal.__threeClockWarningPatched) {
  const originalWarn = console.warn.bind(console);

  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }

    originalWarn(...args);
  };

  warningGlobal.__threeClockWarningPatched = true;
}

type Vec3 = [number, number, number];

interface AgentSceneProps {
  scene: HeroSceneCopy;
  reducedMotion: boolean;
  active: boolean;
  onReady: () => void;
}

function seeded(index: number) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function createLabelTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 128;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const label = text.toUpperCase();
  const dotSize = 7;
  const gap = 14;

  context.font = "500 40px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textAlign = "left";
  context.textBaseline = "middle";

  const textWidth = context.measureText(label).width;
  const startX = (canvas.width - dotSize - gap - textWidth) / 2;
  const centerY = canvas.height / 2;

  context.fillStyle = "#c8f75a";
  context.beginPath();
  context.arc(startX + dotSize / 2, centerY, dotSize / 2, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "rgba(241, 239, 230, 0.76)";
  context.fillText(label, startX + dotSize + gap, centerY);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return texture;
}

function SceneLabel({
  text,
  position,
  visible,
}: {
  text: string;
  position: Vec3;
  visible: boolean;
}) {
  const texture = useMemo(() => createLabelTexture(text), [text]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  if (!texture) {
    return null;
  }

  return (
    <sprite position={position} scale={[2.6, 0.325, 1]} visible={visible} renderOrder={4}>
      <spriteMaterial
        map={texture}
        transparent
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  );
}

function SceneContent({
  scene,
  reducedMotion,
  scrollProgress,
}: {
  scene: HeroSceneCopy;
  reducedMotion: boolean;
  scrollProgress: { current: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRefTwo = useRef<THREE.Mesh>(null);
  const dustRef = useRef<THREE.Points>(null);
  const { size, pointer } = useThree();
  const labelsVisible = size.width >= 768;

  const nodes = useMemo(() => {
    const count = scene.nodeLabels.length;

    return scene.nodeLabels.map((node, index) => {
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
      const radius = index % 2 === 0 ? 2.05 : 2.52;
      const y = Math.sin(index * 1.9) * 0.5;
      const position: Vec3 = [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ];
      const labelPosition: Vec3 = [
        position[0] * 1.16,
        position[1] + 0.18,
        position[2] * 1.16,
      ];

      return { ...node, position, labelPosition };
    });
  }, [scene.nodeLabels]);

  const particles = useMemo(() => {
    const count = size.width < 640 ? 110 : 230;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.8 + seeded(index) * 1.7;
      const theta = seeded(index + 13) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(index + 29) - 1);

      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi) * 0.8;
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return positions;
  }, [size.width]);

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current || !coreRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const progress = scrollProgress.current ?? 0;
    const targetRotationY =
      pointer.x * 0.24 + progress * 0.55 + Math.sin(elapsed * 0.09) * 0.1;
    const targetRotationX = -pointer.y * 0.15 + progress * 0.12;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotationY,
      3,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotationX,
      3,
      delta,
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      -progress * 0.45,
      3,
      delta,
    );

    coreRef.current.rotation.y += delta * 0.11;
    coreRef.current.rotation.x += delta * 0.035;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.06;
    }

    if (ringRefTwo.current) {
      ringRefTwo.current.rotation.y += delta * 0.045;
    }

    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.018;
      dustRef.current.rotation.x = Math.sin(elapsed * 0.06) * 0.08;
    }

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      -progress * 0.85,
      3,
      delta,
    );
  });

  return (
    <group ref={groupRef} scale={size.width < 480 ? 0.82 : 1}>
      <mesh>
        <sphereGeometry args={[2.82, 24, 24]} />
        <meshBasicMaterial
          color="#f1efe6"
          wireframe
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>

      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1.03, 1]} />
          <meshStandardMaterial
            color="#171d15"
            emissive="#2b3b11"
            emissiveIntensity={0.35}
            metalness={0.86}
            roughness={0.24}
            flatShading
          />
        </mesh>
        <mesh scale={1.015}>
          <icosahedronGeometry args={[1.03, 1]} />
          <meshBasicMaterial
            color="#c8f75a"
            wireframe
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={1.22}>
          <sphereGeometry args={[1.03, 32, 32]} />
          <meshBasicMaterial
            color="#c8f75a"
            transparent
            opacity={0.035}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <mesh ref={ringRef} rotation={[Math.PI / 2.15, 0.12, 0.18]}>
        <torusGeometry args={[1.55, 0.005, 6, 180]} />
        <meshBasicMaterial color="#c8f75a" transparent opacity={0.48} />
      </mesh>
      <mesh ref={ringRefTwo} rotation={[0.38, 0.18, Math.PI / 2.7]}>
        <torusGeometry args={[1.92, 0.004, 6, 180]} />
        <meshBasicMaterial color="#f1efe6" transparent opacity={0.18} />
      </mesh>

      {nodes.map((node) => (
        <group key={node.id}>
          <Line
            points={[
              [0, 0, 0],
              node.position,
            ]}
            color="#c8f75a"
            lineWidth={0.65}
            transparent
            opacity={0.28}
          />
          <mesh position={node.position}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color="#c8f75a" />
          </mesh>
          <mesh position={node.position}>
            <sphereGeometry args={[0.145, 16, 16]} />
            <meshBasicMaterial
              color="#c8f75a"
              transparent
              opacity={0.07}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <SceneLabel
            text={node.label}
            position={node.labelPosition}
            visible={labelsVisible}
          />
        </group>
      ))}

      <SceneLabel
        text={scene.coreLabel}
        position={[0, -1.52, 0]}
        visible={labelsVisible}
      />

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#dce8bd"
          size={0.028}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function AgentScene({
  scene,
  reducedMotion,
  active,
  onReady,
}: AgentSceneProps) {
  const scrollProgress = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: "#top",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (ready) {
      onReady();
    }
  }, [ready, onReady]);

  return (
    <Canvas
      camera={{ position: [0, 0.12, 9.4], fov: 38, near: 0.1, far: 30 }}
      dpr={[1, 1.6]}
      style={{ touchAction: "pan-y" }}
      frameloop={reducedMotion ? "demand" : active ? "always" : "never"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        setReady(true);
      }}
    >
      <fog attach="fog" args={["#070908", 7.5, 16]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#f6f4e8" />
      <pointLight position={[-3.4, -2.2, 2.4]} intensity={24} color="#c8f75a" />
      <pointLight position={[3.2, 2.8, -2]} intensity={12} color="#9db8ff" />
      <SceneContent
        scene={scene}
        reducedMotion={reducedMotion}
        scrollProgress={scrollProgress}
      />
    </Canvas>
  );
}
