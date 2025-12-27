"use client";

/**
 * IVA Nail Art - Easter Egg
 * Secret animation triggered by typing "IVA" on keyboard
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Heart/nail emojis that rain down
const EMOJIS = ["💅", "✨", "💖", "🌸", "💎", "🦋", "🌺", "💜", "🎀", "⭐"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
}

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const triggerEasterEgg = useCallback(() => {
    setIsActive(true);

    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 1,
      duration: 2 + Math.random() * 2,
    }));

    setParticles(newParticles);

    // Reset after animation
    setTimeout(() => {
      setIsActive(false);
      setParticles([]);
    }, 5000);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      // Only track I, V, A keys
      if (["I", "V", "A"].includes(key)) {
        setKeySequence((prev) => {
          const newSequence = [...prev, key].slice(-3); // Keep last 3 keys

          // Check if sequence is "IVA"
          if (newSequence.join("") === "IVA") {
            triggerEasterEgg();
            return [];
          }

          return newSequence;
        });
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [triggerEasterEgg]);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Overlay with message */}
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <div className="text-6xl mb-4">💅✨</div>
              <h2 className="text-3xl font-serif text-[#722F37] drop-shadow-lg bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full">
                You found the secret! 🎉
              </h2>
            </motion.div>
          </motion.div>

          {/* Raining emojis */}
          <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute text-3xl"
                style={{ left: `${particle.x}%` }}
                initial={{ y: -50, opacity: 1, rotate: 0 }}
                animate={{
                  y: "110vh",
                  opacity: [1, 1, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "linear",
                }}
              >
                {particle.emoji}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
