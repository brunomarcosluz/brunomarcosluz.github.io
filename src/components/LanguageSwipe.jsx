import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function BrazilMini({ className, style }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={style}
      viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="15" rx="1" fill="#009739" />
      <polygon points="11,1.5 18.5,7.5 11,13.5 3.5,7.5" fill="#FEDD00" />
      <circle cx="11" cy="7.5" r="3.5" fill="#012169" />
    </svg>
  );
}

function USMini({ className, style }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={style}
      viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="15" rx="1" fill="#B22234" />
      {Array.from({ length: 13 }).map((_, i) => (
        <rect fill="#FFFFFF" height="0.7" key={i} width="22" y={i * 1.15} />
      ))}
      <rect fill="#3C3B6E" height="7.5" width="10" />
    </svg>
  );
}

const RAIN_COUNT = 150;

function FlagRain({ direction, onComplete }) {
  const Flag = direction === "pt" ? BrazilMini : USMini;

  const drops = useMemo(
    () =>
      Array.from({ length: RAIN_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 1.5 + Math.random() * 2.5,
        size: 12 + Math.random() * 28,
        startRotate: (Math.random() - 0.5) * 60,
        endRotate: (Math.random() - 0.5) * 360,
        sway: (Math.random() - 0.5) * 100,
        peakOpacity: 0.4 + Math.random() * 0.6,
      })),
    [],
  );

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[999] pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onAnimationComplete={onComplete}
    >
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute left-0 top-0"
          initial={{
            x: `${d.x}vw`,
            y: "-12vh",
            rotate: d.startRotate,
            opacity: 0,
          }}
          animate={{
            y: ["-12vh", "112vh"],
            x: [
              `${d.x}vw`,
              `${d.x + d.sway * 0.3}vw`,
              `${d.x + d.sway * 0.6}vw`,
            ],
            opacity: [0, d.peakOpacity, d.peakOpacity * 0.5, 0],
            rotate: [d.startRotate, d.endRotate],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            ease: "linear",
            times: [0, 0.15, 0.7, 1],
          }}
        >
          <Flag style={{ width: d.size, height: "auto" }} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function LanguageSwipeOverlay({ direction }) {
  return (
    <AnimatePresence mode="wait">
      {direction && <FlagRain direction={direction} key={direction} />}
    </AnimatePresence>
  );
}
