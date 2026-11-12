"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "<>/{}[]=+*#_-;:01";

/* Text that decodes from random code characters into the real words the
   first time it scrolls into view. Screen readers always get the real text. */
export default function ScrambleText({
  text,
  as: Tag = "h2",
  className = "",
  duration = 900,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!inView || reduce) {
      setShown(text);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < settled || ch === " ") out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setShown(out);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, text, duration]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden>{shown}</span>
    </Tag>
  );
}
