"use client";

/**
 * IVA Nail Art - Magical Cursor Sparkle Effect
 * Creates beautiful nail polish themed sparkles that follow the cursor
 */

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: "star" | "diamond" | "dot" | "heart";
  rotation: number;
}

// Nail polish themed colors
const COLORS = [
  "#B76E79", // Rose gold
  "#722F37", // Burgundy
  "#FFD700", // Gold
  "#E8B4B8", // Blush pink
  "#D4A574", // Champagne
  "#F5E6D3", // Pearl
  "#FF69B4", // Hot pink
  "#9B59B6", // Purple
];

const SHAPES = ["star", "diamond", "dot", "heart"] as const;

export default function CursorSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Only enable on desktop (no touch)
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      setIsEnabled(true);
    }
  }, []);

  // Detect hovering over buttons for extra sparkles
  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target.closest("button, a, [role='button']");
      setIsHoveringButton(!!isButton);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [isEnabled]);

  const createSparkle = useCallback((x: number, y: number, burst = false): Sparkle => {
    const spread = burst ? 40 : 20;
    return {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * spread,
      y: y + (Math.random() - 0.5) * spread,
      size: burst ? Math.random() * 12 + 8 : Math.random() * 10 + 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * 360,
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let lastX = 0;
    let lastY = 0;
    let frameCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      frameCount++;
      // Create sparkles more frequently when hovering buttons
      const frequency = isHoveringButton ? 2 : 4;
      if (frameCount % frequency !== 0) return;

      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );

      if (distance > 8) {
        lastX = e.clientX;
        lastY = e.clientY;

        // Create multiple sparkles when hovering buttons
        const count = isHoveringButton ? 2 : 1;
        const newSparkles = Array.from({ length: count }, () =>
          createSparkle(e.clientX, e.clientY, isHoveringButton)
        );

        setSparkles((prev) => [...prev.slice(-20), ...newSparkles]);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Burst of sparkles on click
      const burstSparkles = Array.from({ length: 8 }, () =>
        createSparkle(e.clientX, e.clientY, true)
      );
      setSparkles((prev) => [...prev, ...burstSparkles]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [isEnabled, isHoveringButton, createSparkle]);

  // Remove sparkles after animation
  useEffect(() => {
    if (sparkles.length === 0) return;

    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 500);

    return () => clearTimeout(timer);
  }, [sparkles]);

  if (!isEnabled) return null;

  const renderShape = (sparkle: Sparkle) => {
    switch (sparkle.type) {
      case "star":
        return (
          <svg viewBox="0 0 24 24" fill={sparkle.color} className="w-full h-full">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        );
      case "diamond":
        return (
          <svg viewBox="0 0 24 24" fill={sparkle.color} className="w-full h-full">
            <path d="M12 0L24 12L12 24L0 12L12 0Z" />
          </svg>
        );
      case "heart":
        return (
          <svg viewBox="0 0 24 24" fill={sparkle.color} className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      default:
        return (
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: sparkle.color }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            initial={{
              scale: 0,
              opacity: 1,
              rotate: sparkle.rotation,
            }}
            animate={{
              scale: [0, 1.2, 0.8],
              opacity: [1, 0.9, 0],
              rotate: sparkle.rotation + 180,
              y: -20,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
            }}
          >
            {renderShape(sparkle)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
