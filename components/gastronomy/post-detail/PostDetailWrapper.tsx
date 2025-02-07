"use client";
import dynamic from "next/dynamic";

const PostDetailContent = dynamic(() => import("./PostDetailContent"), {
  ssr: false,
});

export default function PostDetailWrapper() {
  return (
    <div>
      <PostDetailContent />
    </div>
  );
}
