import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Process from "@/components/Process";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Process />
        <About />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
