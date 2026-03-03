"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { navItems } from "@/lib/constants";

export function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const mobileMenuId = useMemo(() => "mobile-navigation", []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-borderSubtle bg-bgPrimary backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-5 px-6 md:h-20 md:px-12 lg:px-16">
        <Link
          href="#hero"
          className="shrink-0 bg-gradient-to-r from-accent via-textPrimary to-accent bg-clip-text text-xl font-semibold tracking-tight text-transparent md:text-2xl"
          onClick={closeMenu}
        >
          .dot
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md border border-borderSubtle text-textPrimary transition-colors hover:border-accent hover:bg-bgSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 items-center gap-4 overflow-x-auto whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-textSecondary md:flex md:justify-end md:gap-6 md:text-xs"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {isMenuOpen && (
        <nav
          id={mobileMenuId}
          aria-label="Mobile navigation"
          className="border-t border-borderSubtle bg-bgSecondary px-6 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs uppercase tracking-[0.2em] text-textSecondary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-2 py-2 transition-colors hover:bg-accentSoft hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
