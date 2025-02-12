"use client";

import { Button } from "@/components/ui/button";
import { HEADER_HEIGHT } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{ marginTop: `calc(${HEADER_HEIGHT}px + 32px)` }}
      className="min-h-screen bg-neutral-primary-text flex flex-col items-center justify-center relative"
    >
      {/* Large 404 Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div
          className="text-[400px] font-bold leading-none tracking-tighter"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundImage:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 80%)",
          }}
        >
          404
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center z-10 gap-6">
        <h1 className="text-heading-b-28 text-white">Page not found</h1>
        <p className="text-title-r-18 text-white">
          We can&apos;t find the page that you&apos;re looking for.
          <br />
          Go back to home and continue exploring.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="!bg-white !text-neutral-primary-text font-bold"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
