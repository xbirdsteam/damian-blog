"use client";
import { TimelineItem } from "@/types/about-me";
import MileStoneItem from "./MileStoneItem";
import ScrollToView from "./ScrollToView";
import { useEffect, useRef, useState } from "react";

interface IProps {
  timeLine: TimelineItem[];
}

export default function MileStoneWrapper({ timeLine = [] }: IProps) {
  const [showScrollToView, setShowScrollToView] = useState(true);
  const [showGradient, setShowGradient] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 0) {
        setShowScrollToView(false);
        setShowGradient(false);
      } else {
        setShowScrollToView(true);
        setShowGradient(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative mlg:!max-h-[500px] overflow-y-auto pb-8 mlg:pb-0 scrollbar-hide"
    >
      <div className="hidden mlg:block">
        {timeLine.map((timeline) => (
          <MileStoneItem
            key={timeline.year}
            year={timeline.year}
            title={timeline.title}
            content={timeline.content}
          />
        ))}
      </div>
      <div className="relative block mlg:hidden">
        {timeLine.map((timeline) => (
          <MileStoneItem
            key={timeline.year}
            year={timeline.year}
            title={timeline.title}
            content={timeline.content}
          />
        ))}
      </div>
      <div
        className={`hidden mlg:block absolute h-[170px] w-full bottom-0 left-0 transition-opacity duration-300 ${
          showGradient ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 80%)",
        }}
      />
      <div className={`${showScrollToView ? "block" : "hidden"}`}>
        <ScrollToView />
      </div>
    </div>
  );
}
