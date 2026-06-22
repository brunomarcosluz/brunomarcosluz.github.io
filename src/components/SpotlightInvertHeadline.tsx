import React, { useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type SpotlightInvertHeadlineProps = {
  children: ReactNode;
  className?: string;
  radius?: number;
};

const SPRING = {
  stiffness: 210,
  damping: 32,
  mass: 0.42,
};

export function SpotlightInvertHeadline({
  children,
  className = "",
  radius = 140,
}: SpotlightInvertHeadlineProps) {
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-radius);
  const cursorY = useMotionValue(-radius);
  const smoothX = useSpring(cursorX, SPRING);
  const smoothY = useSpring(cursorY, SPRING);
  const clipPath = useMotionTemplate`circle(${radius}px at ${smoothX}px ${smoothY}px)`;

  function updateSpotlight(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
  }

  return (
    <div
      className="spotlight-headline"
      onPointerEnter={(event) => {
        updateSpotlight(event);
        setIsActive(true);
      }}
      onPointerMove={updateSpotlight}
      onPointerLeave={() => setIsActive(false)}
    >
      <h1 className={className}>{children}</h1>
      <motion.div
        aria-hidden="true"
        className="spotlight-headline__inverted"
        data-testid="spotlight-inverted-layer"
        animate={{ opacity: isActive && !prefersReducedMotion ? 1 : 0 }}
        initial={false}
        style={{
          clipPath,
          WebkitClipPath: clipPath,
        }}
        transition={{ opacity: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
      >
        <h1 className={`${className} spotlight-headline__inverted-text`}>
          {children}
        </h1>
      </motion.div>
    </div>
  );
}
