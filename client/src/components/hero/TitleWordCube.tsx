import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const ROTATE_INTERVAL = 2.5; // Total cycle time
const ROTATE_DURATION = 0.4; // Fast rotation duration
const STOP_DURATION = 2.1; // Stop and show word duration

function WordCube() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const cycleTime = t % ROTATE_INTERVAL;
    
    // Determine which face to show (0 = SMS, 1 = OTP)
    const faceIndex = Math.floor(t / ROTATE_INTERVAL) % 2;
    
    // SMS is at rotation -PI/2 (top face rotated to front/right)
    // OTP is at rotation PI/2 (bottom face rotated to front/right)
    const targetRotation = faceIndex === 0 ? -Math.PI / 2 : Math.PI / 2;
    
    if (cycleTime < ROTATE_DURATION) {
      // Rapid rotation phase - rotate from previous position to target
      const progress = cycleTime / ROTATE_DURATION;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const previousRotation = faceIndex === 0 ? Math.PI / 2 : -Math.PI / 2;
      groupRef.current.rotation.x = previousRotation + (eased * (targetRotation - previousRotation));
    } else {
      // Stop phase - hold at exact rotation to show the word
      groupRef.current.rotation.x = targetRotation;
    }
  });

  // Increased font size to match title text exactly
  const fontSize = 1.0;
  const boxWidth = 3.2;
  const boxHeight = 1.15;
  const boxDepth = 1.5;

  return (
    <group ref={groupRef}>
      <RoundedBox args={[boxWidth, boxHeight, boxDepth]} radius={0.575} smoothness={4}>
        <meshPhysicalMaterial
          color="#ec4899"
          metalness={0.6}
          roughness={0.2}
          transparent={false}
          depthWrite={true}
        />
      </RoundedBox>
      <group position={[0, boxHeight / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text fontSize={fontSize} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={boxWidth - 0.3}>
          SMS
        </Text>
      </group>
      <group position={[0, -(boxHeight / 2 + 0.01), 0]} rotation={[Math.PI / 2, 0, 0]}>
        <Text fontSize={fontSize} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={boxWidth - 0.3}>
          OTP
        </Text>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} intensity={1.2} />
      <WordCube />
    </>
  );
}

export function TitleWordCube() {
  return (
    <span 
      className="inline-block align-middle w-32 h-12 sm:w-36 sm:h-14 md:w-40 md:h-16 mx-1 shrink-0" 
      style={{ verticalAlign: "middle" }}
      role="img"
      aria-label="SMS or OTP"
    >
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Scene />
      </Canvas>
    </span>
  );
}
