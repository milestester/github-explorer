"use server";

import { githubApi } from "@/lib/github/githubApi";
import type { GitHubUser } from "@/lib/github/types";

export async function searchUsers(query: string): Promise<GitHubUser[]> {
  return githubApi.searchUsers(query);
}
