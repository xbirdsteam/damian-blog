import React from "react";
import { HEADER_HEIGHT } from "@/lib/constants";

export default function RouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{ paddingTop: `calc(${HEADER_HEIGHT}px + 16px)` }}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}
