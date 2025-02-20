"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export function BackgroundMove() {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    const ANIMATION_DURATION = 1000;
    const timer = setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-neutral-primary-text z-[99999] h-screen w-screen origin-top"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    />
  );
}
