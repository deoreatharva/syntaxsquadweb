"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Trophy, Sparkles, MapPin, Award } from "lucide-react";

interface Moment {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: "trophy" | "award" | "sparkles" | "pin";
}

const moments: Moment[] = [
  {
    id: 1,
    src: "/achievements/hackfest-stage.jpg",
    title: "Hackfest CodeQuest",
    subtitle: "36-Hour National Level Hackathon",
    tag: "National Stage",
    icon: "award",
  },
  {
    id: 2,
    src: "/achievements/trophy-celebration.jpg",
    title: "Victory Celebration",
    subtitle: "Bringing home the winners trophy",
    tag: "Podium Finish",
    icon: "trophy",
  },
  {
    id: 3,
    src: "/achievements/aws-builder-center.jpg",
    title: "AWS Builder Center",
    subtitle: "Tech keynote & cloud presentation",
    tag: "Speaker Stage",
    icon: "sparkles",
  },
  {
    id: 4,
    src: "/achievements/aithon-hackathon.jpg",
    title: "AIthon 2.0 National",
    subtitle: "Non-stop AI engineering sprint",
    tag: "National Hackathon",
    icon: "award",
  },
  {
    id: 5,
    src: "/achievements/explorethon.jpg",
    title: "Explorethon Sprint",
    subtitle: "Community innovation & project showcase",
    tag: "Innovation Meet",
    icon: "pin",
  },
  {
    id: 6,
    src: "/achievements/pitch-presentation.jpg",
    title: "Live Project Pitch",
    subtitle: "Defending working software to jury",
    tag: "Demo Day",
    icon: "sparkles",
  },
  {
    id: 7,
    src: "/achievements/tedx-event.jpg",
    title: "TEDx Delegation",
    subtitle: "Representing Syntax Squad crew",
    tag: "Community",
    icon: "pin",
  },
];

export default function ClubShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Auto-advance every 3.8s with smooth buttery feel, paused on user hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % moments.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % moments.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + moments.length) % moments.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only switch slide if horizontal intent is clearly higher than vertical scroll
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = moments[activeIndex];

  return (
    <div
      className="w-full flex flex-col gap-2.5 sm:gap-3.5 select-none"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Main Showcase Frame ── */}
      <div
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.18)] bg-[#051a11] shadow-[0_12px_36px_rgba(0,0,0,0.45)] group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Layered images for buttery smooth crossfade */}
        {moments.map((m, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={m.id}
              className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                isActive
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-[1.03] pointer-events-none"
              }`}
            >
              {/* Background image */}
              <img
                src={m.src}
                alt={m.title}
                className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
                loading="eager"
              />

              {/* Cinematic Vignette & Bottom Gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05150e]/95 via-[#05150e]/30 to-transparent" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#05150e]/50 pointer-events-none" />
            </div>
          );
        })}

        {/* Floating Top Tag */}
        <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#05150e]/85 backdrop-blur-md border border-[rgba(34,197,94,0.35)] shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#f0fdf4] font-[family-name:var(--font-space-grotesk)]">
              {current.tag}
            </span>
          </div>

          {/* Slide counter */}
          <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#05150e]/75 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-mono text-[#f0fdf4]/75">
            {activeIndex + 1} / {moments.length}
          </div>
        </div>

        {/* Floating Bottom Info */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 z-10 flex items-end justify-between gap-3">
          <div className="max-w-[75%]">
            <h3 className="text-sm sm:text-xl font-bold text-[#f0fdf4] tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)] drop-shadow-md">
              {current.title}
            </h3>
            <p className="text-[11px] sm:text-sm text-[#f0fdf4]/80 font-[family-name:var(--font-inter)] line-clamp-1 mt-0.5 drop-shadow">
              {current.subtitle}
            </p>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-1 sm:gap-1.5 z-20">
            <button
              onClick={prevSlide}
              aria-label="Previous photo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#05150e]/80 hover:bg-[#22c55e] text-[#f0fdf4] hover:text-[#05150e] border border-white/15 hover:border-[#22c55e] flex items-center justify-center backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next photo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#05150e]/80 hover:bg-[#22c55e] text-[#f0fdf4] hover:text-[#05150e] border border-white/15 hover:border-[#22c55e] flex items-center justify-center backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Filmstrip Thumbnail Collage Strip ── */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
        {moments.map((m, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={m.id}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-12 sm:w-16 h-8 sm:h-11 rounded-md sm:rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-[#22c55e] ring-2 ring-[#22c55e]/40 scale-105 opacity-100 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                  : "border-white/15 opacity-55 hover:opacity-90 hover:border-white/40"
              }`}
            >
              <img
                src={m.src}
                alt={m.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isActive && (
                <div className="absolute inset-0 bg-[#22c55e]/10 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

