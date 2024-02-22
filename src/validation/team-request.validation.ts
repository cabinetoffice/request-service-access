import { descriptionValidation } from './fields/description.validation';
import { teamNameValidation } from './fields/team-name.validation';

export const teamRequest = [
    ...teamNameValidation, ...descriptionValidation,
];
