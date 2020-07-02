
export interface Repo {
  _id: string;
  name: string;
  repo: string;
  owner: string;
  createdAt: number;
  updatedAt: number;
}

export interface GetRepos {
  repos: Repo[];
}

export interface CreateRepoInput {
  name: string;
  repo: string;
  owner: string;
}