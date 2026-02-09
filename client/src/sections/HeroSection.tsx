import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { HeroBallsBackground } from "../components/hero/HeroBallsBackground";
import { HeroStraightGrid } from "../components/hero/HeroStraightGrid";
import { TitleWordCube } from "../components/hero/TitleWordCube";

const SUBTITLE = "Virtual phone numbers and SMS API for verification and testing. No hardware—just an API.";
const TYPING_INTERVAL_MS = 35;

function TypingSubtitle() {
  const [visibleLength, setVisibleLength] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleLength(SUBTITLE.length);
      return;
    }

    if (visibleLength >= SUBTITLE.length) return;
    const t = setInterval(() => {
      setVisibleLength((n) => (n >= SUBTITLE.length ? n : n + 1));
    }, TYPING_INTERVAL_MS);
    return () => clearInterval(t);
  }, [visibleLength, prefersReducedMotion]);

  return (
    <p className="mt-5 max-w-md text-base text-slate-300 sm:text-lg">
      {SUBTITLE.slice(0, visibleLength)}
      {visibleLength < SUBTITLE.length && !prefersReducedMotion && (
        <span className="animate-pulse" aria-hidden>|</span>
      )}
    </p>
  );
}

export default function HeroSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="relative flex min-h-[90vh] w-full min-w-0 items-center justify-center overflow-x-hidden overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 hero-grid-bg">
      <HeroStraightGrid />
      <div className="absolute inset-0 -z-20 left-1/4 top-1/4 w-96 h-96 bg-pink-600 blur-[300px] opacity-30 pointer-events-none" />
      <HeroBallsBackground />
      <div className="relative z-10 w-full max-w-6xl pt-16 md:pt-20">
        <div className="flex flex-col items-start text-left w-full md:max-w-[60%] lg:max-w-[55%]">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight"
            initial={prefersReducedMotion ? {} : { y: 50, opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 240, damping: 70, mass: 1 }}
          >
            <span className="block sm:inline">Rent phone numbers and </span>
            <span className="block sm:inline mt-2 sm:mt-0">
              <span className="inline-flex items-center gap-x-1 sm:gap-x-2">
                get <TitleWordCube /> to
              </span>
            </span>
            <span className="block sm:inline mt-2 sm:mt-0"> verify you.</span>
          </motion.h1>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { delay: 0.3, duration: 0.4 }}
          >
            <TypingSubtitle />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
