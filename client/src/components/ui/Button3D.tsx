import { useRef, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type Button3DVariant = "primary" | "secondary" | "outline" | "white";

const variantColors: Record<Button3DVariant, { main: string; hover: string }> = {
  primary: { main: "#db2777", hover: "#be185d" },
  secondary: { main: "#4c1d95", hover: "#5b21b6" },
  outline: { main: "transparent", hover: "rgba(219, 39, 119, 0.2)" },
  white: { main: "#f8fafc", hover: "#e2e8f0" },
};

function ButtonMesh({
  variant,
  hovered,
  width,
  height,
}: {
  variant: Button3DVariant;
  hovered: boolean;
  width: number;
  height: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colors = variantColors[variant];

  useFrame(() => {
    if (!meshRef.current) return;
    const scale = hovered ? 1.08 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, hovered ? 1.15 : 1), 0.08);
  });

  const isOutline = variant === "outline";
  const isWhite = variant === "white";

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[width, height, height * 0.4]}
        radius={height / 2}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={isOutline ? "#831843" : colors.main}
          emissive={hovered && !isOutline ? (isWhite ? "#cbd5e1" : "#9d174d") : "#000000"}
          emissiveIntensity={hovered ? 0.15 : 0}
          transparent={isOutline}
          opacity={isOutline ? 0 : 1}
        />
      </RoundedBox>
      {isOutline && (
        <RoundedBox args={[width, height, height * 0.35]} radius={height / 2} smoothness={4}>
          <meshBasicMaterial color={colors.main} wireframe />
        </RoundedBox>
      )}
    </group>
  );
}

function Scene({
  variant,
  hovered,
  width,
  height,
}: {
  variant: Button3DVariant;
  hovered: boolean;
  width: number;
  height: number;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 5]} intensity={1.2} />
      <directionalLight position={[-1, -1, 3]} intensity={0.4} />
      <ButtonMesh variant={variant} hovered={hovered} width={width} height={height} />
    </>
  );
}

export interface Button3DProps {
  children: React.ReactNode;
  variant?: Button3DVariant;
  width?: number;
  height?: number;
  className?: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
}

const defaultWidth = 160;
const defaultHeight = 44;

export function Button3D({
  children,
  variant = "primary",
  width = defaultWidth,
  height = defaultHeight,
  className = "",
  href,
  to,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}: Button3DProps) {
  const [hovered, setHovered] = useState(false);

  const Wrapper = to != null ? Link : href != null ? "a" : "button";
  const wrapperProps = to != null
    ? { to, onClick }
    : href != null
      ? { href, onClick }
      : { type, onClick, disabled };

  const sizeStyle = fullWidth
    ? { width: "100%", height: `${height}px`, minHeight: height }
    : { width: `${width}px`, height: `${height}px`, minWidth: width, minHeight: height };

  return (
    <Wrapper
      {...wrapperProps}
      className={`relative overflow-hidden rounded-full ${fullWidth ? "block" : "inline-block"} ${className}`}
      style={sizeStyle}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        orthographic
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} hovered={hovered && !disabled} width={(fullWidth ? 280 : width) / 40} height={height / 40} />
        </Suspense>
      </Canvas>
      <span
        className="absolute inset-0 flex items-center justify-center text-sm font-medium pointer-events-none select-none"
        style={{
          color: variant === "white" ? "#0f172a" : variant === "outline" ? "#f472b6" : "#fff",
        }}
      >
        {children}
      </span>
    </Wrapper>
  );
}
