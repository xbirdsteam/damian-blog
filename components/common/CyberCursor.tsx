"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CyberCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  // Smooth spring animation for cursor position
  const smoothX = useSpring(0, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });
  const smoothY = useSpring(0, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
    };

    const handleCursorStyle = () => {
      const hoveredElement = document.elementFromPoint(
        mousePosition.x,
        mousePosition.y
      );
      setIsPointer(
        !!(
          hoveredElement?.tagName === "BUTTON" ||
          hoveredElement?.tagName === "A" ||
          hoveredElement?.closest("button") ||
          hoveredElement?.closest("a") ||
          window.getComputedStyle(hoveredElement || document.body).cursor ===
            "pointer"
        )
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleCursorStyle);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleCursorStyle);
    };
  }, [mousePosition.x, mousePosition.y, smoothX, smoothY]);

  return (
    <>
      {/* Main circle */}
      <motion.div
        className="fixed pointer-events-none z-[999999] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 25,
          },
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border transition-all duration-300
            ${
              isPointer
                ? "border-neutral-text-secondary bg-neutral-text-secondary"
                : "border-neutral-primary-text bg-transparent"
            }
          `}
        />
      </motion.div>

      {/* Small dot */}
      <motion.div
        className="fixed pointer-events-none z-[999999] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`w-1 h-1 rounded-full ${
            isPointer ? "bg-neutral-text-secondary" : "bg-neutral-primary-text"
          }`}
        />
      </motion.div>
    </>
  );
}
