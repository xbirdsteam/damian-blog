import { HEADER_HEIGHT } from "@/lib/constants";
import React from "react";

export default function RouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{ paddingTop: `calc(${HEADER_HEIGHT}px + 32px)` }}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}
