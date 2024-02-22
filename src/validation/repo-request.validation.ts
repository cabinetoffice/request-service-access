import { descriptionValidationNotOptional } from './fields/description-not-optional.validation';
import { repoNameValidation } from './fields/repo-name.validation';

export const repoRequest = [
    ...repoNameValidation, ...descriptionValidationNotOptional
];
