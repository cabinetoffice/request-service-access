export const AddTeamKey = 'add_team';

export const AddTeamMappingKeys: (keyof AddTeam)[] = [
    'id',
    'team_name',
    'github_handle',
    'description'
];

export interface AddTeam {
  id?: string;
  team_name?: string;
  github_handle?: string;
  description?: string;
}
