/* Small illustrated previews of each project, drawn in code so the site has
   something to show before real screenshots exist. Add an `image` to a project
   in lib/content.ts and that screenshot is shown instead. */

import type { Project } from "@/lib/content";

function Frame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="flex aspect-[4/3] w-full flex-col overflow-hidden rounded-lg border border-rule bg-paper shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-rule bg-paper-deep px-3 py-2">
        <span className="size-2 rounded-full bg-rule" />
        <span className="size-2 rounded-full bg-rule" />
        <span className="size-2 rounded-full bg-rule" />
        <span className="ml-2 truncate rounded bg-paper px-2 py-0.5 font-display text-[10px] text-graphite">{url}</span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <span className={`block h-1.5 rounded-full bg-ink/15 ${className}`} style={{ width: w }} />
);

function SkillSwap() {
  return (
    <Frame url="skillswap.app/matches">
      <div className="grid h-full grid-cols-5 gap-3 p-4">
        <div className="col-span-3 flex flex-col gap-2.5">
          <span className="font-display text-[13px] font-semibold tracking-tight">Your matches</span>
          {[
            { n: "Ada", t: "Teaches Figma", m: "94%" },
            { n: "Tunde", t: "Teaches Python", m: "88%" },
            { n: "Zainab", t: "Teaches French", m: "81%" },
          ].map((p, i) => (
            <div
              key={p.n}
              className={`flex items-center gap-2.5 rounded-md border p-2 ${
                i === 0 ? "border-cobalt bg-cobalt-soft/60" : "border-rule"
              }`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink font-display text-[11px] text-paper">
                {p.n[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[11px] font-semibold leading-tight">{p.n}</span>
                <span className="block truncate text-[10px] leading-tight text-graphite">{p.t}</span>
              </span>
              <span className="font-display text-[11px] font-semibold text-cobalt">{p.m}</span>
            </div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-2.5">
          <div className="grid flex-1 grid-rows-2 gap-1.5 rounded-md bg-ink p-1.5">
            <div className="rounded bg-paper/15" />
            <div className="relative rounded bg-cobalt/70">
              <span className="absolute bottom-1 left-1 rounded bg-black/40 px-1 font-display text-[8px] text-white">Ada</span>
            </div>
          </div>
          <div className="rounded-md border border-rule p-2">
            <span className="block text-[9px] text-graphite">In escrow</span>
            <span className="font-display text-[15px] font-semibold leading-none">12 credits</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Beluga() {
  const rows = [
    ["Lekki 3-bed", "Verified", "₦4.2m"],
    ["Yaba studio", "Pending", "₦1.1m"],
    ["Ikoyi duplex", "Verified", "₦9.8m"],
    ["Ajah 2-bed", "Flagged", "₦2.6m"],
    ["Surulere flat", "Verified", "₦1.9m"],
  ];
  const pill: Record<string, string> = {
    Verified: "bg-cobalt-soft text-cobalt",
    Pending: "bg-ink/10 text-graphite",
    Flagged: "bg-ink text-paper",
  };
  return (
    <Frame url="admin.beluga/listings">
      <div className="flex h-full">
        <div className="flex w-[22%] flex-col gap-2 border-r border-rule bg-paper-deep p-3">
          <span className="mb-1 font-display text-[12px] font-semibold">Beluga</span>
          {["Overview", "Listings", "Users", "KYC", "Payments"].map((l) => (
            <span
              key={l}
              className={`rounded px-1.5 py-1 font-display text-[10px] ${l === "Listings" ? "bg-ink text-paper" : "text-graphite"}`}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-[13px] font-semibold tracking-tight">Listings</span>
            <span className="rounded bg-cobalt px-2 py-0.5 font-display text-[9px] text-on-cobalt">Export</span>
          </div>
          <div className="flex gap-1.5">
            {["All 128", "Pending 14", "Flagged 3"].map((c, i) => (
              <span key={c} className={`rounded-full border px-2 py-0.5 text-[9px] ${i === 0 ? "border-ink" : "border-rule text-graphite"}`}>
                {c}
              </span>
            ))}
          </div>
          <div className="overflow-hidden rounded-md border border-rule">
            <div className="grid grid-cols-[1.6fr_1fr_0.8fr] bg-paper-deep px-2 py-1 text-[9px] text-graphite">
              <span>Property</span>
              <span>Status</span>
              <span className="text-right">Price</span>
            </div>
            {rows.map(([n, s, p]) => (
              <div key={n} className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center border-t border-rule px-2 py-[5px] text-[10px]">
                <span className="truncate font-display">{n}</span>
                <span>
                  <span className={`rounded-full px-1.5 py-px text-[8px] ${pill[s]}`}>{s}</span>
                </span>
                <span className="text-right font-display">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Vault() {
  return (
    <Frame url="vault.shop">
      <div className="grid h-full grid-cols-[1fr_32%] gap-3 p-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 rounded-md border p-1.5 ${i === 1 ? "border-dashed border-cobalt bg-cobalt-soft/40" : "border-rule"}`}
            >
              {i === 1 ? (
                <span className="m-auto text-[9px] text-cobalt">picked up</span>
              ) : (
                <>
                  <span className="flex-1 rounded bg-ink/10" />
                  <Bar w="70%" />
                  <Bar w="40%" className="bg-ink/30" />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 rounded-md border-2 border-cobalt bg-cobalt-soft/50 p-2">
          <span className="flex items-center gap-1.5 font-display text-[11px] font-semibold">
            <svg viewBox="0 0 20 16" className="h-3 w-4 text-cobalt" aria-hidden>
              <path d="M1 3a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z" fill="currentColor" />
            </svg>
            Cart
          </span>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded bg-paper p-1">
              <span className="size-5 rounded bg-ink/10" />
              <Bar w="55%" />
            </div>
          ))}
          <span className="mt-auto text-center text-[9px] text-cobalt">Drop here</span>
        </div>
        {/* The item being dragged, mid-air, with the cursor holding it */}
        <div className="absolute left-[50%] top-[30%] w-[19%] rotate-[-7deg] rounded-md border border-ink bg-paper p-1.5 shadow-[0_16px_30px_-10px_rgba(0,0,0,0.45)]">
          <span className="block aspect-[4/3] rounded bg-cobalt/80" />
          <Bar w="70%" className="mt-1" />
          <svg viewBox="0 0 20 30" className="absolute -bottom-3 -right-2 h-6 w-4 drop-shadow" aria-hidden>
            <path d="M1 1v22l6-6 4 10 4-2-4-9h8Z" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </Frame>
  );
}

const previews: Record<string, () => React.ReactElement> = {
  skillswap: SkillSwap,
  beluga: Beluga,
  vault: Vault,
};

export default function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        className="aspect-[4/3] w-full rounded-lg border border-rule object-cover object-top"
      />
    );
  }
  const P = previews[project.slug];
  return P ? <P /> : null;
}
