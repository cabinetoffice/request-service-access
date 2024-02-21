import { descriptionValidation } from './fields/description.validation';
import { githubHandleValidation } from './fields/github-handle.validation';

export const removeMember = [
    ...githubHandleValidation, ...descriptionValidation
];
