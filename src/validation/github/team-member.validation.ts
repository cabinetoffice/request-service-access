import { teamNameValidation } from '../fields/team-name.validation';
import { githubHandlesValidation } from '../fields/github-handles.validation';

export const teamMember = [
    ...teamNameValidation, ...githubHandlesValidation
];
