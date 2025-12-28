"use client";

import { useEffect } from "react";

export default function MagneticEffect() {
  useEffect(() => {
    // Only enable on desktop
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const magneticStrength = 0.3;
    const magneticRadius = 100;

    const handleMouseMove = (e: MouseEvent) => {
      const buttons = document.querySelectorAll(".magnetic-button, .btn-editorial-filled, [data-magnetic]");

      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distanceX = e.clientX - buttonCenterX;
        const distanceY = e.clientY - buttonCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < magneticRadius) {
          const strength = (1 - distance / magneticRadius) * magneticStrength;
          const moveX = distanceX * strength;
          const moveY = distanceY * strength;

          (button as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          (button as HTMLElement).style.transition = "transform 0.1s ease-out";
        } else {
          (button as HTMLElement).style.transform = "";
          (button as HTMLElement).style.transition = "transform 0.3s ease-out";
        }
      });
    };

    const handleMouseLeave = () => {
      const buttons = document.querySelectorAll(".magnetic-button, .btn-editorial-filled, [data-magnetic]");
      buttons.forEach((button) => {
        (button as HTMLElement).style.transform = "";
        (button as HTMLElement).style.transition = "transform 0.3s ease-out";
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return null;
}
