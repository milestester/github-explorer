export interface GitHubUserDto {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GitHubRepoDto {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string | null;
  topics: string[];
}

export interface GitHubSearchResponseDto {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUserDto[];
}
