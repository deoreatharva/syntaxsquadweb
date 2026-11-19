"use client";

import { useEffect, useRef, useState } from "react";

export default function FluidCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Position references (avoid React re-renders in 60-120fps RAF loop)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on devices that have a real mouse/pointer (disabled on phones/tablets)
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;

    setMounted(true);

    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      const customCursorEl = target.closest("[data-cursor]") as HTMLElement | null;

      if (customCursorEl) {
        setCursorText(customCursorEl.dataset.cursor || null);
        setIsHovering(true);
      } else if (interactive) {
        setCursorText(null);
        setIsHovering(true);
      } else {
        setCursorText(null);
        setIsHovering(false);
      }
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth physics loop
    const animate = () => {
      // Direct tracking for center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth buttery lerp for outer aura ring (lag factor 0.16)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Slower ambient lantern glow lerp (lag factor 0.08)
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Large Ambient Emerald Glow / Lantern */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,rgba(34,197,94,0.03)_50%,transparent_75%)] blur-xl will-change-transform"
      />

      {/* 2. Smooth Magnetic Trailing Glass Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#22c55e]/60 transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out flex items-center justify-center will-change-transform ${
          isClicking
            ? "w-7 h-7 bg-[#22c55e]/30 border-[#22c55e] scale-90"
            : cursorText
            ? "w-20 h-20 bg-[#05150e]/85 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] backdrop-blur-sm"
            : isHovering
            ? "w-12 h-12 bg-[#22c55e]/15 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-[2px]"
            : "w-8 h-8 bg-[#22c55e]/5 border-[#22c55e]/45"
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-[#22c55e] uppercase font-[family-name:var(--font-space-grotesk)] animate-pulse">
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. Sharp Central Emerald Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e] transition-[width,height,opacity] duration-150 will-change-transform ${
          cursorText
            ? "w-0 h-0 opacity-0"
            : isHovering
            ? "w-1.5 h-1.5 opacity-80"
            : "w-2 h-2 opacity-100"
        }`}
      />
    </div>
  );
}
