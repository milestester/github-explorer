import { mapUser, mapRepo } from "../githubApi.mapper";
import type { GitHubUserDto, GitHubRepoDto } from "../githubApi.dto";

const baseUserDto: GitHubUserDto = {
  login: "torvalds",
  id: 1,
  avatar_url: "https://avatars.githubusercontent.com/u/1",
  html_url: "https://github.com/torvalds",
  type: "User",
};

const baseRepoDto: GitHubRepoDto = {
  id: 100,
  name: "linux",
  full_name: "torvalds/linux",
  description: "Linux kernel source tree",
  private: false,
  html_url: "https://github.com/torvalds/linux",
  stargazers_count: 999,
  forks_count: 42,
  language: "C",
  updated_at: "2024-01-01T00:00:00Z",
  topics: ["kernel", "os"],
};

it("mapUser maps all fields correctly", () => {
  expect(mapUser(baseUserDto)).toEqual({
    login: "torvalds",
    id: 1,
    avatarUrl: "https://avatars.githubusercontent.com/u/1",
    htmlUrl: "https://github.com/torvalds",
  });
});

it("mapRepo maps all fields correctly", () => {
  expect(mapRepo(baseRepoDto)).toEqual({
    id: 100,
    name: "linux",
    fullName: "torvalds/linux",
    description: "Linux kernel source tree",
    htmlUrl: "https://github.com/torvalds/linux",
    stars: 999,
    forks: 42,
    language: "C",
    updatedAt: "2024-01-01T00:00:00Z",
    topics: ["kernel", "os"],
  });
});

it("mapRepo preserves nullable fields", () => {
  expect(
    mapRepo({ ...baseRepoDto, description: null, language: null, updated_at: null })
  ).toMatchObject({
    description: null,
    language: null,
    updatedAt: null,
  });
});
