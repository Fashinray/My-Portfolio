import { about } from "@/lib/content";
import Portrait from "./Portrait";
import ScrambleText from "./ScrambleText";

export default function About() {
  return (
    <section id="about" className="bg-paper-deep">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-5">
          <ScrambleText text="About me" className="display text-[clamp(2.5rem,6vw,4.75rem)]" />
          <div className="mt-12 pl-[6%] lg:mt-16">
            <Portrait />
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-7 lg:pt-4">
          <div className="max-w-[36rem] space-y-6 text-[1.2rem] leading-[1.7]">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h3 className="mb-4 mt-12 text-graphite">Tools I reach for</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-display text-2xl tracking-tight">
            {about.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
