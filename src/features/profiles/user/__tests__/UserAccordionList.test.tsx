import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAccordionList } from "../UserAccordionList";
import type { GitHubUser } from "@/lib/github/types";

jest.mock("../UserCard", () => ({
  UserCard: ({
    user,
    isSelected,
    onClick,
  }: {
    user: GitHubUser;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button onClick={onClick} data-selected={isSelected}>
      {user.username}
    </button>
  ),
}));
jest.mock("../../repos/RepoList", () => ({
  RepoList: ({ username }: { username: string }) => <div data-testid={`repos-${username}`} />,
}));

const mockUser = (id: number): GitHubUser => ({
  id,
  username: `user-${id}`,
  avatarUrl: `https://avatars.githubusercontent.com/u/${id}`,
  htmlUrl: `https://github.com/user-${id}`,
});

const users = [mockUser(1), mockUser(2)];

describe("UserAccordionList", () => {
  it("renders all users", () => {
    render(<UserAccordionList users={users} />);
    expect(screen.getByText("user-1")).toBeInTheDocument();
    expect(screen.getByText("user-2")).toBeInTheDocument();
  });

  it("shows no repo list by default", () => {
    render(<UserAccordionList users={users} />);
    expect(screen.queryByTestId("repos-user-1")).not.toBeInTheDocument();
  });

  it("shows repo list when user is clicked", async () => {
    render(<UserAccordionList users={users} />);
    await userEvent.click(screen.getByText("user-1"));
    expect(screen.getByTestId("repos-user-1")).toBeInTheDocument();
  });

  it("closes repo list when same user is clicked again", async () => {
    render(<UserAccordionList users={users} />);
    await userEvent.click(screen.getByText("user-1"));
    await userEvent.click(screen.getByText("user-1"));
    expect(screen.queryByTestId("repos-user-1")).not.toBeInTheDocument();
  });

  it("only shows one repo list at a time", async () => {
    render(<UserAccordionList users={users} />);
    await userEvent.click(screen.getByText("user-1"));
    await userEvent.click(screen.getByText("user-2"));
    expect(screen.queryByTestId("repos-user-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("repos-user-2")).toBeInTheDocument();
  });
});
