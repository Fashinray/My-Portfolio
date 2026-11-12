"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/lib/content";

const SRC = "/tolu.jpg";

/* Your photo, split into three print-style layers (a cobalt plate, an ink
   plate and the full-colour photo). They start fanned out like the 3D stack
   in the hero and slide into place as you scroll. Hover to fan them out again. */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center 55%"] });
  // 1 = fully spread, 0 = stacked into one photo
  const scrollSpread = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const hoverSpread = useSpring(0, { stiffness: 180, damping: 22 });
  hoverSpread.set(hover ? 0.55 : 0);
  const spread = useTransform(() => (reduce ? 0 : Math.max(scrollSpread.get(), hoverSpread.get())));

  const back = {
    x: useTransform(spread, (s) => `${s * -12}%`),
    y: useTransform(spread, (s) => `${s * 6}%`),
    rotate: useTransform(spread, (s) => s * -6),
  };
  const mid = {
    x: useTransform(spread, (s) => `${s * -4.5}%`),
    y: useTransform(spread, (s) => `${s * 3.5}%`),
    rotate: useTransform(spread, (s) => s * -2.5),
  };
  const top = {
    x: useTransform(spread, (s) => `${s * 3}%`),
    y: useTransform(spread, (s) => `${s * -2.5}%`),
    rotate: useTransform(spread, (s) => s * 1.5),
  };
  const colour = useTransform(spread, [0, 0.6], [1, 0.0]);

  return (
    <figure className="w-full max-w-[26rem]">
      <div
        ref={ref}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="relative aspect-[4/5] w-full"
      >
        {/* Cobalt plate */}
        <motion.div style={back} className="absolute inset-0 overflow-hidden rounded-sm bg-cobalt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SRC} alt="" className="size-full object-cover mix-blend-multiply grayscale contrast-125 brightness-110" />
        </motion.div>

        {/* Ink plate */}
        <motion.div
          style={mid}
          className="absolute inset-0 overflow-hidden rounded-sm border border-ink bg-paper"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SRC} alt="" className="size-full object-cover opacity-90 grayscale contrast-150" />
        </motion.div>

        {/* Full-colour photo on top */}
        <motion.div style={top} className="absolute inset-0 overflow-hidden rounded-sm border border-ink bg-paper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SRC}
            alt={`Portrait of ${site.name}`}
            className="absolute inset-0 size-full object-cover grayscale contrast-125"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={SRC}
            alt=""
            style={{ opacity: reduce ? 1 : colour }}
            className="absolute inset-0 size-full object-cover"
          />
        </motion.div>
      </div>
      <figcaption className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[0.95rem] text-graphite">
        <span>Me, in three layers. Hover to pull them apart.</span>
        <span className="font-display text-sm tracking-tight">Colour / Ink / Cobalt</span>
      </figcaption>
    </figure>
  );
}
