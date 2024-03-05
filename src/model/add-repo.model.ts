export const AddRepoKey = 'add_repo';

export const AddRepoMappingKeys: (keyof AddRepo)[] = [
    'id',
    'repo_name',
    'visibility',
    'description'
];

export interface AddRepo {
  id?: string;
  repo_name?: string;
  visibility?: string;
  description?: string;
}
