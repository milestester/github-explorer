import { githubApi } from "@/lib/github/githubApi";
import { GithubApiError } from "@/lib/github/githubApi.error";
import { Text } from "@/components/Typography";
import { UserCard } from "./UserCard";

interface Props {
  query: string;
}

export async function UserList({ query }: Props) {
  let users;
  try {
    users = await githubApi.searchUsers(query);
  } catch (error) {
    const message =
      error instanceof GithubApiError && error.kind === "rate_limit"
        ? "GitHub API rate limit reached. Try again in a moment."
        : "Something went wrong fetching results. Try again in a moment.";
    return <Text variant="muted">{message}</Text>;
  }

  if (users.length === 0) {
    return <Text variant="muted">No users found for &ldquo;{query}&rdquo;.</Text>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}
