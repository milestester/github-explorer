"use client";

import { useState } from "react";
import type { GitHubUser } from "@/lib/github/types";
import { UserCard } from "./UserCard";
import { RepoList } from "../repos/RepoList";

interface Props {
  users: GitHubUser[];
}

export function UserAccordionList({ users }: Props) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const toggle = (username: string) =>
    setSelectedUser((prev) => (prev === username ? null : username));

  return (
    <ul className="flex flex-col gap-3">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard
            user={user}
            isSelected={user.username === selectedUser}
            onClick={() => toggle(user.username)}
          />
          {user.username === selectedUser && (
            <div className="mt-3">
              <RepoList username={user.username} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
