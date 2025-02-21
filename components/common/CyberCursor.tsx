"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CyberCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Separate spring configs for dot and circle
  const dotX = useSpring(0, {
    stiffness: 500,
    damping: 20,
    mass: 0.1,
  });
  const dotY = useSpring(0, {
    stiffness: 500,
    damping: 20,
    mass: 0.1,
  });

  // Slower spring for the circle
  const circleX = useSpring(0, {
    stiffness: 200,
    damping: 30,
    mass: 1,
  });
  const circleY = useSpring(0, {
    stiffness: 200,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      circleX.set(e.clientX);
      circleY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Create the event handlers outside of forEach
    const handleMouseOver = () => {
      setIsActive(true);
      setIsPointer(true);
    };

    const handleMouseOut = () => {
      setIsActive(false);
      setIsPointer(false);
    };

    // Handle hover states for clickable elements
    const clickables = document.querySelectorAll(
      'a, button, input[type="submit"], input[type="image"], label[for], select, [role="button"], [class*="btn"]'
    );

    clickables.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      // Remove event listeners with the same function references
      clickables.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [dotX, dotY, circleX, circleY]);

  return (
    <>
      {/* Main circle - follows slower */}
      <motion.div
        className="fixed pointer-events-none z-[999999] hidden md:block"
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1 : 1,
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
          className={`rounded-full transition-all duration-300
            ${isClicking ? "w-0 h-0" : "w-[30px] h-[30px]"}
            ${
              isActive
                ? "border-[3px] border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)]"
                : "border border-[rgba(0,0,0,0.3)] bg-transparent"
            }
          `}
        />
      </motion.div>

      {/* Small dot - moves faster */}
      <motion.div
        className="fixed pointer-events-none z-[999999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 
            ${isClicking ? "size-[10px]" : isActive ? "size-[25px]" : "size-[6px]"}
            ${
              isActive 
                ? "bg-[rgba(255,255,255,0.1)]" 
                : "bg-neutral-primary-text"
            }
          `}
        />
      </motion.div>
    </>
  );
}
