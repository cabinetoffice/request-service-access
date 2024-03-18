import { body } from 'express-validator';

import { validateGithubHandles } from './helper/github-handles.validation.helper';

export const githubHandleValidation = [
    body('github_handle').custom(validateGithubHandles),
];
