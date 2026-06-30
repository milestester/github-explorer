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
