"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { process } from "@/lib/content";
import ScrambleText from "./ScrambleText";

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-28">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <ScrambleText text="How I work" className="display text-[clamp(2.5rem,6vw,4.75rem)]" />
          <p className="mt-6 max-w-[24rem] text-graphite">
            Four steps, every time. Not because it&apos;s a rule, but because skipping any of them is how bugs get shipped.
          </p>
        </div>
      </div>

      <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
        {/* The line that draws itself as you scroll through the steps */}
        <span aria-hidden className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-rule" />
        <motion.span
          aria-hidden
          style={{ scaleY: reduce ? 1 : progress }}
          className="absolute bottom-6 left-[1.35rem] top-6 w-px origin-top bg-cobalt"
        />
        {process.map((step, i) => (
          <li key={step.title} className="relative grid grid-cols-[2.75rem_1fr] gap-x-6 pb-14 last:pb-0">
            <span className="relative z-10 grid size-11 place-items-center rounded-full border border-ink bg-paper font-display text-lg font-semibold">
              {i + 1}
            </span>
            <div className="pt-1">
              <h3 className="display text-[clamp(2rem,4vw,3.25rem)]">{step.title}</h3>
              <p className="mt-3 max-w-[34rem] text-[1.15rem] leading-[1.65]">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
