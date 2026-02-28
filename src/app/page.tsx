"use client";

import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { GridBackground } from "@/components/layout/GridBackground";
import { Sidebar } from "@/components/layout/Sidebar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bgPrimary">
        <GridBackground />
        <Sidebar />
        <main className="pt-16 md:pt-20">
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
