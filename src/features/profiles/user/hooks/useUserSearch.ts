"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { searchUsers } from "../actions";
import type { GitHubUser } from "@/lib/github/types";
import { GITHUB_ERROR_MESSAGES } from "@/lib/github/githubApi.error";

export type UserSearchResult = UseQueryResult<GitHubUser[], Error> & {
  searchQuery: string;
  isRateLimit: boolean;
};

export function useUserSearch(): UserSearchResult {
  const searchQuery = useSearchParams().get("search") ?? "";

  const result = useQuery<GitHubUser[]>({
    queryKey: ["users", searchQuery],
    queryFn: () => searchUsers(searchQuery),
    enabled: !!searchQuery,
    staleTime: 5 * 60 * 1000,
  });

  return {
    searchQuery,
    ...result,
    isRateLimit: result.error?.message === GITHUB_ERROR_MESSAGES.rate_limit,
  };
}
