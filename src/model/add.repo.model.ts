export const AddRepoKey = 'add-repo';

export const AddRepoMappingKeys: (keyof AddRepo)[] = ['repo_name', 'visibility', 'description'];

export interface AddRepo {
  repo_name?: string;
  visibility?: string;
  description?: string;
}
