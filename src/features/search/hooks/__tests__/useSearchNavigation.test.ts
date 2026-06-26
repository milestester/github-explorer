import { renderHook, act } from "@testing-library/react";
import { useSearchNavigation } from "../useSearchNavigation";

const mockPush = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockUseSearchParams(),
}));

beforeEach(() => {
  mockPush.mockClear();
  mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
});

describe("useSearchNavigation", () => {
  it("pushes search param when query is provided", () => {
    const { result } = renderHook(() => useSearchNavigation({ initialHasSearch: false }));

    act(() => {
      result.current.handleSearch("torvalds");
    });

    expect(mockPush).toHaveBeenCalledWith("?search=torvalds");
  });

  it("removes search param when query is cleared", () => {
    const { result } = renderHook(() => useSearchNavigation({ initialHasSearch: true }));

    act(() => {
      result.current.handleSearch("");
    });

    expect(mockPush).toHaveBeenCalledWith("?");
  });

  it("preserves existing params when searching", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("user=torvalds"));

    const { result } = renderHook(() => useSearchNavigation({ initialHasSearch: false }));

    act(() => {
      result.current.handleSearch("octocat");
    });

    expect(mockPush).toHaveBeenCalledWith("?user=torvalds&search=octocat");
  });

  it("preserves existing params when clearing", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("user=torvalds&search=octocat"));

    const { result } = renderHook(() => useSearchNavigation({ initialHasSearch: true }));

    act(() => {
      result.current.handleSearch("");
    });

    expect(mockPush).toHaveBeenCalledWith("?user=torvalds");
  });
});
