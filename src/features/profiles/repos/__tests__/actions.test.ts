import { fetchUserRepos } from "../actions";
import { githubApi } from "@/lib/github/githubApi";
import { GithubApiError, GITHUB_ERROR_MESSAGES } from "@/lib/github/githubApi.error";

jest.mock("@/lib/github/githubApi", () => ({
  githubApi: { getUserRepos: jest.fn() },
}));

const mockGetUserRepos = jest.mocked(githubApi.getUserRepos);

const makeRepos = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `repo-${i}`,
    fullName: `user/repo-${i}`,
    description: null,
    htmlUrl: `https://github.com/user/repo-${i}`,
    stars: 0,
    forks: 0,
    language: null,
    updatedAt: null,
    topics: [],
  }));

describe("fetchUserRepos", () => {
  it("returns nextPage as page + 1 when response has 100 repos", async () => {
    mockGetUserRepos.mockResolvedValue(makeRepos(100));
    const result = await fetchUserRepos("torvalds", 1);
    expect(result.nextPage).toBe(2);
  });

  it("returns nextPage as null when response has fewer than 100 repos", async () => {
    mockGetUserRepos.mockResolvedValue(makeRepos(42));
    const result = await fetchUserRepos("torvalds", 1);
    expect(result.nextPage).toBeNull();
  });

  it("returns nextPage as null for an empty response", async () => {
    mockGetUserRepos.mockResolvedValue([]);
    const result = await fetchUserRepos("torvalds", 1);
    expect(result.nextPage).toBeNull();
  });

  it("propagates GithubApiError without swallowing it", async () => {
    mockGetUserRepos.mockRejectedValue(
      new GithubApiError("rate_limit", GITHUB_ERROR_MESSAGES.rate_limit)
    );
    await expect(fetchUserRepos("torvalds", 1)).rejects.toBeInstanceOf(GithubApiError);
  });
});
