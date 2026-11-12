"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme, type Theme } from "./ThemeToggle";

const palettes = {
  light: {
    ink: "#17191c",
    wall: "#e4e7e0",
    wallSide: "#d8dcd3",
    floor: "#cfd4ca",
    wood: "#d9cdb8",
    paper: "#ffffff",
    cobalt: "#2c46d8",
    soft: "#c9d0f7",
    leaf: "#8fa58a",
  },
  dark: {
    ink: "#e8eae4",
    wall: "#23272c",
    wallSide: "#1c1f23",
    floor: "#2b3036",
    wood: "#3a352d",
    paper: "#f4f5f1",
    cobalt: "#7086ff",
    soft: "#2c3a7a",
    leaf: "#4c6150",
  },
};
type Palette = (typeof palettes)[Theme];

/* A box with flat colour and an ink outline: the building block of the room. */
function Part({
  size,
  position,
  color,
  rotation,
  edge,
  opacity = 1,
}: {
  size: [number, number, number];
  position: [number, number, number];
  color: string;
  edge: string;
  rotation?: [number, number, number];
  opacity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} transparent={opacity < 1} opacity={opacity} />
      <Edges color={edge} threshold={15} />
    </mesh>
  );
}

function Room({ c }: { c: Palette }) {
  const e = c.ink;
  const legs: [number, number][] = [
    [-0.55, -1.75],
    [1.35, -1.75],
    [-0.55, -1.15],
    [1.35, -1.15],
  ];
  return (
    <group>
      {/* Floor, walls, rug */}
      <Part size={[4.2, 0.08, 4.2]} position={[0, -0.04, 0]} color={c.floor} edge={e} />
      <Part size={[4.2, 2.8, 0.08]} position={[0, 1.4, -2.06]} color={c.wall} edge={e} />
      <Part size={[0.08, 2.8, 4.2]} position={[-2.06, 1.4, 0]} color={c.wallSide} edge={e} />
      <Part size={[2.4, 0.015, 1.7]} position={[0.35, 0.01, -0.45]} color={c.soft} edge={e} />

      {/* Window on the back wall */}
      <Part size={[1.1, 0.95, 0.05]} position={[-1.05, 1.75, -2]} color={c.soft} edge={e} />
      <Part size={[0.03, 0.95, 0.06]} position={[-1.05, 1.75, -1.98]} color={c.ink} edge={e} />
      <Part size={[1.1, 0.03, 0.06]} position={[-1.05, 1.75, -1.98]} color={c.ink} edge={e} />

      {/* Shelf with books on the left wall */}
      <Part size={[0.32, 0.04, 1.1]} position={[-1.85, 1.55, -0.55]} color={c.wood} edge={e} />
      {[
        [0.22, c.cobalt, -0.95],
        [0.28, c.paper, -0.85],
        [0.24, c.ink, -0.76],
        [0.3, c.wood, -0.66],
      ].map(([h, col, z], i) => (
        <Part
          key={i}
          size={[0.22, h as number, 0.08]}
          position={[-1.85, 1.57 + (h as number) / 2, z as number]}
          color={col as string}
          edge={e}
        />
      ))}
      <Part
        size={[0.22, 0.05, 0.3]}
        position={[-1.85, 1.6, -0.25]}
        color={c.cobalt}
        edge={e}
      />

      {/* Desk */}
      <Part size={[2.1, 0.06, 0.85]} position={[0.4, 0.76, -1.45]} color={c.wood} edge={e} />
      {legs.map(([x, z], i) => (
        <Part key={i} size={[0.05, 0.73, 0.05]} position={[x, 0.365, z]} color={c.wood} edge={e} />
      ))}

      {/* Monitor */}
      <Part size={[0.08, 0.25, 0.08]} position={[0.85, 0.91, -1.72]} color={c.ink} edge={e} />
      <Part size={[0.35, 0.02, 0.22]} position={[0.85, 0.8, -1.72]} color={c.ink} edge={e} />
      <Part size={[0.95, 0.58, 0.04]} position={[0.85, 1.3, -1.74]} color={c.ink} edge={e} />
      <mesh position={[0.85, 1.3, -1.715]}>
        <planeGeometry args={[0.87, 0.5]} />
        <meshBasicMaterial color={c.cobalt} />
      </mesh>
      {/* "Code" on the screen */}
      {[0.16, 0.1, 0.04, -0.02, -0.08, -0.14].map((y, i) => (
        <mesh key={y} position={[0.85 - 0.3 + ((i % 3) * 0.04) + 0.1, 1.3 + y, -1.71]}>
          <planeGeometry args={[0.2 + ((i * 37) % 5) * 0.06, 0.018]} />
          <meshBasicMaterial color={c.paper} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* Lamp */}
      <mesh position={[-0.3, 0.8, -1.7]}>
        <cylinderGeometry args={[0.1, 0.12, 0.03, 24]} />
        <meshBasicMaterial color={c.ink} />
      </mesh>
      <Part size={[0.025, 0.55, 0.025]} position={[-0.3, 1.07, -1.7]} color={c.ink} edge={e} />
      <Part
        size={[0.025, 0.4, 0.025]}
        position={[-0.2, 1.42, -1.55]}
        rotation={[0.9, 0, -0.5]}
        color={c.ink}
        edge={e}
      />
      <mesh position={[-0.08, 1.48, -1.35]} rotation={[0.35, 0, -0.25]}>
        <coneGeometry args={[0.13, 0.18, 24, 1, true]} />
        <meshBasicMaterial color={c.cobalt} side={THREE.DoubleSide} />
      </mesh>
      {/* Light falling on the desk */}
      <mesh position={[-0.02, 1.12, -1.28]} rotation={[0.2, 0, -0.1]}>
        <coneGeometry args={[0.38, 0.62, 32, 1, true]} />
        <meshBasicMaterial color={c.soft} transparent opacity={0.28} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Chair */}
      <Part size={[0.55, 0.05, 0.5]} position={[0.45, 0.48, -0.65]} color={c.cobalt} edge={e} />
      <Part size={[0.55, 0.55, 0.05]} position={[0.45, 0.78, -0.4]} color={c.cobalt} edge={e} />
      {[
        [0.22, -0.85],
        [0.68, -0.85],
        [0.22, -0.45],
        [0.68, -0.45],
      ].map(([x, z], i) => (
        <Part key={i} size={[0.04, 0.46, 0.04]} position={[x, 0.23, z]} color={c.ink} edge={e} />
      ))}

      {/* Plant */}
      <mesh position={[1.65, 0.18, -1.65]}>
        <cylinderGeometry args={[0.16, 0.12, 0.36, 24]} />
        <meshBasicMaterial color={c.paper} />
        <Edges color={e} threshold={30} />
      </mesh>
      {[
        [1.65, 0.62, -1.65, 0.24],
        [1.55, 0.82, -1.6, 0.17],
        [1.76, 0.78, -1.7, 0.15],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <icosahedronGeometry args={[r, 0]} />
          <meshBasicMaterial color={c.leaf} />
          <Edges color={e} threshold={15} />
        </mesh>
      ))}

      {/* Mug */}
      <mesh position={[1.25, 0.84, -1.25]}>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 20]} />
        <meshBasicMaterial color={c.paper} />
        <Edges color={e} threshold={30} />
      </mesh>
    </group>
  );
}

