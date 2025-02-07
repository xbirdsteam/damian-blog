"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface LoadMoreProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
}

export default function LoadMore({
  totalPages,
  currentPage,
  baseUrl,
}: LoadMoreProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    const loadMore = async () => {
      if (isLoading || currentPage >= totalPages) return;

      setIsLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", (currentPage + 1).toString());
        await router.push(`${baseUrl}?${params.toString()}`, {
          scroll: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (inView) {
      loadMore();
    }
  }, [
    inView,
    currentPage,
    totalPages,
    isLoading,
    router,
    searchParams,
    baseUrl,
  ]);

  if (currentPage >= totalPages) {
    return null;
  }

  return (
    <div ref={ref} className="mlg:hidden w-full mt-8 flex justify-center">
      {isLoading && (
        <div className="h-[46px] px-6 flex items-center text-neutral-text-secondary text-paragraph-m-14">
          Loading...
        </div>
      )}
    </div>
  );
}
