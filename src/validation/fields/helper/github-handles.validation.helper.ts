import { ErrorMessages } from '../../error.messages';

export const validateGithubHandles = (values: string) => {
    if (!values) {
        throw new Error(ErrorMessages.GIT_HANDLE);
    }

    const handles = values.split(',').map(handle => handle.trim());
    const githubHandleRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    for (const handle of handles) {
        if (!githubHandleRegex.test(handle)) {
            throw new Error(`${handle} is an invalid GitHub handle. ${ErrorMessages.INVALID_GIT_HANDLE}`);
        }
    }

    return true;
};
