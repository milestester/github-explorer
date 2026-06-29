"use client";

import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from "@tanstack/react-query";
import { fetchUserRepos, type ReposPage } from "../actions";
import type { GitHubRepo } from "@/lib/github/types";
import { GITHUB_ERROR_MESSAGES } from "@/lib/github/githubApi.error";

export type UserReposResult = UseInfiniteQueryResult<InfiniteData<ReposPage, number>, Error> & {
  repos: GitHubRepo[];
  isRateLimit: boolean;
};

export function useUserRepos(username: string): UserReposResult {
  const result = useInfiniteQuery({
    queryKey: ["repos", username],
    queryFn: ({ pageParam }) => fetchUserRepos(username, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    enabled: !!username,
    // Cache user repos for 5 minutes to avoid refetching on every accordion reopen
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...result,
    repos: result.data?.pages.flatMap((page) => page.repos) ?? [],
    isRateLimit: result.error?.message === GITHUB_ERROR_MESSAGES.rate_limit,
  } as UserReposResult;
}
