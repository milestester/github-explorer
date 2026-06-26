import { GitHubApiError } from "./github-api.error";
import type { GitHubUser, GitHubRepo } from "./types";
import type { GitHubSearchResponseDto, GitHubRepoDto } from "./github-api.dto";
import { mapUser, mapRepo } from "./github-api.mapper";

class GitHubApi {
  private readonly BASE_URL = "https://api.github.com";
  private readonly API_VERSION = "2026-03-10";

  private buildHeaders(): HeadersInit {
    const token = process.env.GITHUB_TOKEN;
    return {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": this.API_VERSION,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(url: string): Promise<T> {
    let res: Response;
    try {
      res = await fetch(url, { headers: this.buildHeaders() });
    } catch (e) {
      throw new GitHubApiError("unknown", "Failed to reach GitHub API");
    }

    if (res.status === 403 || res.status === 429) {
      throw new GitHubApiError("rate_limit", "GitHub API rate limit reached");
    }
    if (res.status === 404) {
      throw new GitHubApiError("not_found", "Not found");
    }
    if (!res.ok) {
      throw new GitHubApiError("unknown", `GitHub API error: ${res.status}`);
    }

    return (await res.json()) as Promise<T>;
  }

  async searchUsers(query: string): Promise<GitHubUser[]> {
    if (!query.trim()) return [];
    const url = `${this.BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=5`;
    const data = await this.request<GitHubSearchResponseDto>(url);
    return data.items.map(mapUser);
  }

  async getUserRepos(username: string, page = 1): Promise<GitHubRepo[]> {
    const url = `${this.BASE_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=updated`;
    const data = await this.request<GitHubRepoDto[]>(url);
    return data.map(mapRepo);
  }
}

export const githubApi = new GitHubApi();
