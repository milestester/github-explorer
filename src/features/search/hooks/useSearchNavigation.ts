"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useSearchNavigation() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("search") ?? "";

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    // TODO: think about useOptimistic removal
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return {
    handleSearch,
    isPending,
    query,
    isShowingResults: !!query,
  };
}
