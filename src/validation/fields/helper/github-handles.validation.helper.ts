import { ErrorMessages } from '../../error.messages';

export const validateGithubHandles = (value: string) => {
    if (!value) {
        throw new Error(ErrorMessages.GIT_HANDLE);
    }

    const handles = value.split(',').map(handle => handle.trim());
    const githubHandleRegex = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;

    for (const handle of handles) {
        if (!githubHandleRegex.test(handle) || handle.length > 39 || handle.length < 1) {
            throw new Error(ErrorMessages.INVALID_GIT_HANDLE);
        }
    }

    return true;
};
