export const MemberKey = 'member';

export const MemberMappingKeys: (keyof Member)[] = [
    'id',
    'first_name',
    'last_name',
    'github_handle',
    'email_address',
    'contract_end_date',
    'description'
];

export interface Member {
  id?: string
  first_name?: string
  last_name?: string
  github_handle?: string
  email_address?: string
  contract_end_date?: string
  description?: string
}
