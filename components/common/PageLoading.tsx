"use client";

import { useEffect, useState } from "react";

export function PageLoading() {
  const [showProgress, setShowProgress] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    // Single animation sequence
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowProgress(false);
        document.body.classList.remove("no-scroll");
      }, 600); // Changed from 800ms to 600ms to match CSS
    }, 1200); // Changed from 2000ms to 1200ms to match CSS

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      {showProgress && (
        <div className={`preloader ${isExiting ? "preloader-exit" : ""}`}>
          <div className="loader-bar" />
        </div>
      )}
    </>
  );
}
