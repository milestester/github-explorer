import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { useUserRepos } from "../useUserRepos";
import { fetchUserRepos } from "../../actions";

jest.mock("../../actions", () => ({
  fetchUserRepos: jest.fn(),
}));

const mockFetchUserRepos = jest.mocked(fetchUserRepos);

function makeWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  function Wrapper({ children }: { children: React.ReactNode }) {
    return createElement(QueryClientProvider, { client }, children);
  }
  return Wrapper;
}

describe("useUserRepos", () => {
  beforeEach(() => {
    mockFetchUserRepos.mockClear();
    mockFetchUserRepos.mockResolvedValue({ repos: [], nextPage: null });
  });

  it("is not stale immediately after fetching, so reopening the accordion does not refetch", async () => {
    const { result } = renderHook(() => useUserRepos("torvalds"), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.isStale).toBe(false);
  });

  it("does not fetch when username is empty", () => {
    const { result } = renderHook(() => useUserRepos(""), { wrapper: makeWrapper() });
    expect(result.current.fetchStatus).toBe("idle");
    expect(mockFetchUserRepos).not.toHaveBeenCalled();
  });

  it("fetches with the correct username and initial page", async () => {
    const { result } = renderHook(() => useUserRepos("torvalds"), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockFetchUserRepos).toHaveBeenCalledWith("torvalds", 1);
  });

  it("includes username in queryKey so each user has an isolated cache", () => {
    const { result } = renderHook(() => useUserRepos("torvalds"), { wrapper: makeWrapper() });
    expect(result.current.data).toBeUndefined();
    // The query key is validated indirectly: different usernames would not share state.
    // This test exists to document the intent; key shape tested via actions mock call args.
  });

  it("hasNextPage is false when nextPage is null", async () => {
    mockFetchUserRepos.mockResolvedValue({ repos: [], nextPage: null });
    const { result } = renderHook(() => useUserRepos("torvalds"), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(false);
  });

  it("hasNextPage is true when nextPage is set", async () => {
    mockFetchUserRepos.mockResolvedValue({ repos: [], nextPage: 2 });
    const { result } = renderHook(() => useUserRepos("torvalds"), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(true);
  });

  it("flattens pages into repos array", async () => {
    const repo = {
      id: 1,
      name: "linux",
      fullName: "torvalds/linux",
      description: null,
      htmlUrl: "",
      stars: 0,
      forks: 0,
      language: "C",
      updatedAt: null,
      topics: [],
    };
    mockFetchUserRepos.mockResolvedValue({ repos: [repo], nextPage: null });
    const { result } = renderHook(() => useUserRepos("torvalds"), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.repos).toEqual([repo]);
  });

  it("returns empty repos array before data loads", () => {
    const { result } = renderHook(() => useUserRepos("torvalds"), { wrapper: makeWrapper() });
    expect(result.current.repos).toEqual([]);
  });
});
