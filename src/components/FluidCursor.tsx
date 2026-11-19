"use client";

import { useEffect, useRef, useState } from "react";

export default function FluidCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pointerRef = useRef<HTMLDivElement>(null);
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

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const inputEl = target.closest("input, textarea");
      const interactiveEl = target.closest("a, button, [role='button'], select, [data-gp-letter], [data-gp-enter]");

      if (inputEl) {
        setIsTextInput(true);
        setIsHovering(false);
      } else if (interactiveEl) {
        setIsTextInput(false);
        setIsHovering(true);
      } else {
        setIsTextInput(false);
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
      // 1. Instant tracking for the primary pointer
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // 2. Smooth buttery lerp for trailing magnetic ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 3. Slower ambient lantern glow lerp
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
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
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-200 select-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Large Ambient Lantern Glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,rgba(34,197,94,0.02)_55%,transparent_75%)] blur-2xl will-change-transform"
      />

      {/* 2. Magnetic Trailing Glass Aura Ring (Centers on pointer with translate(-50%,-50%)) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,background-color,border-color,box-shadow,transform] duration-200 ease-out will-change-transform ${
          isTextInput
            ? "w-6 h-6 border-[#22c55e]/30 bg-transparent opacity-40"
            : isClicking
            ? "w-7 h-7 bg-[#22c55e]/30 border-[#22c55e] scale-90"
            : isHovering
            ? "w-11 h-11 bg-[#22c55e]/15 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.35)] backdrop-blur-[2px]"
            : "w-8 h-8 bg-[#22c55e]/5 border-[#22c55e]/35 shadow-[0_0_10px_rgba(34,197,94,0.12)]"
        }`}
      />

      {/* 3. Primary Replacement Pointer (Precision Tip anchored at 0,0) */}
      <div
        ref={pointerRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        {isTextInput ? (
          /* Sleek Emerald I-Beam for Text Inputs */
          <div className="w-[2px] h-5 bg-[#22c55e] shadow-[0_0_8px_#22c55e] -translate-x-[1px] -translate-y-2.5 animate-pulse rounded-full" />
        ) : (
          /* Custom Cyber Emerald Arrow Pointer */
          <div className="-translate-x-[2px] -translate-y-[2px]">
            <svg
              className={`w-5 h-5 drop-shadow-[0_0_8px_rgba(34,197,94,0.85)] filter transition-transform duration-150 ${
                isClicking ? "scale-90" : isHovering ? "scale-105" : "scale-100"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 2L18 12.5L10 14L6.5 22L3 2Z"
                fill="#22c55e"
                stroke="#050f08"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