/* The résumé: a sheet of paper on the desk that lifts towards you on hover
   and downloads on click. */
function ResumeSheet({
  c,
  hovered,
  setHovered,
  onOpen,
  reduced,
}: {
  c: Palette;
  hovered: boolean;
  setHovered: (v: boolean) => void;
  onOpen: () => void;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const rest = useMemo(() => ({ pos: new THREE.Vector3(0.05, 0.797, -1.3), rx: -Math.PI / 2, ry: 0, rz: 0.25 }), []);
  const lift = useMemo(() => ({ pos: new THREE.Vector3(0.3, 1.45, -0.9), rx: -0.35, ry: 0.62, rz: 0 }), []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = hovered ? lift : rest;
    const k = reduced ? 1 : 1 - Math.exp(-delta * 7);
    g.position.lerp(t.pos, k);
    g.rotation.x += (t.rx - g.rotation.x) * k;
    g.rotation.y += (t.ry - g.rotation.y) * k;
    g.rotation.z += (t.rz - g.rotation.z) * k;
    // A gentle bob while it's held up, and a tiny "breathe" while it rests, to hint it's interactive.
    if (!reduced) {
      const time = state.clock.elapsedTime;
      g.position.y += hovered ? Math.sin(time * 2) * 0.004 : Math.sin(time * 2.4) * 0.0008;
    }
  });

  const line = (y: number, w: number, x = -0.12, color = c.ink, h = 0.012) => (
    <mesh key={`${y}-${x}`} position={[x + w / 2 - 0.05, y, 0.003]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );

  return (
    <group
      ref={ref}
      scale={1.25}
      position={rest.pos}
      rotation={[rest.rx, rest.ry, rest.rz]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      {/* the sheet (A4 proportions) */}
      <mesh>
        <boxGeometry args={[0.42, 0.594, 0.006]} />
        <meshBasicMaterial color={c.paper} />
        <Edges color={hovered ? c.cobalt : c.ink} threshold={15} />
      </mesh>
      {/* name, headings and lines of text */}
      {line(0.24, 0.24, -0.12, c.ink, 0.03)}
      {line(0.2, 0.15, -0.12, c.cobalt, 0.012)}
      {[0.14, 0.115, 0.09].map((y, i) => line(y, 0.3 - i * 0.04))}
      {line(0.04, 0.1, -0.12, c.cobalt, 0.016)}
      {[0.0, -0.025, -0.05, -0.075].map((y, i) => line(y, 0.3 - (i % 2) * 0.07))}
      {line(-0.12, 0.1, -0.12, c.cobalt, 0.016)}
      {[-0.16, -0.185, -0.21, -0.235].map((y, i) => line(y, 0.28 - (i % 3) * 0.05))}

      {hovered && (
        <Html position={[0, -0.36, 0.01]} center style={{ pointerEvents: "none" }}>
          <span className="whitespace-nowrap rounded-full bg-cobalt px-3 py-1 font-display text-sm tracking-tight text-on-cobalt">
            Click to download
          </span>
        </Html>
      )}
    </group>
  );
}

function Scene({ theme, onOpen, reduced }: { theme: Theme; onOpen: () => void; reduced: boolean }) {
  const c = palettes[theme];
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    const d = aspect < 1.2 ? 10.2 * (1.2 / aspect) * 0.68 : 10.2;
    camera.position.set(d * 0.68, d * 0.55, d * 0.68);
    camera.lookAt(0, 0.95, -0.05);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    const k = 1 - Math.exp(-delta * 3);
    const ty = state.pointer.x * 0.12;
    const tx = -state.pointer.y * 0.04;
    group.current.rotation.y += (ty - group.current.rotation.y) * k;
    group.current.rotation.x += (tx - group.current.rotation.x) * k;
  });

  return (
    <group ref={group}>
      <Room c={c} />
      <ResumeSheet c={c} hovered={hovered} setHovered={setHovered} onOpen={onOpen} reduced={reduced} />
    </group>
  );
}

export default function ResumeRoom({ onOpen }: { onOpen: () => void }) {
  const theme = useTheme();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 30, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <Scene theme={theme} onOpen={onOpen} reduced={reduced} />
    </Canvas>
  );
}
