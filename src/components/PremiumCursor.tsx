import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";
import { useEffect, useRef, useState } from "react";

const BASE_SIZE = 14;
const LINK_SIZE = 24;
const PRIMARY_SIZE = 32;
const TEXT_SPOTLIGHT_SIZE = 96;

const TEXT_SELECTOR = [
  '[data-cursor="text"]',
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "strong",
  "em",
  "small",
  "li",
  "blockquote",
  "figcaption",
  "label",
  "dt",
  "dd",
  "time",
].join(", ");

const CURSOR_SPRING = {
  stiffness: 640,
  damping: 42,
  mass: 0.18,
};

function getCursorSize(target: EventTarget | null) {
  if (!(target instanceof Element)) return BASE_SIZE;

  if (target.closest('[data-cursor="primary"]')) {
    return PRIMARY_SIZE;
  }

  if (
    target.closest(
      'a, button, [role="button"], input, textarea, select, summary, [data-cursor="link"]',
    )
  ) {
    return LINK_SIZE;
  }

  if (findTextTarget(target)) {
    return TEXT_SPOTLIGHT_SIZE;
  }

  return BASE_SIZE;
}

function findTextTarget(target: Element) {
  let current: Element | null = target;

  while (current && current !== document.body) {
    if (current.matches(TEXT_SELECTOR) && current.textContent?.trim()) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}

export function PremiumCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [size, setSize] = useState(BASE_SIZE);
  const sizeRef = useRef(BASE_SIZE);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, CURSOR_SPRING);
  const smoothY = useSpring(cursorY, CURSOR_SPRING);

  function syncSize(nextSize: number) {
    if (sizeRef.current === nextSize) return;

    sizeRef.current = nextSize;
    setSize(nextSize);
  }

  useEffect(() => {
    if (!window.matchMedia) return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function syncPointerCapability() {
      setIsEnabled(pointerQuery.matches);
    }

    syncPointerCapability();
    pointerQuery.addEventListener?.("change", syncPointerCapability);

    return () => {
      pointerQuery.removeEventListener?.("change", syncPointerCapability);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      syncSize(getCursorSize(event.target));
      setIsVisible(true);
    }

    function handlePointerOut(event: PointerEvent) {
      if (!event.relatedTarget) {
        setIsVisible(false);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [cursorX, cursorY, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="premium-cursor"
      data-size={size}
      data-testid="premium-cursor"
      data-visible={isVisible}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      style={{
        x: smoothX,
        y: smoothY,
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
      }}
      transition={{
        opacity: { duration: 0.16 },
      }}
    />
  );
}
