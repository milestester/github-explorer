"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useSearchNavigation() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return {
    handleSearch,
    isPending,
    searchQuery,
    isShowingResults: !!searchQuery,
  };
}
