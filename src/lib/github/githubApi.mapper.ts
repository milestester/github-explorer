import type { GitHubUser, GitHubRepo } from "./types";
import type { GitHubUserDto, GitHubRepoDto } from "./githubApi.dto";

export function mapUser(dto: GitHubUserDto): GitHubUser {
  return {
    login: dto.login,
    id: dto.id,
    avatarUrl: dto.avatar_url,
    htmlUrl: dto.html_url,
  };
}

export function mapRepo(dto: GitHubRepoDto): GitHubRepo {
  return {
    id: dto.id,
    name: dto.name,
    fullName: dto.full_name,
    description: dto.description,
    htmlUrl: dto.html_url,
    stars: dto.stargazers_count,
    forks: dto.forks_count,
    language: dto.language,
    updatedAt: dto.updated_at,
    topics: dto.topics,
  };
}
