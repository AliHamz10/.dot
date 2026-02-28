"use client";

import Link from "next/link";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "PRODUCTS", href: "#products" },
  { label: "CONTACT", href: "#contact" },
];

export function Sidebar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-borderSubtle bg-bgPrimary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-5 px-6 md:h-20 md:px-12 lg:px-16">
        <Link
          href="#hero"
          className="shrink-0 bg-gradient-to-r from-accent via-textPrimary to-accent bg-clip-text text-xl font-semibold tracking-tight text-transparent md:text-2xl"
        >
          .dot
        </Link>
        <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-textSecondary md:justify-end md:gap-6 md:text-xs">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
