export const RepoKey = 'repos';

export const RepoMappingKeys: (keyof Repo)[] = [
    'id',
    'repo_name',
    'visibility',
    'description'
];

export interface Repo {
  id?: string;
  repo_name?: string;
  visibility?: string;
  description?: string;
}
