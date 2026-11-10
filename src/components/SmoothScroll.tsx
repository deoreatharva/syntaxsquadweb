"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Honor accessibility preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Initialize Lenis with buttery smooth inertia parameters
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential decay
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95, // Soft, non-jarring wheel response
      touchMultiplier: 1.0,  // Natural 1:1 touch ratio, no violent jumping on mobile
      syncTouch: false,      // Do not fight mobile OS native hardware momentum touch physics
      infinite: false,
      autoResize: true,
    });

    (window as any).__lenis = lenis;

    // Synchronize GlyphPortal scroll animation with Lenis RAF tick.
    // Without this, the portal listens to native "scroll" events which fire
    // one RAF frame after Lenis moves the DOM — causing the word clip-path to lag.
    // By dispatching a sync scroll event from inside Lenis's own tick we ensure
    // the portal reads getBoundingClientRect() at the exact same time as Lenis's
    // visual update, eliminating the trail/desync.
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll", { bubbles: false, cancelable: false }));
    });

    // Smooth scrolling for anchor links (e.g., #gp-...-content, #about, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, { offset: 0, duration: 1.4 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}

