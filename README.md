# Fash — portfolio

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion (Framer Motion) · Three.js via React Three Fiber

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things are

| File | What it does |
| --- | --- |
| `lib/content.ts` | Every word on the site: intro, projects, about, tools, email, links. Edit this first. |
| `components/Hero.tsx` | Name, intro and the page-load animation |
| `components/LayerStack.tsx` | The Three.js scene: a web page split into its layers (surface, grid, boxes, type, interaction). Click it to stack or spread them. |
| `components/Work.tsx` | Project list. Hover a row for a floating preview; click to expand. |
| `components/ProjectPreview.tsx` | Illustrated previews of each project. Add `image: "/projects/name.png"` to a project in `content.ts` to show a real screenshot instead. |
| `components/Marquee.tsx` | The scrolling strip of skills under the hero |
| `components/Process.tsx` | "How I work" steps with the line that draws on scroll |
| `components/ScrambleText.tsx` | Headings that decode from code characters |
| `components/ThemeToggle.tsx` | Light / dark mode switch (remembers the choice) |
| `components/About.tsx`, `Contact.tsx`, `Header.tsx` | The rest of the page |
| `app/globals.css` | Colours for light and dark mode, and fonts |

## Before you deploy

- Add LinkedIn / résumé links in `site.links` if you want them.
- Check with the Beluga team that you're allowed to show that project publicly.
- If Vault gets a live demo, add a `link` to it in `lib/content.ts`.

## Deploy

Push to GitHub and import the repo on Vercel. No environment variables needed.

Fonts are self-hosted through `@fontsource-variable` (Bricolage Grotesque and Newsreader), so there's no Google Fonts request.
