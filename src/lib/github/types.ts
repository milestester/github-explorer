export interface GitHubUser {
  login: string;
  id: number;
  avatarUrl: string;
  htmlUrl: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string | null;
  topics: string[];
}
