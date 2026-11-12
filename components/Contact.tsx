"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/content";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // The dome rises and widens as the section scrolls in.
  const y = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);

  return (
    <section ref={ref} id="contact" className="overflow-hidden pt-16 lg:pt-24">
      <motion.div
        style={reduce ? undefined : { y, scaleX: scale }}
        className="origin-bottom bg-cobalt [border-top-left-radius:50%_min(28rem,45vw)] [border-top-right-radius:50%_min(28rem,45vw)]"
      >
        <div className="mx-auto flex min-h-[88vh] max-w-[1400px] flex-col px-5 pt-28 text-center text-on-cobalt sm:px-8 lg:pt-40">
          <div className="my-auto">
            <h2 className="display mx-auto max-w-[14ch] text-[clamp(2.75rem,8vw,7rem)]">Got something worth building?</h2>
            <p className="mx-auto mt-6 max-w-[30rem] text-xl opacity-85">
              A role, a freelance project or just a question. Send me an email and I&apos;ll get back to you.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-10 inline-block max-w-full break-all rounded-full bg-on-cobalt px-7 py-4 font-display text-[clamp(1.05rem,2.6vw,1.6rem)] tracking-tight text-cobalt transition-transform hover:scale-[1.03]"
            >
              {site.email}
            </a>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 font-display text-xl tracking-tight">
              {site.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:opacity-80">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <footer className="mt-16 py-8 text-center text-[0.95rem] opacity-80">
            <p>
              &copy; {new Date().getFullYear()} {site.name}
            </p>
          </footer>
        </div>
      </motion.div>
    </section>
  );
}
