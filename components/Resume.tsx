"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import ScrambleText from "./ScrambleText";

const ResumeRoom = dynamic(() => import("./ResumeRoom"), {
  ssr: false,
  loading: () => <div className="size-full" />,
});

export default function Resume() {
  const { href, downloadName, updated } = site.resume;
  // Checks the PDF is actually there, so visitors never download a 404 page.
  const [available, setAvailable] = useState<boolean | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    fetch(href, { method: "HEAD" })
      .then((r) => setAvailable(r.ok))
      .catch(() => setAvailable(false));
  }, [href]);

  const download = () => {
    if (!available) {
      document.getElementById("resume-status")?.focus();
      return;
    }
    const a = document.createElement("a");
    a.href = href;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setDownloaded(true);
  };

  return (
    <section id="resume" className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-28">
      <div className="lg:col-span-4">
        <ScrambleText text="My résumé" className="display text-[clamp(2.5rem,6vw,4.75rem)]" />
        <p className="mt-6 max-w-[26rem] text-[1.15rem] leading-[1.65]">
          Everything on this page, on one sheet of paper. It&apos;s lying on my desk in there. Pick it up, or use the button.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={download}
            className="rounded-full bg-ink px-5 py-2.5 font-display text-lg tracking-tight text-paper transition-colors hover:bg-cobalt hover:text-on-cobalt"
          >
            Download résumé (PDF)
          </button>
          <span className="text-graphite">Updated {updated}</span>
        </div>

        <p id="resume-status" tabIndex={-1} aria-live="polite" className="mt-5 max-w-[26rem] italic text-graphite outline-none">
          {available === false
            ? `My résumé is being updated right now. Email me at ${site.email} and I'll send you a copy.`
            : downloaded
              ? "Downloaded. Thanks for taking a look."
              : ""}
        </p>
      </div>

      <figure className="flex flex-col lg:col-span-8">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
          <ResumeRoom onOpen={download} />
        </div>
        <figcaption className="mt-3 text-[0.95rem] text-graphite">
          My desk, more or less. Hover over the paper on the desk (or tap it on a phone) to pick it up.
        </figcaption>
      </figure>
    </section>
  );
}
