import { body } from 'express-validator';

import { validateGithubHandles } from './helper/github-handles.validation.helper';

export const githubHandlesValidation = [
    body('github_handles').custom(validateGithubHandles),
];
