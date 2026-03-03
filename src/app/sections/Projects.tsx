"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeIn } from "@/components/animation/FadeIn";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { projects } from "@/lib/constants";
import { computeActiveSlideIndex } from "@/lib/project-carousel";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasProjects = projects.length > 0;
  const projectCount = useMemo(() => projects.length, []);

  const getSlides = useCallback(
    () => sliderRef.current?.querySelectorAll<HTMLElement>("[data-product-slide]") ?? [],
    []
  );

  const updateActiveIndex = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = getSlides();
    if (!slides.length) return;

    const currentLeft = slider.scrollLeft;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const slideOffsets = Array.from(slides, (slide) => slide.offsetLeft);
    const nextIndex = computeActiveSlideIndex({
      scrollLeft: currentLeft,
      maxScrollLeft,
      slideOffsets,
      clientWidth: slider.clientWidth,
    });
    setActiveIndex(nextIndex);
  }, [getSlides]);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

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
  }, [prefersReducedMotion]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onScroll = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(updateActiveIndex);
    };

    slider.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveIndex);
    frameRef.current = requestAnimationFrame(updateActiveIndex);

    return () => {
      slider.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveIndex);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateActiveIndex]);

  const scrollToSlide = useCallback((index: number) => {
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
  }, [getSlides]);

  return (
    <section id="products" ref={sectionRef} className="section-padding">
      <div className="section-shell">
        <SectionTitle number="02" label="PRODUCTS" title="Our SaaS Platforms" />
        {hasProjects ? (
          <>
            <div
              ref={sliderRef}
              className="mt-10 overflow-x-auto overflow-y-visible pb-6 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex snap-x snap-mandatory gap-6 px-2 py-2">
                {projects.map((project, index) => (
                  <FadeIn
                    key={project.name}
                    delay={index * 0.08}
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
                  aria-current={activeIndex === index}
                  onClick={() => scrollToSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "h-2.5 w-6 bg-textPrimary"
                      : "h-2.5 w-2.5 bg-textSecondary hover:bg-accent"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="surface-card mt-10 p-6 text-sm text-textSecondary">
            No products have been published yet.
          </div>
        )}
        <p className="mt-5 text-center text-sm text-textSecondary">
          {projectCount} platforms in active development.
        </p>
      </div>
    </section>
  );
}
