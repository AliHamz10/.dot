import type { NavItem, Project, SocialLink } from "@/types";

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Platforms", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    name: "PulseCare",
    industry: "Healthcare Operations",
    summary: "Reduce patient no-shows and automate follow-up workflows for clinics.",
    href: "#",
  },
  {
    name: "FleetSight",
    industry: "Logistics Intelligence",
    summary: "Route optimization and delay prediction for field and delivery teams.",
    href: "#",
  },
  {
    name: "LedgerFlow",
    industry: "Finance Automation",
    summary: "Autonomous reconciliation and anomaly detection for accounting teams.",
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
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
];
