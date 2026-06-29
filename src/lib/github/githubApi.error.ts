export type GitHubErrorKind = "rate_limit" | "not_found" | "unknown";

export const GITHUB_ERROR_MESSAGES: Record<GitHubErrorKind, string> = {
  rate_limit: "GitHub API rate limit reached. Try again in a moment.",
  not_found: "Not found.",
  unknown: "Something went wrong. Try again in a moment.",
};

export class GithubApiError extends Error {
  constructor(
    public readonly kind: GitHubErrorKind,
    message: string
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}
