"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/lib/types";
import { cn } from "@/lib/utils";

type CarouselState = {
  slides: HeroSlide[];
  index: number;
  interval: number;
  paused: boolean;
  tone: "light" | "dark";
  go: (i: number) => void;
  togglePause: () => void;
};

const CarouselContext = createContext<CarouselState | null>(null);

const overlays = {
  light:
    "bg-gradient-to-b from-paper/90 via-paper/75 to-paper/45 lg:bg-gradient-to-r lg:from-paper/95 lg:via-paper/60 lg:to-paper/0",
  dark: "bg-gradient-to-t from-ink-950/95 via-ink-950/60 to-ink-950/25 lg:bg-gradient-to-r lg:from-ink-950/90 lg:via-ink-950/55 lg:to-ink-950/5",
};

/**
 * Full-bleed hero background driven by CMS slides (images or videos).
 * Crossfades between slides, gives images a slow zoom, plays videos muted,
 * pauses on request and never auto-advances for users who prefer reduced motion.
 * Place <HeroControls /> anywhere inside to show caption, progress and pause.
 */
export function HeroCarousel({
  slides,
  interval = 7000,
  tone = "dark",
  className,
  children,
}: {
  slides: HeroSlide[];
  interval?: number;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only the first slide loads with the page; the rest load once the browser is idle (better LCP on mobile).
  const [ready, setReady] = useState(false);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const layer = useRef<HTMLDivElement>(null);

  // Subtle scroll parallax: the media drifts slower than the page for depth (skipped for reduced motion).
  useEffect(() => {
    const el = layer.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, 600) * 0.15;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true));
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, [slides.length]);

  // Auto-advance
  useEffect(() => {
    if (slides.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides.length, interval, paused, index]);

  // Play only the active video
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && !paused) v.play().catch(() => {});
      else v.pause();
    });
  }, [index, paused]);

  const state: CarouselState = {
    slides,
    index,
    interval,
    paused,
    tone,
    go: (i) => {
      setReady(true);
      setIndex(i);
    },
    togglePause: () => setPaused((p) => !p),
  };

  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div ref={layer} className="absolute inset-x-0 -top-[6%] -z-10 h-[112%] will-change-transform" aria-hidden={slides.length > 1 ? undefined : true}>
        {slides.map((slide, i) => {
          const active = i === index;
          const { media } = slide;
          if (i > 0 && !ready) return null;
          return (
            <div
              key={media.src}
              className={cn("absolute inset-0 transition-opacity duration-[1200ms] ease-out", active ? "opacity-100" : "opacity-0")}
              aria-hidden={!active}
            >
              {media.type === "image" ? (
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="100vw"
                  preload={i === 0}
                  style={{ objectPosition: media.focus }}
                  className={cn(
                    "object-cover transition-transform ease-linear motion-reduce:transition-none",
                    active ? "scale-[1.07] duration-[9000ms]" : "scale-100 duration-0",
                  )}
                />
              ) : (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  className="size-full object-cover"
                  style={{ objectPosition: media.focus }}
                  src={media.src}
                  poster={media.poster}
                  muted
                  loop
                  playsInline
                  autoPlay={i === 0}
                  preload={i === 0 ? "auto" : "none"}
                  aria-label={media.alt}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className={cn("absolute inset-0 -z-10", overlays[tone])} aria-hidden />
      <CarouselContext.Provider value={state}>{children}</CarouselContext.Provider>
    </section>
  );
}

/** Caption + per-slide progress indicators + pause/play (WCAG 2.2.2). */
export function HeroControls({ className }: { className?: string }) {
  const ctx = useContext(CarouselContext);
  if (!ctx || ctx.slides.length < 2) return null;
  const { slides, index, interval, paused, tone, go, togglePause } = ctx;
  const light = tone === "light";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-4 text-xs font-medium backdrop-blur-md",
        light ? "bg-white/75 text-ink-800 ring-1 ring-ink-950/[0.06]" : "bg-ink-950/40 text-white ring-1 ring-white/15",
        className,
      )}
    >
      <span className="min-w-0 truncate" aria-live="polite">
        {slides[index].caption ?? `Slide ${index + 1}`}
      </span>
      <span className="flex items-center gap-1.5" role="group" aria-label="Choose slide">
        {slides.map((s, i) => (
          <button
            key={s.media.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}${s.caption ? `: ${s.caption}` : ""}`}
            aria-current={i === index}
            className={cn("relative h-1.5 overflow-hidden rounded-full transition-all duration-300", i === index ? "w-8" : "w-1.5", light ? "bg-ink-950/15" : "bg-white/25")}
          >
            {i === index && (
              <span
                key={`${index}-${paused}`}
                className={cn("absolute inset-y-0 left-0 rounded-full", light ? "bg-ink-950" : "bg-gold-400", paused ? "w-full" : "animate-hero-progress motion-reduce:w-full motion-reduce:animate-none")}
                style={{ animationDuration: `${interval}ms` }}
              />
            )}
          </button>
        ))}
      </span>
      <button
        type="button"
        onClick={togglePause}
        aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        className={cn("grid size-7 place-items-center rounded-full", light ? "bg-ink-950 text-white" : "bg-white text-ink-950")}
      >
        {paused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}
      </button>
    </div>
  );
}
