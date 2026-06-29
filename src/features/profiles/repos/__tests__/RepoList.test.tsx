import { render, screen } from "@testing-library/react";
import { RepoList } from "../RepoList";
import { useUserRepos, type UserReposResult } from "../hooks/useUserRepos";
import type { GitHubRepo } from "@/lib/github/types";

jest.mock("../hooks/useUserRepos");

const mockUseUserRepos = jest.mocked(useUserRepos);

function mockQuery(overrides: Partial<UserReposResult>): UserReposResult {
  return {
    repos: [],
    isLoading: false,
    isError: false,
    isRateLimit: false,
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    ...overrides,
  } as unknown as UserReposResult;
}

const mockRepo = (id: number): GitHubRepo => ({
  id,
  name: `repo-${id}`,
  fullName: `user/repo-${id}`,
  description: `Description for repo ${id}`,
  htmlUrl: `https://github.com/user/repo-${id}`,
  stars: id * 10,
  forks: id,
  language: "TypeScript",
  updatedAt: "2024-01-01T00:00:00Z",
  topics: [],
});

let mockObserverCallback: IntersectionObserverCallback;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

beforeAll(() => {
  global.IntersectionObserver = jest.fn().mockImplementation((cb: IntersectionObserverCallback) => {
    mockObserverCallback = cb;
    return { observe: mockObserve, disconnect: mockDisconnect, unobserve: jest.fn() };
  });
});

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  (global.IntersectionObserver as jest.Mock).mockClear();
});

describe("RepoList", () => {
  it("shows loading state", () => {
    mockUseUserRepos.mockReturnValue(mockQuery({ isLoading: true }));
    const { container } = render(<RepoList username="torvalds" />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("shows error message when load fails", () => {
    mockUseUserRepos.mockReturnValue(mockQuery({ isError: true }));
    render(<RepoList username="torvalds" />);
    expect(screen.getByText(/failed to load repositories/i)).toBeInTheDocument();
  });

  it("shows rate limit message when rate limited", () => {
    mockUseUserRepos.mockReturnValue(mockQuery({ isError: true, isRateLimit: true }));
    render(<RepoList username="torvalds" />);
    expect(screen.getByText(/github rate limit reached/i)).toBeInTheDocument();
  });

  it("shows cached results message on partial error", () => {
    mockUseUserRepos.mockReturnValue(mockQuery({ isError: true, repos: [mockRepo(1)] }));
    render(<RepoList username="torvalds" />);
    expect(screen.getByText(/showing cached results/i)).toBeInTheDocument();
  });

  it("shows empty state when no repos", () => {
    mockUseUserRepos.mockReturnValue(mockQuery({ repos: [] }));
    render(<RepoList username="torvalds" />);
    expect(screen.getByText(/no public repositories/i)).toBeInTheDocument();
  });

  it("renders repo names", () => {
    mockUseUserRepos.mockReturnValue(mockQuery({ repos: [mockRepo(1), mockRepo(2)] }));
    render(<RepoList username="torvalds" />);
    expect(screen.getByText("repo-1")).toBeInTheDocument();
    expect(screen.getByText("repo-2")).toBeInTheDocument();
  });

  it("calls fetchNextPage when sentinel is intersecting and hasNextPage is true", () => {
    const fetchNextPage = jest.fn();
    mockUseUserRepos.mockReturnValue(
      mockQuery({ repos: [mockRepo(1)], hasNextPage: true, fetchNextPage })
    );
    render(<RepoList username="torvalds" />);
    mockObserverCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    expect(fetchNextPage).toHaveBeenCalled();
  });

  it("does not call fetchNextPage when hasNextPage is false", () => {
    const fetchNextPage = jest.fn();
    mockUseUserRepos.mockReturnValue(
      mockQuery({ repos: [mockRepo(1)], hasNextPage: false, fetchNextPage })
    );
    render(<RepoList username="torvalds" />);
    mockObserverCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    expect(fetchNextPage).not.toHaveBeenCalled();
  });
});
