"use server";

import { githubApi } from "@/lib/github/githubApi";
import type { GitHubRepo } from "@/lib/github/types";

export interface ReposPage {
  repos: GitHubRepo[];
  nextPage: number | null;
}

// use a Next.js server action so that we can re-use our server side api client
// this approach allows us to not expose credentials to the client, in the githubApi client
// we can set the GITHUB_TOKEN if we want to authenticate the api calls to have expanded rate limits
export async function fetchUserRepos(username: string, page: number): Promise<ReposPage> {
  const repos = await githubApi.getUserRepos(username, page);
  return { repos, nextPage: repos.length === 100 ? page + 1 : null };
}
