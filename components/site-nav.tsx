"use client";

import * as React from "react";

import { BrandLockup } from "@/components/ui/brand-lockup";
import { Button } from "@/components/ui/button";
import { Close, Menu } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Product", href: "#workspace" },
  { label: "How it works", href: "#loop" },
  { label: "Integrations", href: "#integrations" },
  { label: "Docs", href: "https://docs.neatlogs.com" },
  { label: "Changelog", href: "#" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled
            ? "border-b border-line bg-canvas/85 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <BrandLockup
            priority
            className="transition-opacity hover:opacity-70"
          />

          <div className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 font-mono text-[11.5px] tracking-[0.08em] text-muted uppercase transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button href="#demo" variant="ghost" size="sm">
              Book a demo
            </Button>
            <Button href="#start" variant="primary" size="sm">
              Start free
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 cursor-pointer items-center justify-center bg-raised text-ink shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:bg-brand-soft sm:hidden"
          >
            {menuOpen ? (
              <Close className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>

      {menuOpen ? (
        <div className="border-b border-line bg-canvas p-4 sm:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line-soft py-3 font-mono text-[12px] tracking-[0.08em] text-ink-soft uppercase transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button href="#demo" variant="secondary" size="md">
              Book a demo
            </Button>
            <Button href="#start" variant="primary" size="md">
              Start free
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
