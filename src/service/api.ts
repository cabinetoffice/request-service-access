import { ApiResponse, createOAuthApiClient } from '@co-digital/api-sdk';
import { GITHUB_KEY } from '../config/index';

import { log } from '../utils/logger';

const createApiClient = () => {
    return createOAuthApiClient(GITHUB_KEY);
};

export const client = createApiClient();

export const getSha = async (repoUrl: string) => {
    const url = `${repoUrl}/git/refs/heads/main`;

    const shaResponse = await client.gitHub.getData(url) as ApiResponse<any>;
    log.info(`shaRes: ${shaResponse}`);
    return shaResponse.resource.object.sha;

};

export const createBranch = async (repoUrl: string, branchName: string, baseSha: any) => {
    const url = `${repoUrl}/git/refs`;

    const body = {
        ref: `refs/heads/${branchName}`,
        sha: baseSha
    };

    await client.gitHub.postData(url, body);
    return log.info(`branch ${branchName} created`);
};

export const createBlob = async (repoUrl: string, content: string) => {
    const blobUrl = `${repoUrl}/git/blobs`;
    const body = {
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64',
    };

    const blobSha = await client.gitHub.postData(blobUrl, body) as ApiResponse<any>;

    return blobSha.resource.sha;
};

export const createTree = async (repoUrl: string, baseTreeSha: string, path: string, blobSha: string) => {
    const treeUrl = `${repoUrl}/git/trees`;
    const body = {
        base_tree: baseTreeSha,
        tree: [
            {
                path: path,
                mode: '100644',
                type: 'blob',
                sha: blobSha,
            }
        ]
    };

    const treeSha = await client.gitHub.postData(treeUrl, body) as ApiResponse<any>;
    return treeSha.resource.sha;
};

export const createCommit = async (repoUrl: string, message: string, treeSha: string, parentSha: string) => {
    const commitUrl = `${repoUrl}/git/commits`;
    const body = {
        message: message,
        tree: treeSha,
        parents: [parentSha]
    };
    const commitSha = await client.gitHub.postData(commitUrl, body) as ApiResponse<any>;
    return commitSha.resource.sha;
};

export const updateBranchReference = (repoUrl: string, branch: string, commitSha: string) => {
    const refUrl = `${repoUrl}/git/refs/heads/${branch}`;
    const body = {
        sha: commitSha,
    };

    client.gitHub.postData(refUrl, body);
    return log.info('branch updated');
};

export const createPullRequest = async (repoUrl: string, title: string, body: string, head: string, base: string) => {
    const prUrl = `${repoUrl}/pulls`;

    const prBody = {
        title: title,
        body: body,
        head: head,
        base: base
    };

    await client.gitHub.postData(prUrl, prBody);

    return log.info(`PR created`);
};

export const createPullRequestWithFile = async (repoUrl: string, branchName: string, filePath: string, fileContent: string, commitMessage: string, prBody: string ) => {
    const baseSha = await getSha(repoUrl);

    await createBranch(repoUrl, branchName, baseSha);

    const blobSha = await createBlob(repoUrl, fileContent);

    const treeSha = await createTree(repoUrl, baseSha, filePath, blobSha);

    const commitSha = await createCommit(repoUrl, commitMessage, treeSha, baseSha);

    await updateBranchReference(repoUrl, branchName, commitSha);

    // delay added as the PR creation was not working until all prior steps were processed by github
    // in actual implementation can simply add a check that the branch exists and is upto the correct commit
    await new Promise(resolve => setTimeout(resolve, 1000));

    await createPullRequest(repoUrl, commitMessage, prBody, branchName, 'main');

    return log.info(`Completed`);
};
