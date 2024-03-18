import { ErrorMessages } from '../../error.messages';

export const validateGithubHandles = (values: string) => {
    if (!values) {
        throw new Error(ErrorMessages.GIT_HANDLE);
    }

    const handles = values.split(',').map(handle => handle.trim());
    const githubHandleRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    const githubHandlesMaxLength = 39;

    for (const handle of handles) {
        if (!githubHandleRegex.test(handle) || handle.length > githubHandlesMaxLength || handle.length < 1) {
            throw new Error(ErrorMessages.INVALID_GIT_HANDLE);
        }
    }

    return true;
};
