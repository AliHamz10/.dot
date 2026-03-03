"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeIn } from "@/components/animation/FadeIn";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { projects } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlides = () => sliderRef.current?.querySelectorAll<HTMLElement>("[data-product-slide]") ?? [];

  const updateActiveIndex = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = getSlides();
    if (!slides.length) return;

    const currentLeft = slider.scrollLeft;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const edgeTolerance = 4;

    if (currentLeft <= edgeTolerance) {
      setActiveIndex(0);
      return;
    }

    if (currentLeft >= maxScrollLeft - edgeTolerance) {
      setActiveIndex(slides.length - 1);
      return;
    }

    const firstOffset = slides[0].offsetLeft;
    const step = slides.length > 1 ? slides[1].offsetLeft - firstOffset : slider.clientWidth;
    if (step <= 0) return;

    const rawIndex = Math.round((currentLeft - firstOffset) / step);
    const nextIndex = Math.max(0, Math.min(slides.length - 1, rawIndex));
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36 },
          {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onScroll = () => updateActiveIndex();
    slider.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveIndex);
    requestAnimationFrame(updateActiveIndex);

    return () => {
      slider.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slides = getSlides();
    const target = slides[index];
    if (!target) return;

    slider.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section id="products" ref={sectionRef} className="section-padding">
      <SectionTitle number="02" label="-- PRODUCTS" title="Our SaaS Platforms" />
      <div
        ref={sliderRef}
        className="mt-10 overflow-x-auto overflow-y-visible pb-6 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex snap-x snap-mandatory gap-6 px-2 py-2">
          {projects.map((project, index) => (
            <FadeIn
              key={project.name}
              delay={index * 0.1}
              className="min-w-[82%] snap-start px-1 md:min-w-[48%] xl:min-w-[calc((100%-3rem)/3)]"
            >
              <div data-product-slide className="w-full">
                <ProjectCard project={project} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={`${project.name}-dot`}
            type="button"
            aria-label={`Go to ${project.name}`}
            onClick={() => scrollToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "h-2.5 w-6 bg-textPrimary"
                : "h-2.5 w-2.5 bg-textSecondary hover:bg-accent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


