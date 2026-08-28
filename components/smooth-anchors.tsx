"use client";

import * as React from "react";

import { scrollToSection } from "@/lib/scroll";

export function SmoothAnchors() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href^='#']");

      if (!(anchor instanceof HTMLAnchorElement)) return;

      const id = anchor.getAttribute("href")?.slice(1);

      if (!id) return;

      if (scrollToSection(id)) event.preventDefault();
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
