import { marquee } from "@/lib/content";

/* A strip of words that scrolls sideways forever. Pauses on hover and
   stops entirely for people who prefer reduced motion. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marquee.map((w) => (
        <li key={w} className="flex items-center">
          <span className="display px-6 text-[clamp(2rem,4.5vw,3.75rem)] sm:px-10">{w}</span>
          <svg viewBox="0 0 10 10" className="size-3 text-cobalt" aria-hidden>
            <circle cx="5" cy="5" r="5" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group overflow-hidden border-y border-ink py-5 sm:py-7" aria-label="Things I work with">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
