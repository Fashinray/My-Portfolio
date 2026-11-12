// All the words on the site live here. Edit this file to update your portfolio.

export const site = {
  name: "Tolulope Fadare",
  nickname: "Fashinray",
  role: "Frontend developer",
  location: "Ile-Ife, Nigeria",
  intro:
    "I'm finishing a Computer Science degree at Obafemi Awolowo University and I build interfaces for the web, mostly with React, Next.js and Tailwind. I care about the small stuff: how a button responds, how a table reads on a phone, whether a page still makes sense when the data is messy.",
  email: "tosin5383@gmail.com",
  // Put your résumé PDF in the /public folder with this exact name.
  resume: {
    href: "/resume.pdf",
    downloadName: "Tolulope-Fadare-Resume.pdf",
    updated: "November 2026",
  },
  links: [
    { label: "GitHub", href: "https://github.com/fashinray" },
    // { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    // { label: "Résumé", href: "/resume.pdf" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  details: string[];
  stack: string[];
  link?: { label: string; href: string };
  // Shown when there is no public link.
  note?: string;
  // Optional screenshot in /public, e.g. "/projects/skillswap.png".
  // Without one, the site draws a small illustrated preview of the project.
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "skillswap",
    title: "SkillSwap",
    kind: "Final-year thesis",
    year: "2026",
    summary:
      "A campus platform where students trade skills instead of money. You teach what you know, earn credits, and spend them learning from someone else.",
    details: [
      "Matches people with a weighted algorithm that looks at what each person offers, what they want, and how trustworthy their past sessions were.",
      "Credits sit in escrow until a session is done, so nobody pays for a lesson that didn't happen.",
      "Live chat and video calls run over WebRTC, and an AI step reviews each session from its transcript.",
      "Covered by 47 end-to-end Playwright tests, all passing. Tested with real OAU students before and after launch.",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "WebRTC", "AssemblyAI", "GPT-4o-mini", "Playwright"],
    link: { label: "Open the live site", href: "https://skill-swap-pied-five.vercel.app" },
  },
  {
    slug: "beluga",
    title: "Beluga Admin",
    kind: "Client work",
    year: "2026",
    summary:
      "A redesign of the admin dashboard for Beluga, a Nigerian property platform. The catch: the old dashboard was live, so the new UI had to land without breaking anything already in use.",
    details: [
      "Rebuilt the admin workflow screens from the team's Figma designs inside the existing Next.js App Router codebase.",
      "Data-heavy views built on TanStack Table, with forms validated through React Hook Form and Zod.",
      "Worked alongside existing pieces like Firebase auth, real-time updates and identity verification, without rewriting them.",
    ],
    note: "This is private client work, so there's no public link. I'm happy to walk you through it on a call.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack Table", "React Hook Form", "Zod"],
  },
  {
    slug: "vault",
    title: "Vault",
    kind: "Personal project",
    year: "2025",
    summary:
      "An online store that works like your computer's file manager. Instead of pressing \"Add to cart\", you pick a product up and drop it into the cart, the same way you'd drag a file into a folder.",
    details: [
      "Drag and drop is the main way to shop, with clear feedback while an item is in your hand and when it lands.",
      "Cart state lives in Zustand, so it stays in sync across every panel on the page.",
      "Motion is done with GSAP and kept short, so dragging feels physical without slowing anyone down.",
    ],
    note: "No public demo yet. Ask and I'll share the repo or a screen recording.",
    // link: { label: "Try the demo", href: "https://..." },
    stack: ["Next.js", "Zustand", "Tailwind CSS", "GSAP"],
  },
];

export const about = {
  paragraphs: [
    "I call myself a frontend developer and I mean it. My favourite part of any project is the layer people actually touch: layouts, states, motion, and the moment something responds to a click.",
    "Before most of this I worked in data QA, checking datasets for the mistakes that slip past everyone else. That habit stuck. I test my own screens the way a stranger would, and I notice when a number is off by one.",
    "Right now I'm wrapping up my degree at OAU, doing client work, and building small experiments with odd interactions, like a shop you drag things into.",
  ],
  tools: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Motion",
    "Three.js",
    "GSAP",
    "Zustand",
    "shadcn/ui",
    "Supabase",
    "Playwright",
    "Figma",
  ],
};

// Words that scroll across the moving strip under the hero.
export const marquee = [
  "Interfaces",
  "React",
  "Next.js",
  "Motion",
  "Three.js",
  "Accessibility",
  "Tailwind CSS",
  "Design systems",
  "TypeScript",
];

// "How I work" section. These are in order, so they're numbered on the page.
export const process = [
  {
    title: "Listen",
    body: "I start with who will use the thing and what they're trying to get done. A dashboard for an admin on a deadline is a different job from a page someone browses for fun.",
  },
  {
    title: "Sketch",
    body: "I work from the Figma file if there is one, or sketch the layout and states myself if there isn't: empty, loading, error, and the one with way too much data.",
  },
  {
    title: "Build",
    body: "Small typed components, Tailwind for styling, and motion only where it explains what just changed. Existing code gets respected, not rewritten for fun.",
  },
  {
    title: "Test",
    body: "I click through it like a stranger would, on a slow phone too, and write end-to-end tests for the flows that matter. Then I fix what I find.",
  },
];
