"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function SeasonalEffects() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [isWinter, setIsWinter] = useState(false);

  useEffect(() => {
    // Check if it's winter season (December, January, February)
    const month = new Date().getMonth();
    const winterMonths = [11, 0, 1]; // December, January, February

    if (winterMonths.includes(month)) {
      setIsWinter(true);

      // Create snowflakes
      const flakes: Snowflake[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.3,
      }));

      setSnowflakes(flakes);
    }
  }, []);

  if (!isWinter) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white"
          initial={{
            x: `${flake.x}vw`,
            y: -20,
            opacity: flake.opacity,
          }}
          animate={{
            y: "110vh",
            x: [
              `${flake.x}vw`,
              `${flake.x + 5}vw`,
              `${flake.x - 5}vw`,
              `${flake.x}vw`,
            ],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: flake.duration / 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          style={{
            fontSize: flake.size,
          }}
        >
          {/* Snowflake character */}
          <svg
            viewBox="0 0 24 24"
            width={flake.size}
            height={flake.size}
            fill="currentColor"
            style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.5))" }}
          >
            <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07M12 6L12 2M12 22L12 18M6 12L2 12M22 12L18 12M7.76 7.76L4.93 4.93M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}

      {/* Subtle winter gradient overlay at top */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(200, 220, 255, 0.1), transparent)",
        }}
      />
    </div>
  );
}
