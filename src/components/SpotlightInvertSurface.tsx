import React, { useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type SpotlightInvertSurfaceProps = {
  children: ReactNode;
  className?: string;
  radius?: number;
};

const SPRING = {
  stiffness: 190,
  damping: 34,
  mass: 0.48,
};

export function SpotlightInvertSurface({
  children,
  className = "",
  radius = 152,
}: SpotlightInvertSurfaceProps) {
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-radius);
  const cursorY = useMotionValue(-radius);
  const smoothX = useSpring(cursorX, SPRING);
  const smoothY = useSpring(cursorY, SPRING);

  function updateSpotlight(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left - radius);
    cursorY.set(event.clientY - bounds.top - radius);
  }

  return (
    <div
      className={`spotlight-surface ${className}`.trim()}
      onPointerEnter={(event) => {
        updateSpotlight(event);
        setIsActive(true);
      }}
      onPointerMove={updateSpotlight}
      onPointerLeave={() => setIsActive(false)}
    >
      <motion.div
        aria-hidden="true"
        className="spotlight-surface__spot"
        data-testid="spotlight-surface-spot"
        animate={{ opacity: isActive && !prefersReducedMotion ? 1 : 0 }}
        initial={false}
        style={{
          x: smoothX,
          y: smoothY,
          width: radius * 2,
          height: radius * 2,
        }}
        transition={{ opacity: { duration: 0.26, ease: [0.16, 1, 0.3, 1] } }}
      />
      {children}
    </div>
  );
}
