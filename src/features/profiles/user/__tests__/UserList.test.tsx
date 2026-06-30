import { render, screen } from "@testing-library/react";
import { UserList } from "../UserList";
import { useUserSearch, type UserSearchResult } from "../hooks/useUserSearch";
import type { GitHubUser } from "@/lib/github/types";

jest.mock("../hooks/useUserSearch");
jest.mock("../UserAccordionList", () => ({
  UserAccordionList: ({ users }: { users: GitHubUser[] }) => (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.username}</li>
      ))}
    </ul>
  ),
}));
jest.mock("../UserListSkeleton", () => ({
  UserListSkeleton: () => <div data-testid="skeleton" />,
}));

const mockUseUserSearch = jest.mocked(useUserSearch);

function mockQuery(overrides: Partial<UserSearchResult>): UserSearchResult {
  return {
    searchQuery: "torvalds",
    data: undefined,
    isLoading: false,
    isError: false,
    isRateLimit: false,
    ...overrides,
  } as unknown as UserSearchResult;
}

const mockUser = (id: number): GitHubUser => ({
  id,
  username: `user-${id}`,
  avatarUrl: `https://avatars.githubusercontent.com/u/${id}`,
  htmlUrl: `https://github.com/user-${id}`,
});

describe("UserList", () => {
  it("shows skeleton while loading", () => {
    mockUseUserSearch.mockReturnValue(mockQuery({ isLoading: true }));
    render(<UserList />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows generic error when no users and errored", () => {
    mockUseUserSearch.mockReturnValue(mockQuery({ isError: true }));
    render(<UserList />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows rate limit error when no users and rate limited", () => {
    mockUseUserSearch.mockReturnValue(mockQuery({ isError: true, isRateLimit: true }));
    render(<UserList />);
    expect(screen.getByText(/github rate limit reached/i)).toBeInTheDocument();
  });

  it("shows empty state when no users and no error", () => {
    mockUseUserSearch.mockReturnValue(mockQuery({ data: [] }));
    render(<UserList />);
    expect(screen.getByText(/no users found for/i)).toBeInTheDocument();
  });

  it("shows cached results banner and users on error with data", () => {
    mockUseUserSearch.mockReturnValue(mockQuery({ isError: true, data: [mockUser(1)] }));
    render(<UserList />);
    expect(screen.getByText(/showing cached results/i)).toBeInTheDocument();
    expect(screen.getByText("user-1")).toBeInTheDocument();
  });

  it("renders users without banner when successful", () => {
    mockUseUserSearch.mockReturnValue(mockQuery({ data: [mockUser(1), mockUser(2)] }));
    render(<UserList />);
    expect(screen.getByText("user-1")).toBeInTheDocument();
    expect(screen.getByText("user-2")).toBeInTheDocument();
    expect(screen.queryByText(/showing cached results/i)).not.toBeInTheDocument();
  });
});
