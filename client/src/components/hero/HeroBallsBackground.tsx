import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

const STAR_COUNT = 280;
const HERO_X = 8.5;
const HERO_Y = 6.5;
const HERO_Z_BACK = -5.8;
const HERO_Z_FRONT = -2.9;

function Starfield() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      pos[i * 3 + 0] = -HERO_X + Math.random() * (2 * HERO_X);
      pos[i * 3 + 1] = -HERO_Y + Math.random() * (2 * HERO_Y);
      pos[i * 3 + 2] = HERO_Z_BACK + Math.random() * (HERO_Z_FRONT - HERO_Z_BACK);
    }
    return pos;
  }, []);

  return (
    <points ref={points} renderOrder={0}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        transparent={false}
        opacity={1}
        color="#e8f4ff"
        sizeAttenuation
        depthWrite={true}
        depthTest={true}
      />
    </points>
  );
}

const CUBE_COLORS = ["#64748b", "#ec4899", "#c084fc"];
const CUBE_COUNT = 3;
const SIZE_MULT = 3;
const FOLLOW_SPEED = 0.06;

function getCubeParams(index: number) {
  const size = (0.4 + index * 0.12) * SIZE_MULT;
  const speed = 0.12 + index * 0.04; // Increased speed for more activity
  const radius = 1.8 + index * 0.4; // Increased radius for more movement
  const phase = index * 1.7 + 2;
  return { size, speed, radius, phase };
}

function WanderingCube({
  index,
  color,
  setRef,
}: {
  index: number;
  color: string;
  setRef: (el: THREE.Mesh | null) => void;
}) {
  const params = getCubeParams(index);
  const rotSpeed = 0.3 + index * 0.1;
  const localRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!localRef.current) return;
    localRef.current.rotation.x = state.clock.elapsedTime * rotSpeed * 1.1;
    localRef.current.rotation.y = state.clock.elapsedTime * rotSpeed * 1.3;
  });

  return (
    <RoundedBox
      ref={(el) => {
        (localRef as React.MutableRefObject<THREE.Mesh | null>).current = el;
        setRef(el);
      }}
      args={[params.size, params.size, params.size]}
      radius={params.size * 0.12}
      smoothness={4}
      renderOrder={1}
    >
      <meshPhysicalMaterial
        color={color}
        metalness={0.92}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={0.9}
        emissive={color}
        emissiveIntensity={0.06}
        transparent={false}
        depthWrite={true}
      />
    </RoundedBox>
  );
}

function CubesGroup() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const triangleRotation = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Fixed position - moved a little down and more right
    const triangleCenter = new THREE.Vector3(3.5, -1.0, -3);

    // Slowly rotate the triangle formation
    triangleRotation.current = t * 0.15;

    // Triangle vertices - smaller equilateral triangle (0.7x scale)
    const triangleRadius = 1.75; // 2.5 * 0.7
    const angles = [
      Math.PI / 2,           // Top vertex
      Math.PI / 2 + (2 * Math.PI / 3),  // Bottom-left vertex
      Math.PI / 2 + (4 * Math.PI / 3)   // Bottom-right vertex
    ];

    // Position each cube at a triangle vertex
    for (let i = 0; i < CUBE_COUNT; i++) {
      const angle = angles[i] + triangleRotation.current;
      const offsetX = Math.cos(angle) * triangleRadius;
      const offsetY = Math.sin(angle) * triangleRadius;

      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.x = triangleCenter.x + offsetX;
        mesh.position.y = triangleCenter.y + offsetY;
        mesh.position.z = triangleCenter.z;
      }
    }
  });

  return (
    <group renderOrder={1}>
      {Array.from({ length: CUBE_COUNT }).map((_, i) => (
        <WanderingCube
          key={i}
          index={i}
          color={CUBE_COLORS[i % CUBE_COLORS.length]}
          setRef={(el) => { meshRefs.current[i] = el; }}
        />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, 5]} intensity={0.5} />
      <Starfield />
      <CubesGroup />
    </>
  );
}

export function HeroBallsBackground() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ minHeight: "100%", isolation: "isolate" }}
      role="presentation"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 1)}
        style={{ display: "block", width: "100%", height: "100%", minHeight: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
