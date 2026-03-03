"use client";

import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isDisabled = project.href === "#";

  return (
    <article className="group w-full">
      <a
        href={project.href}
        aria-disabled={isDisabled}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
          }
        }}
        className={cn(
          "mx-auto block w-full max-w-[16rem]",
          isDisabled && "cursor-not-allowed opacity-95"
        )}
      >
        <div className="rounded-[2.2rem] border-[2px] border-textPrimary bg-bgSecondary p-[0.35rem] shadow-[0_16px_30px_rgba(47,59,47,0.14)] transition duration-500 ease-general group-hover:-translate-y-1 group-hover:shadow-[0_22px_36px_rgba(47,59,47,0.2)]">
          <div
            data-parallax
            className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[1.85rem] bg-bgSecondary"
          >
            <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-textSecondary/90" />

            <div className="bg-gradient-to-b from-bgSecondary to-bgTertiary px-4 pb-4 pt-7">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={`${project.name}-dot-${i}`} className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                ))}
              </div>
              <p className="text-center text-base font-semibold leading-tight text-textPrimary">
                Live Product Preview
              </p>
              <p className="mt-1 text-center text-[12px] leading-relaxed text-textSecondary">
                Tap cards and modules to explore flows.
              </p>
            </div>

            <div className="border-y border-borderSubtle bg-bgTertiary px-4 py-3">
              <div className="h-24 rounded-md bg-gradient-to-r from-accent/45 to-textSecondary/45" />
              <p className="mt-2 text-xs font-medium text-textPrimary">
                Tap to open product experience.
              </p>
            </div>

            <div className="mt-auto bg-bgSecondary px-4 py-4">
              <div className="rounded-md bg-textPrimary px-3 py-3 text-center">
                <p className="text-lg font-semibold leading-tight text-bgSecondary">
                  Everything at your stop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
      <div className="mx-auto mt-4 w-full max-w-[16rem]">
        <h3 className="text-xl font-semibold text-textPrimary">{project.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-textTertiary">
          {project.industry}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-textSecondary">
          {project.summary}
        </p>
        <a
          href={project.href}
          aria-disabled={isDisabled}
          onClick={(event) => {
            if (isDisabled) {
              event.preventDefault();
            }
          }}
          className={cn(
            "mt-4 inline-block text-sm uppercase tracking-[0.14em] text-textPrimary transition-colors hover:text-accent",
            isDisabled && "cursor-not-allowed text-textTertiary hover:text-textTertiary"
          )}
        >
          {isDisabled ? "Coming Soon" : "Explore Platform"}
        </a>
      </div>
    </article>
  );
}
