"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { GridBackground } from "@/components/layout/GridBackground";
import { Sidebar } from "@/components/layout/Sidebar";
import { Hero } from "./sections/Hero";

const About = dynamic(() => import("./sections/About").then((mod) => mod.About), {
  loading: () => <SectionSkeleton />,
});
const Projects = dynamic(() => import("./sections/Projects").then((mod) => mod.Projects), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import("./sections/Contact").then((mod) => mod.Contact), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return (
    <section className="section-padding">
      <div className="mx-auto w-full max-w-6xl animate-pulse space-y-4">
        <div className="h-4 w-28 rounded bg-bgTertiary" />
        <div className="h-12 w-2/3 rounded bg-bgTertiary" />
        <div className="h-36 rounded bg-bgTertiary" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bgPrimary">
        <GridBackground />
        <Sidebar />
        <main className="pt-16 md:pt-20">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
