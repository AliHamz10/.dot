import type { NavItem, Project, SocialLink } from "@/types";

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Platforms", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    name: "Sereai Labs",
    industry: "Healthcare Intelligence",
    summary: "Turn medical reports into clear insights, alerts, and medication guidance.",
    href: "#",
  },
  {
    name: "Context",
    industry: "Context-Aware Intelligence",
    summary: "Remembers conversations and routes queries to the best models for optimal responses.",
    href: "#",
  },
  {
    name: "Sara",
    industry: "AI Voice Automation for Clinics",
    summary: "Autonomous patient calling, scheduling, and appointment reminders.",
    href: "#",
  },
  {
    name: "HireGrid",
    industry: "Talent Operations",
    summary: "Accelerate screening and role matching with domain-aware candidate scoring.",
    href: "#",
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/aidot.tech/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dot-01a9993b4/" },
  { label: "Twitter", href: "https://twitter.com" },
];
