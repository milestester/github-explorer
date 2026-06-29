"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { searchUsers } from "../actions";
import type { GitHubUser } from "@/lib/github/types";

export function useUserSearch() {
  const query = useSearchParams().get("search") ?? "";

  return {
    query,
    ...useQuery<GitHubUser[]>({
      queryKey: ["users", query],
      queryFn: () => searchUsers(query),
      enabled: !!query,
      staleTime: 5 * 60 * 1000,
    }),
  };
}
