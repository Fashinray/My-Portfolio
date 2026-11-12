"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { projects, type Project } from "@/lib/content";
import ProjectPreview from "./ProjectPreview";
import ScrambleText from "./ScrambleText";

/* A preview that trails the cursor while you hover a project row.
   Only on devices with a real mouse, and only while the row is closed. */
function FloatingPreview({ project }: { project: Project | null }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-40 hidden w-[340px] -translate-x-[110%] -translate-y-1/2 [@media(pointer:fine)]:block"
    >
      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22 }}
          >
            <ProjectPreview project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Work() {
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const hovered = projects.find((p) => p.slug === hover && p.slug !== open) ?? null;

  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      {!reduce && <FloatingPreview project={hovered} />}

      <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
        <ScrambleText text="Selected work" className="display text-[clamp(2.5rem,6vw,4.75rem)]" />
        <p className="hidden max-w-xs text-right text-graphite sm:block">
          Hover for a preview. Open a project to see what I built and how.
        </p>
      </div>

      <ul className="border-t border-ink" onPointerLeave={() => setHover(null)}>
        {projects.map((p) => {
          const isOpen = open === p.slug;
          return (
            <li key={p.slug} className="border-b border-rule" onPointerEnter={() => setHover(p.slug)}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : p.slug)}
                aria-expanded={isOpen}
                aria-controls={`project-${p.slug}`}
                className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 text-left lg:py-9"
              >
                <span
                  className={`display col-span-10 text-[clamp(2.4rem,7vw,6rem)] transition-[color,transform] duration-300 group-hover:text-cobalt lg:col-span-6 lg:group-hover:translate-x-3 ${
                    isOpen ? "text-cobalt" : ""
                  }`}
                >
                  {p.title}
                </span>
                <span
                  aria-hidden
                  className={`col-span-2 justify-self-end font-display text-4xl font-light text-graphite transition-transform duration-300 lg:hidden ${
                    isOpen ? "rotate-45 text-cobalt" : ""
                  }`}
                >
                  +
                </span>
                <span className="col-span-12 max-w-[38rem] text-[1.1rem] leading-[1.6] lg:col-span-4">{p.summary}</span>
                <span className="col-span-12 flex items-baseline justify-between gap-6 text-graphite lg:col-span-2 lg:justify-end">
                  <span className="lg:text-right">
                    {p.kind}
                    <br className="hidden lg:block" />
                    <span className="lg:hidden">, </span>
                    {p.year}
                  </span>
                  <span
                    aria-hidden
                    className={`hidden font-display text-4xl font-light leading-none transition-transform duration-300 lg:inline-block ${
                      isOpen ? "rotate-45 text-cobalt" : ""
                    }`}
                  >
                    +
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`project-${p.slug}`}
                    key="details"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-4 gap-y-8 pb-12 lg:pb-14">
                      <div className="col-span-12 max-w-[34rem] lg:col-span-5">
                        <ProjectPreview project={p} />
                      </div>
                      <div className="col-span-12 lg:col-span-5 lg:col-start-7">
                        <ul className="max-w-[38rem] space-y-4">
                          {p.details.map((d) => (
                            <li key={d} className="border-l-2 border-cobalt pl-4">
                              {d}
                            </li>
                          ))}
                        </ul>
                        <h3 className="mb-3 mt-8 text-graphite">Built with</h3>
                        <ul className="flex flex-wrap gap-2">
                          {p.stack.map((s) => (
                            <li key={s} className="rounded-full border border-rule px-3 py-1 font-display text-[0.95rem] tracking-tight">
                              {s}
                            </li>
                          ))}
                        </ul>
                        {p.link ? (
                          <a
                            href={p.link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 font-display text-lg tracking-tight text-paper transition-colors hover:bg-cobalt hover:text-on-cobalt"
                          >
                            {p.link.label}
                          </a>
                        ) : p.note ? (
                          <p className="mt-8 max-w-[30rem] italic text-graphite">{p.note}</p>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
