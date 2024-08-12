export const TeamKey = 'teams';

export const TeamMappingKeys: (keyof Team)[] = [
    'id',
    'team_name',
    'github_handle',
    'description'
];

export interface Team {
  id?: string;
  team_name?: string;
  github_handle?: string;
  description?: string;
}
