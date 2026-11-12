import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name}, ${site.role.toLowerCase()}`,
  description: `${site.name} (${site.nickname}) is a ${site.role.toLowerCase()} in ${site.location}. Selected work: SkillSwap, Beluga Admin and Vault.`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edefea" },
    { media: "(prefers-color-scheme: dark)", color: "#15171a" },
  ],
};

// Sets the theme before the page paints, so there's no flash of the wrong colours.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
