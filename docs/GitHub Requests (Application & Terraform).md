# GitHub Requests (Application & Terraform)

**GitHub Requests Application** is a key component designed to handle GitHub requests in a secure and consistent manner by incorporating automation with Terraform (repository [here](https://github.com/cabinetoffice/github-requests-terraform)) and implementing security access through the COLA Identity Provider.
For example, when a new member wishes to add their GitHub account to a team, they submit an issue through this app. The IDP team verifies the issues, applies changes, and merges the Pull Request to the main branch. On the next Terraform run, the changes propagate to GitHub, granting access. This entire process occurs with complete visibility within the department, ensuring consistency, instead of relying on a single user to make changes through GitHub's web interface.

## Workflow

1. User makes a request through the GitHub application.
2. After authentication with COLA, user's request starts creating the data object.
3. The user fills in all the details and submits the object from the `Check Your Requests` page, triggering:
    1. Terraform Repository: An issue is created.
    2. DynamoDB: User information is saved.
    3. Email Service: An email is sent to the user to confirm the information sent.
4. Platform team assesses the issue in the Terraform repository.
    1. Upon readiness, a plan and apply are triggered.
    2. DynamoDB database is accessed for user information if needed (e.g., to send email to user with expired contract).
5. Notify sends confirmation or any updates to the user.

## Overview and Design

The GitHub Requests Application is a Node.js-based web application that provides a simple interface. Internal users (members of the Cognito user pool) fill in forms with requested details. When a request is submitted, an issue is created on the dedicated terraform repository, and an email is sent to the user from our `github-request.idp` email address. The email includes a message containing the user's filled-in information.

The issue is then reviewed by the team, and further comments may be requested if necessary. Approval must be granted by two members of the team to avoid misconfigurations.

### Sending an Email

The Node.js app will send the email with Amazon SES, and you can find the implementation details [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html#ses-examples-sendmail), in particular we will create an object to pass the parameter values that define the email to be sent, including sender and receiver addresses, subject, and email body in plain text (with optional HTML).

### Github Issue

The issue will be created by using the CO `@co-digital/api-sdk` module. It has already been tested locally with the following snippets (eg [here](https://github.com/Mouhajer-CO/git-api-calls/blob/14f7bd33e9ac579fead0b2003c35946a5b0cacf7/src/utils.ts#L43)):

```js
export const createIssue = async (title: string, description: string) => {
    try {
        const url = `<https://api.github.com/repos/${OWNER}/${REPOS}/issues`;>
        const body = { title, body: description, assignees: [ASSIGNEE], labels: [LABEL] };

        return await fetchCall(url, body);
    } catch (error: any) {
        console.error('Error:', error);
    }
}
```

### Terraform Code

We will utilize Terraform and the GitHub provider to create resources and invite users to the GitHub organization by defining separate JSON files. Possible implementation details can be found [here](https://developer.hashicorp.com/terraform/tutorials/it-saas/github-user-teams). We will use JSON file data with the following function to retrieve information: `jsondecode(file("${path.module}/teams.json"))`. We could use an S3 bucket and push members/teams/repos data before terraform apply.

Initially, we need to use the `terraform import` command to import existing infrastructure into terraform, utilizing JSON files for members, teams, repositories, members per team, and so on. This configuration scales better and enables the team to follow best practices safely, consistently, and efficiently.

### Set up

- Import repos, teams and members details through the api sdk node project
- Set `.tf` configuration file for your organization as json files on datasets folder
- Run basic commands `terraform init`, `terraform fmt` and `terraform validate`
- Set Resources configurations in the root module, it will be removed later after state file generated when resources imported.

```t
    resource "github_repository" "terraform-modules" {
        # (resource arguments)
    }
```

- Import the actual repository using terraform import github_repository.your-repo your-repo
- Run terraform plan to ensure that your configuration matches what is on GitHub, or change the configuration until it matches.
- Run terraform apply.
- Remove ownership to members not part of terraform platform team (at least five people)

## Benefits

- **Programmatic Approach**: Implementation of a systematic and automated process.
- **Authorized Users**: All users are part of defined Cognito user pools, ensuring authorized access.
- **Detailed Information**: Comprehensive information from required UI inputs (eg. distinguishing between long and short-term users).
- **Least Privilege Access to GitHub UI**: Minimized access in the GitHub UI to maintain security (limiting OWNER roles to at least two members, no more then five).
- **Decreased Risk of Errors**: Reduction in errors compared to manual UI interactions, minimizing the potential for mistakes.
- **Increased Visibility**: All changes are reviewed and tracked in version control, involving at least two team members.
- **Increased Consistency**: Uniform application of changes across all repositories, addressing issues such as the absence of branch protection and team maintainers.
- **Single Source of Truth**: Changes are exclusively applied through Terraform, eliminating the need for manual UI alterations.

## Possible issues

- The GitHub API appears to have slow performance, and the terraform apply process can take 30 minutes or more for large organizations, as mentioned in this [issue](https://github.com/integrations/terraform-provider-github/issues/567). To address this, we could consider using a Node.js script to fetch repository data ahead of time to optimize terraform timing.

- How can we ensure that the user pool contains only the required users? All internal members are allowed, and there must be at least one maintainer per team, as well as per repository. External team, contractor, or any other outsourcing company have to be part of the Cognito Users pool, and they need to request access ahead of time. Update to new entry wiki page has to be done.

- The Terraform configuration serves as the single source of truth and policy for most of Github requests. No manual changes should be made to prevent configuration inconsistencies. Owners have to (and will) be reduced.

- To reduce seats, maintainers for all users need to be identified.

- Importing existing infrastructure might be time-consuming, especially if we need to remove unused teams, members, or repositories, and the terraform apply process must be carefully defined the first time to avoid issues (backup in place?).
