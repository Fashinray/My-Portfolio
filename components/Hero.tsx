"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";

// Three.js only runs in the browser, so the canvas is loaded on the client.
const LayerStack = dynamic(() => import("./LayerStack"), {
  ssr: false,
  loading: () => <div className="min-h-[320px] flex-1" />,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [first, last] = site.name.split(" ");

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: "0%" },
          transition: { duration: 0.9, ease, delay },
        };

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease, delay },
        };

  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-16"
    >
      <div className="flex flex-col justify-end lg:col-span-5">
        <motion.p {...fade(0.05)} className="mb-6 text-graphite">
          {site.role} in {site.location}
        </motion.p>

        <h1 className="display text-[clamp(4rem,11vw,9.5rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...rise(0.1)}>
              {first}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...rise(0.22)}>
              {last}
            </motion.span>
          </span>
        </h1>

        <motion.div {...fade(0.55)} className="mt-8 max-w-[34rem]">
          <p className="text-xl italic text-graphite">Online I go by {site.nickname}.</p>
          <p className="mt-4 text-[1.2rem] leading-[1.65]">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-display text-lg tracking-tight">
            <a href="#work" className="rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-cobalt hover:text-on-cobalt">
              See my work
            </a>
            <a href={`mailto:${site.email}`} className="link py-2.5">
              Email me
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 0.3 } })}
        className="flex h-[58vh] min-h-[380px] lg:col-span-7 lg:h-[76vh]"
      >
        <LayerStack />
      </motion.div>
    </section>
  );
}
