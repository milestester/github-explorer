"use client";

import { useEffect, useRef } from "react";

interface Options {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage }: Options) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMore = loadMoreRef.current;
    const container = scrollContainerRef.current;
    if (!loadMore || !container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: container, rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(loadMore);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { scrollContainerRef, loadMoreRef };
}
