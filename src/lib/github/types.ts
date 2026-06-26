export interface GitHubUser {
  login: string;
  id: number;
  avatarUrl: string;
  htmlUrl: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string | null;
  topics: string[];
}

export type GitHubErrorKind = "rate_limit" | "not_found" | "unknown";

export class GitHubApiError extends Error {
  constructor(
    public readonly kind: GitHubErrorKind,
    message: string,
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}
