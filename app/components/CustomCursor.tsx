"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice && window.innerWidth > 768) {
      setIsEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest("button, a, input, [role='button'], [onclick]");
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isEnabled]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[10000] mix-blend-difference"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
            isPointer ? "border-[#D4AF37]" : "border-white"
          }`}
        />
      </motion.div>

      {/* Inner dot - nail polish drop */}
      <motion.div
        className="fixed pointer-events-none z-[10001]"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 500,
          mass: 0.2,
        }}
      >
        <div
          className={`w-3 h-3 rounded-full transition-all duration-150 ${
            isPointer
              ? "bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
              : "bg-white"
          }`}
        />
      </motion.div>

      {/* Nail polish bottle icon when hovering buttons */}
      {isPointer && (
        <motion.div
          className="fixed pointer-events-none z-[10002]"
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{
            x: position.x + 15,
            y: position.y - 25,
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-lg"
          >
            {/* Nail polish bottle */}
            <rect x="8" y="2" width="8" height="4" rx="1" fill="#D4AF37" />
            <rect x="10" y="6" width="4" height="2" fill="#B8860B" />
            <path
              d="M7 8h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2z"
              fill="url(#polish-gradient)"
            />
            <defs>
              <linearGradient id="polish-gradient" x1="5" y1="8" x2="19" y2="22">
                <stop stopColor="#FF69B4" />
                <stop offset="1" stopColor="#B76E79" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </>
  );
}
