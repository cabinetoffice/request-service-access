export const TeamMemberKey = 'team_members';

export const TeamMemberMappingKeys: (keyof TeamMember)[] = [
    'id',
    'team_name',
    'github_handles',
];

export interface TeamMember {
  id?: string
  team_name?: string
  github_handles?: string
}
