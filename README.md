# GitHub Requests App

![Static Badge](https://img.shields.io/badge/test_coverage-%E2%89%A595%25-green)

The GitHub request application is a tool designed to streamline and automate the process of managing and tracking request for GitHub. This includes the adding, removal or editing of members. Further documentation can be found [here](./docs/).

## Overview

The GitHub Requests Application is a Node.js-based web application that provides a simple interface. Internal users (members of the Cognito user pool) fill in forms with requested details. When a request is submitted, an issue is created on the dedicated terraform repository, and an email is sent to the user from our `github-request.idp` email address. The email includes a message containing the user's filled-in information.

The issue is then reviewed by the team, and further comments may be requested if necessary. Approval must be granted by two members of the team to avoid misconfigurations.

## Frontend Technologies and Utils

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [NunJucks](https://mozilla.github.io/nunjucks)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [Jest](https://jestjs.io)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/downloads)
- [Terraform](https://www.terraform.io/)
- [AWS](https://aws.amazon.com/)

### Config variables

Key             |  Description               | Example Value
----------------|--------------------------- |-------------------------
PATH_SSL_PRIVATE_KEY | Path to ssl private key | `./infrastructure/host/test.key`
PATH_SSL_CERTIFICATE | Path to ssl certificate | `./infrastructure/host/test.cert`
BASE_URL | Base application URL | `http://localhost:3000` (dev mode)
NODE_ENV | Node environment | `development` (or `production`)
PORT | Server port number | `3000`
CDN_HOST | CDN host | `cdn domain`
USER_POOL_ID | ID of the user pool in Amazon Cognito | `secret`
USER_POOL_CLIENT_ID | Client ID of an app registered with the user pool in Amazon Cognito | `secret`
AUTH_SIGN_IN_URL | Authentication sign in URL | `https://cola.service.cabinetoffice.gov.uk/v2/<YOUR_SERVICE>/login`
COOKIE_ID_NAME | The name of the cookie | `github-requests`
COOKIE_PARSER_SECRET | Secret used in validating/calculating the cookie signature | `secret`
COOKIE_SESSION_SECRET | Secret key for signing the session cookie | `secret`
LANDING_PAGE_URL | Github Requests landing Page | `/home/`
GITHUB_OWNER | Github organization name | `cabinetoffice`
GITHUB_TERRAFORM_REPO | Github private repo with terraform configurations with members, repos and teams files | `github-requests-terraform`
GITHUB_REPO_ISSUE_ASSIGNEE | Github team responsible to solve issues and update configs files | (eg. `IDP_TEAM`)
GITHUB_REPO_ISSUE_LABEL | Github label to categorize the related issues | (eg. `github-requests-app`)
LOG_LEVEL | Logging levels | `info`
HUMAN | Formatting messages form (default JSON) | `true` (Enable human formatting for log messages)

## Launching the web-app

### Prerequisites

1. Install [NodeJS V20.8](https://nodejs.org/en)
2. Install [Docker](https://www.docker.com/get-started)

### Running local development environment with Docker

Docker is used to run the application in **development** mode, with tooling setup to detect changes in local `src` directory and reload the container's node server. Ensure that `NODE_ENV=development` is set in the `.env` file.

### Building the Docker Image

1. Create a copy of the `.env.example` file and name it `.env`:
Then run:

```sh
make docker-build
make docker-up
```

This will then download the necessary dependencies, build the Docker image, and start the application. You will be able to access it on [localhost:3000](localhost:3000).

## ESlint

We use ESlint as both a formatter and code quality assurance. Eslint can also be setup to format on save using a VScode extension:

1. Install the [ESlint VScode extenstion](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

2. Open your user settings (JSON) inside VScode and add the following:

    ```js
    "editor.formatOnSave": true, 
    "editor.codeActionsOnSave": { "source.fixAll.eslint": true }
    ```

3. Reload VScode.

## Recommendations

1. Use the [Visual Studio Code](https://code.visualstudio.com/) IDE for development.
2. Use the preformatted `PULL_REQUEST_TEMPLATE` by adding meaningful description
3. Make sure test coverage is above `95%`
4. Do not disable husky pre checks locally
5. Use MVC pattern when adding a new page/endpoint, including validation and authentication. Example can be found on the following doc description [here](./docs/Project%20Structure%20and%20Code%20Style.md)
6. **Happy coding**

## License

This code is open source software licensed under the [MIT License]("https://opensource.org/licenses/MIT").
