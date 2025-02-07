"use client";

import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostItem from "./PostItem";
import { getPosts } from "@/actions/post";

interface MobilePostListProps {
  initialPosts: Post[];
  initialTotalItems: number;
}

export default function MobilePostList({
  initialPosts,
  initialTotalItems,
}: MobilePostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const hasMore = posts.length < initialTotalItems;
  useEffect(() => {
    const loadMore = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      try {
        const nextPage = page + 1;
        const { posts: newPosts } = await getPosts(nextPage);

        if (newPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setPage(nextPage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (inView) {
      loadMore();
    }
  }, [inView, isLoading, hasMore, page]);

  return (
    <div className="block md:hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[30px] md:gap-6 mt-[30px]">
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>

      {/* Loading indicator */}
      <div ref={ref} className="w-full my-12 flex justify-center">
        {isLoading && (
          <div className="flex items-center gap-1 py-4">
            <div className="w-2 h-2 rounded-full bg-neutral-text-secondary animate-[bounce_0.7s_infinite] [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-neutral-text-secondary animate-[bounce_0.7s_infinite] [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-neutral-text-secondary animate-[bounce_0.7s_infinite]" />
          </div>
        )}
      </div>
    </div>
  );
}
