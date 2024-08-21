export const CollaboratorKey = 'collaborators';

export const CollaboratorMappingKeys: (keyof Collaborator)[] = [
    'id',
    'first_name',
    'last_name',
    'github_handle',
    'email_address',
    'repo_name'
];

export interface Collaborator {
  id?: string
  first_name?: string
  last_name?: string
  github_handle?: string
  email_address?: string
  repo_name?: string
}
