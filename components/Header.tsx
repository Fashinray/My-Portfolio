import { site } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Résumé", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-xl font-semibold tracking-tight">
          {site.nickname}
        </a>
        <div className="flex items-center gap-5 sm:gap-8">
          <nav aria-label="Main">
            <ul className="flex gap-4 font-display text-[1.05rem] tracking-tight sm:gap-8">
              {nav.map((n) => (
                <li key={n.href} className={n.href === "#process" || n.href === "#resume" ? "hidden md:block" : ""}>
                  <a href={n.href} className="link no-underline hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
