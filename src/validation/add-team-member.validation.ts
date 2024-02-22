import { teamNameValidation } from './fields/team-name.validation';
import { githubHandleValidation } from './fields/github-handle.validation';

export const addTeamMember = [
    ...teamNameValidation, ...githubHandleValidation
];
