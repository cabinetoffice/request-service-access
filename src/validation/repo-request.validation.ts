import { descriptionValidation } from './fields/description.validation';
import { repoNameValidation } from './fields/repo-name.validation';

export const repoRequest = [
    ...repoNameValidation, ...descriptionValidation
];
