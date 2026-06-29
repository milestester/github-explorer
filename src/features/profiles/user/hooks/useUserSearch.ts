"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { searchUsers } from "../actions";
import type { GitHubUser } from "@/lib/github/types";

export function useUserSearch() {
  const searchQuery = useSearchParams().get("search") ?? "";

  return {
    searchQuery,
    ...useQuery<GitHubUser[]>({
      queryKey: ["users", searchQuery],
      queryFn: () => searchUsers(searchQuery),
      enabled: !!searchQuery,
      staleTime: 5 * 60 * 1000,
    }),
  };
}
