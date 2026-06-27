export type GitHubErrorKind = "rate_limit" | "not_found" | "unknown";

export class GithubApiError extends Error {
  constructor(
    public readonly kind: GitHubErrorKind,
    message: string
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}
