export const AddTeamKey = 'add-team';

export const AddTeamMappingKeys: (keyof AddTeam)[] = ['team_name', 'github_handle', 'description'];

export interface AddTeam {
  team_name?: string;
  github_handle?: string;
  description?: string;
}
