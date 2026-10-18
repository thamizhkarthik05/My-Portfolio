import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SolarSystemLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const STATUS_MESSAGES = [
  'Aligning the stars...',
  'Exploring ideas...',
  'Connecting innovation with engineering...',
  'Preparing the experience...',
];

export function SolarSystemLoader({ onComplete, minDuration = 1400 }: SolarSystemLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  // Status message rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Lifecycle handler: Wait for DOM readiness + minimal graceful display time
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleReady = () => {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, minDuration);
    };

    if (document.readyState === 'complete') {
      handleReady();
    } else {
      window.addEventListener('load', handleReady, { once: true });
      // Fallback timeout to guarantee loader never hangs
      const fallback = setTimeout(handleReady, 3000);
      return () => {
        window.removeEventListener('load', handleReady);
        clearTimeout(fallback);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [minDuration]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="solar-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#070B16] text-warm-white select-none px-4 overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio experience"
        >
          {/* Deep celestial atmospheric ambient lighting */}
          <div
            className="absolute w-[450px] h-[450px] rounded-full blur-[140px] opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #7657FF 0%, #35D5F2 45%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* ============================================================ */}
          {/* SOLAR SYSTEM ENGINE */}
          {/* ============================================================ */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center shrink-0 mb-8">
            {/* Luminous Central Sun */}
            <div className="relative z-20 flex items-center justify-center">
              {/* Outer Corona Flare */}
              <div
                className="absolute w-14 h-14 rounded-full blur-md opacity-70 animate-pulse pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FBBF24 0%, #F59E0B 60%, transparent 100%)' }}
              />
              {/* Core Sun */}
              <div
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-[0_0_24px_rgba(251,191,36,0.85)] border border-amber-200/60"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #FFFBEB 0%, #FDE68A 30%, #F59E0B 75%, #B45309 100%)',
                }}
              />
            </div>

            {/* Orbit 1: Inner Cyan Planet */}
            <div
              className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-cyan-400/20"
              style={{
                animation: 'solar-orbit 4.5s linear infinite',
              }}
            >
              <div
                className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(57,217,245,0.8)] border border-cyan-100"
                title="Inner orbit"
              />
            </div>

            {/* Orbit 2: Violet Terrestrial Planet */}
            <div
              className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-violet-electric/20"
              style={{
                animation: 'solar-orbit 7.5s linear infinite',
              }}
            >
              <div
                className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,108,255,0.7)] border border-violet-200"
                title="Terrestrial orbit"
              >
                {/* Tiny Moon */}
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-slate-200 shadow-sm" />
              </div>
            </div>

            {/* Orbit 3: Amber/Gold Planet */}
            <div
              className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-amber-400/15"
              style={{
                animation: 'solar-orbit 12s linear infinite',
              }}
            >
              <div
                className="absolute bottom-3 left-6 w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.6)] border border-amber-100"
                title="Gas orbit"
              />
            </div>

            {/* Orbit 4: Outer Emerald / Ice Planet */}
            <div
              className="absolute w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-emerald-400/15"
              style={{
                animation: 'solar-orbit 18s linear infinite',
              }}
            >
              <div
                className="absolute top-6 right-8 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] border border-emerald-200"
                title="Outer orbit"
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* MESSAGING & PROGRESS */}
          {/* ============================================================ */}
          <div className="text-center max-w-md mx-auto z-10 flex flex-col items-center">
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-warm-white mb-2">
              Exploring New Possibilities
            </h2>

            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-6 max-w-sm">
              Connecting ideas, engineering solutions, and discovering what comes next.
            </p>

            {/* Dynamic rotating status text */}
            <div className="h-6 flex items-center justify-center mb-4">
              <span className="font-mono text-xs text-cyan-300 font-medium tracking-wide animate-pulse">
                {STATUS_MESSAGES[messageIndex]}
              </span>
            </div>

            {/* Subtle progress track */}
            <div className="w-48 h-1 rounded-full bg-slate-800/80 overflow-hidden border border-violet-electric/20">
              <div
                className="h-full bg-gradient-to-r from-violet-electric via-cyan-vivid to-emerald-400 rounded-full"
                style={{
                  width: '100%',
                  animation: 'solar-progress 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Orbit Animation Keyframes inline to guarantee zero bundle dependency */}
          <style>{`
            @keyframes solar-orbit {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes solar-progress {
              0% {
                transform: translateX(-100%);
              }
              50% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .animate-pulse {
                animation: none !important;
              }
              [style*="solar-orbit"] {
                animation: none !important;
              }
              [style*="solar-progress"] {
                animation: none !important;
                transform: translateX(0%) !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
