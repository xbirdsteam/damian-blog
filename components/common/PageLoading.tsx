"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageLoading() {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const [isProgressComplete, setIsProgressComplete] = useState(false);

  useEffect(() => {
    // Add no-scroll class when component mounts
    document.body.classList.add("no-scroll");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProgressComplete(true);
          setTimeout(() => {
            setShowProgress(false);
            // Remove no-scroll class after loading completes
            document.body.classList.remove("no-scroll");
          }, 600);
          return 100;
        }
        return prev + 4;
      });
    }, 8);

    // Force the loading to complete its animation
    const minLoadingTime = setTimeout(() => {
      setProgress(100);
    }, 1000);

    // Cleanup: remove no-scroll class and clear timers
    return () => {
      clearInterval(interval);
      clearTimeout(minLoadingTime);
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
                className="h-[1px] bg-neutral-text-secondary origin-left"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.15,
                  ease: "linear",
                }}
              />
            </div>
          </div>
          <motion.div 
            className="fixed inset-0 bg-neutral-primary-text z-[99999] h-screen w-screen origin-top"
            animate={{ 
              opacity: isProgressComplete ? 0 : 1 
            }}
            transition={{
              duration: 0.6,  
              delay: isProgressComplete ? 0.2 : 0,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* {!showProgress && (
        <motion.div
          className="fixed inset-0 bg-neutral-primary-text z-[99999] h-screen w-screen origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      )} */}
    </>
  );
}
