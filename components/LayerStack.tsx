"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { useTheme, type Theme } from "./ThemeToggle";

const palettes = {
  light: { ink: "#17191c", sheet: "#ffffff", deep: "#e2e5de", graphite: "#9aa095", cobalt: "#2c46d8", soft: "#c9d0f7" },
  dark: { ink: "#e8eae4", sheet: "#ffffff", deep: "#24282d", graphite: "#5d636a", cobalt: "#7086ff", soft: "#2c3a7a" },
};
type Palette = (typeof palettes)[Theme];

const W = 3.2;
const H = 2.2;

/* A thin flat block sitting on top of a layer. x/y are measured from the
   top-left corner of the page, in page units, which keeps layouts readable. */
function Block({
  x,
  y,
  w,
  h,
  color,
  opacity = 1,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  opacity?: number;
}) {
  return (
    <mesh position={[-W / 2 + x + w / 2, H / 2 - y - h / 2, 0.015]}>
      <boxGeometry args={[w, h, 0.01]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Sheet({ fill, opacity, edge }: { fill: string; opacity: number; edge: string }) {
  return (
    <mesh>
      <boxGeometry args={[W, H, 0.012]} />
      <meshBasicMaterial color={fill} transparent opacity={opacity} depthWrite={false} />
      <Edges color={edge} threshold={15} />
    </mesh>
  );
}

function Cursor({ color }: { color: string }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0, -0.26);
    s.lineTo(0.07, -0.19);
    s.lineTo(0.12, -0.29);
    s.lineTo(0.16, -0.27);
    s.lineTo(0.11, -0.17);
    s.lineTo(0.2, -0.17);
    s.closePath();
    return s;
  }, []);
  return (
    <mesh position={[-W / 2 + 1.12, H / 2 - 1.52, 0.03]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

const textLine = (c: Palette, x: number, y: number, w: number, key: string) => (
  <Block key={key} x={x} y={y} w={w} h={0.035} color={c.ink} opacity={0.85} />
);

/* The five layers of a web page, bottom to top. */
const buildLayers = (c: Palette) => [
  // Surface
  <group key="surface">
    <Sheet fill={c.deep} opacity={0.97} edge={c.ink} />
  </group>,
  // Grid
  <group key="grid">
    <Sheet edge={c.ink} fill={c.sheet} opacity={0.08} />
    {Array.from({ length: 6 }).map((_, i) => (
      <Block key={i} x={0.2 + i * 0.475} y={0.12} w={0.4} h={H - 0.24} color={c.soft} opacity={0.55} />
    ))}
  </group>,
  // Boxes
  <group key="boxes">
    <Sheet edge={c.ink} fill={c.sheet} opacity={0.06} />
    <Block x={0.2} y={0.14} w={W - 0.4} h={0.16} color={c.graphite} opacity={0.55} />
    <Block x={0.2} y={0.5} w={1.85} h={0.8} color={c.graphite} opacity={0.4} />
    <Block x={0.2} y={1.48} w={0.87} h={0.56} color={c.graphite} opacity={0.4} />
    <Block x={1.18} y={1.48} w={0.87} h={0.56} color={c.graphite} opacity={0.4} />
    <Block x={2.15} y={0.5} w={0.85} h={1.54} color={c.graphite} opacity={0.4} />
  </group>,
  // Type
  <group key="type">
    <Sheet edge={c.ink} fill={c.sheet} opacity={0.05} />
    <Block x={0.3} y={0.6} w={1.4} h={0.12} color={c.ink} />
    <Block x={0.3} y={0.78} w={1.05} h={0.12} color={c.ink} />
    {textLine(c, 0.3, 1.0, 1.5, "a")}
    {textLine(c, 0.3, 1.08, 1.3, "b")}
    {textLine(c, 0.3, 1.58, 0.6, "c")}
    {textLine(c, 1.28, 1.58, 0.6, "d")}
    {textLine(c, 2.25, 0.62, 0.62, "e")}
    {textLine(c, 2.25, 0.7, 0.5, "f")}
    {textLine(c, 2.25, 0.78, 0.58, "g")}
  </group>,
  // Interaction
  <group key="interaction">
    <Sheet edge={c.ink} fill={c.sheet} opacity={0.04} />
    <Block x={0.3} y={1.2} w={0.62} h={0.18} color={c.cobalt} />
    <Cursor color={c.ink} />
  </group>,
];

function Stack({ spread, reduced, theme }: { spread: boolean; reduced: boolean; theme: Theme }) {
  const layers = useMemo(() => buildLayers(palettes[theme]), [theme]);
  const group = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);
  const gap = useRef(reduced ? 0.5 : 0);
  const { camera, size } = useThree();

  // Pull the camera back on narrow screens so the whole stack fits.
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.z = aspect < 1.15 ? 7.4 * (1.15 / aspect) * 0.92 : 7.4;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((state, delta) => {
    const target = spread ? 0.5 : 0.03;
    const k = reduced ? 1 : 1 - Math.exp(-delta * 4);
    gap.current += (target - gap.current) * k;

    items.current.forEach((g, i) => {
      if (g) g.position.z = (i - (LAYER_COUNT - 1) / 2) * gap.current;
    });

    if (group.current) {
      const px = reduced ? 0 : state.pointer.x;
      const py = reduced ? 0 : state.pointer.y;
      const rx = -0.5 - py * 0.12;
      const ry = 0.62 + px * 0.18;
      group.current.rotation.x += (rx - group.current.rotation.x) * k;
      group.current.rotation.y += (ry - group.current.rotation.y) * k;
    }
  });

  return (
    <group ref={group} rotation={[-0.5, 0.62, 0.18]}>
      {layers.map((layer, i) => (
        <group key={i} ref={(el) => void (items.current[i] = el)}>
          {layer}
        </group>
      ))}
    </group>
  );
}

const LAYER_COUNT = 5;

export const layerNames = ["Surface", "Grid", "Boxes", "Type", "Interaction"];

export default function LayerStack() {
  const theme = useTheme();
  const [spread, setSpread] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setSpread(true);
      return;
    }
    const t = setTimeout(() => setSpread(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <figure className="flex h-full flex-col">
      <button
        type="button"
        onClick={() => setSpread((s) => !s)}
        aria-pressed={spread}
        aria-label={spread ? "Stack the layers back into one page" : "Spread the page into its layers"}
        className="relative min-h-[320px] flex-1 cursor-pointer rounded-sm"
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 7.4], fov: 34 }}
          gl={{ antialias: true, alpha: true }}
          aria-hidden
        >
          <Stack spread={spread} reduced={reduced} theme={theme} />
        </Canvas>
      </button>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[0.95rem] text-graphite">
        <span>A web page, taken apart. Click it to {spread ? "stack" : "spread"} the layers.</span>
        <span className="font-display text-sm tracking-tight">
          {[...layerNames].reverse().join(" / ")}
        </span>
      </figcaption>
    </figure>
  );
}
