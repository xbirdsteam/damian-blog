"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageLoading() {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    // Add no-scroll class when component mounts
    document.body.classList.add("no-scroll");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowProgress(false);
            // Remove no-scroll class after loading completes
            document.body.classList.remove("no-scroll");
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Cleanup: remove no-scroll class and clear interval
    return () => {
      clearInterval(interval);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      {showProgress && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-[999999]">
            <div className="w-[50vw]">
              <motion.div
                className="h-1 bg-neutral-text-secondary origin-left"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.3,
                  ease: "linear",
                }}
              />
            </div>
          </div>
          <motion.div className="fixed inset-0 bg-neutral-primary-text z-[99999] h-screen w-screen origin-top" />
        </>
      )}

      {!showProgress && (
        <motion.div
          className="fixed inset-0 bg-neutral-primary-text z-[99999] h-screen w-screen origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      )}
    </>
  );
}
