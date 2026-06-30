import { githubApi } from "../githubApi";
import { GithubApiError, GITHUB_ERROR_MESSAGES } from "../githubApi.error";

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockResponse(status: number, body: unknown) {
  mockFetch.mockResolvedValueOnce({
    status,
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(body),
  });
}

beforeEach(() => mockFetch.mockClear());

describe("githubApi.searchUsers", () => {
  it("returns empty array for blank query", async () => {
    expect(await githubApi.searchUsers("")).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns mapped users on success", async () => {
    mockResponse(200, {
      items: [
        {
          id: 1,
          login: "torvalds",
          avatar_url: "https://avatar",
          html_url: "https://github.com/torvalds",
        },
      ],
    });
    const users = await githubApi.searchUsers("torvalds");
    expect(users).toHaveLength(1);
    expect(users[0].username).toBe("torvalds");
  });

  it("throws rate limit error on 403", async () => {
    mockResponse(403, {});
    await expect(githubApi.searchUsers("torvalds")).rejects.toThrow(
      GITHUB_ERROR_MESSAGES.rate_limit
    );
  });

  it("throws rate limit error on 429", async () => {
    mockResponse(429, {});
    await expect(githubApi.searchUsers("torvalds")).rejects.toThrow(
      GITHUB_ERROR_MESSAGES.rate_limit
    );
  });

  it("throws unknown error on non-ok response", async () => {
    mockResponse(500, {});
    await expect(githubApi.searchUsers("torvalds")).rejects.toThrow(GITHUB_ERROR_MESSAGES.unknown);
  });

  it("throws unknown error when fetch rejects", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));
    await expect(githubApi.searchUsers("torvalds")).rejects.toBeInstanceOf(GithubApiError);
  });
});

describe("githubApi.getUserRepos", () => {
  it("returns mapped repos on success", async () => {
    mockResponse(200, [
      {
        id: 1,
        name: "linux",
        full_name: "torvalds/linux",
        description: null,
        html_url: "https://github.com/torvalds/linux",
        stargazers_count: 100,
        forks_count: 10,
        language: "C",
        updated_at: "2024-01-01T00:00:00Z",
        topics: [],
      },
    ]);
    const repos = await githubApi.getUserRepos("torvalds");
    expect(repos).toHaveLength(1);
    expect(repos[0].name).toBe("linux");
  });

  it("throws not found error on 404", async () => {
    mockResponse(404, {});
    await expect(githubApi.getUserRepos("ghost")).rejects.toThrow(GITHUB_ERROR_MESSAGES.not_found);
  });
});
