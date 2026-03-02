"use client";

import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group w-full overflow-hidden border border-borderSubtle bg-bgSecondary p-4 transition duration-500 ease-general hover:scale-[1.02] hover:border-accent">
      <div
        data-parallax
        className="mb-4 aspect-[2/3] w-full bg-bgTertiary"
        style={{
          backgroundImage:
            "radial-gradient(circle at 24% 22%, rgba(126,163,95,0.24) 0%, rgba(126,163,95,0.08) 40%, rgba(245,199,113,0.12) 62%, transparent 100%)",
        }}
      />
      <h3 className="text-xl font-medium">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-textSecondary">{project.description}</p>
      <a
        href={project.href}
        className="mt-5 inline-block text-sm uppercase tracking-[0.18em] text-textPrimary transition-colors hover:text-accent"
      >
        Explore Platform
      </a>
    </article>
  );
}
