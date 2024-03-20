export const AddTeamMemberKey = 'add_team_member';

export const AddTeamMemberMappingKeys: (keyof AddTeamMember)[] = [
    'id',
    'team_name',
    'github_handles',
];

export interface AddTeamMember {
  id?: string
  team_name?: string
  github_handles?: string
}
