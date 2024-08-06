# Project Structure and Code Style

## Github Requests App

Github Requests App is a simple application with a few endpoints. Each endpoint represents a possible action to a Github organisation account (eg. add member to org/team, add repository to org ...).
All information submitted by the user is saved on a browser cookie which is configured to be signed by the `COOKIE_SESSION_SECRET` environment variable. The payload stored in the cookie is also protected by the `crypto` module meaning the client side data is both encrypted and signed.

User data is fetched from the session on the GET controller, which is used to populate data on the view. User data is saved into the session on the POST controller of each page.
It is important to remember that there is a mapping between the saved data on the session and the user data passed to the view for visualisation.

The compiled/transpiled project is copied into the `dist` folder, where the application can be bootstrapped by running `dist/server.js`. All static files are fetched from a CDN on AWS CloudFront service.

## Files Structure

Directory Path | Description
--- | ---
`./.github` | Github folder, includes `PULL_REQUEST_TEMPLATE.md` on how to make a pull request to the project and `dependabot.yml` configuration options for dependency updates.
`./.husky` | Add pre check script, includes `pre-commit` and `pre-push` checks
`./src` | Contains all Typescript code
`./src/app.ts` | Application entry point
`./src/server.ts` | Server configuration
`./src/config/index.ts` | Contains all the application's configurations
`./src/controller` | Business logic and handlers
`./src/middleware` | Middleware functions (Authentication, validation ...)
`./src/model` | Github Request Session and View Data Model
`./src/routes` | Paths and routes controller (Only GET and POST enabled)
`./src/service` | Interface to the API through SDK
`./src/utils` | Facade for CO services (e.g. logging) and other application utils (cookie, application data ...)
`./src/validation` | Sets of express validator middlewares for each page
`./test` | Jest Test files (`*.spec.ts`, `setup.ts`, and `*.mocks.ts`)
`./view` | Contains all the html nunjucks structure files
`./docs` | Contains documentation files
Others files | Other files related to modules dependency, CI/CD, *git, dockerization, lint, test/typescript configs …

## MVC

Each page or user interface, defined by an endpoint, is divided into three components (MVC) and as a best practice the names for the model, view and controller have, when possible, the same start name of the endpoints (e.g. for the `/confirmation` page: `confirmation.controller.ts` and `confirmation.html` files. If models were present, `confirmation.model.ts` would be present).

### Model

In the model the interfaces are defined. These are the data structures used to represent the data for a particular page. Both a mapping key and array are used to map back and forth information between the `session` data and the `nunjucks` HTML view data.

```js
// Repo Page Model
export const RepoKey = 'repos';

export const RepoMappingKeys: (keyof Repo)[] = [
    'id',
    'repo_name',
    'visibility',
    'description'
];

export interface Repo {
  id?: string;
  repo_name?: string;
  visibility?: string;
  description?: string;
}

```

For each interface, a key used to represent the object on the application data model, and the `ApplicationData` represents the object that is saved in the session, as a subfield of the session data.

```js
// Application Data model
export interface ApplicationData {
    repos?: Repo[]
    ​...​
}
```

### View

Both `Nunjucks` and `GDS` style/components are utilised. To streamline the construction of pages, common components that are utilised across the UI, which are stored in an `/includes` directory within the `views` directory. This directory contains all the useful shared chunks of HTML code. This approach ensures consistency in error messaging, input formats, and other aspects. Additionally, if specificity is required, a variable can be included using the `set` command, as demonstrated in the example below.

```js
// Nunjucks HTML inputs field for adding a team 
{% extends "layout.html" %}

{% block backLink %}
  {% include "include/back-link.html" %}
{% endblock %}

{% block pageContent %}
  <h1 class="govuk-heading-l">Add a GitHub Team</h1>

  <p class="govuk-body">
    GitHub Teams can be used to manage repository permissions and mentions for groups of members.
  </p>

  {% include "include/error-list.html" %}

  <form method="post" novalidate>

    {% include "include/inputs/team-name.html" %}

    {% set githubHandleText = "Team maintainer GitHub handle" %}
    {% include "include/inputs/github-handle.html" %}

    {% set descriptionText = "Description (optional)" %}
    {% set descriptionHint = "Explain the reason for adding this team." %}

    {% include "include/description.html" %}

    {% include "include/save-button.html" %}
    
  </form>
{% endblock %}
```

### Controller

Generally only POST and GET HTTP methods are used, and therefore GET and POST controllers are only used. The controllers ultimately have the duty to respond to the user.


```js
// Home page which fetches session data

export const get = (req: Request, res: Response, next: NextFunction) => {
    try {
        const appData: ApplicationData = getSessionData(req.session);

        return res.render(config.HOME, {
            ...appData
        });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

```

A `post` method which saves user data every time the page is submitted.

```js
// Post controller for the add-repo page which sets add-repo data to session

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const repoID = uuidv4();
        ...
        setApplicationDataKey(req.session, { ...req.body, [config.ID]: repoID }, AddRepoKey);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
      ...
    }
};
```

In the `getById` method, if data is in the session, it is passed to the views/template to be visualised to the user. Unique ids are generated when a user submits data to the `post` controller. The ids are used as a primary key to render specific requests of the same type (for example, if the user submits 3 separate Add Team requests, an id is needed to differentiate between them). Similar logic is used in the `removeById` and `postById`. See below an example of the session data structure which uses ids:

```js
Session {
  git: {
    add_team: [
      {
        team_name: 'team1',
        github_handle: 'mr maintainer1',
        description: '',
        id: '543tgr-532g-542g-1234-ddddddddd'
      },
      {
        team_name: 'team2',
        github_handle: 'miss maintainer2',
        description: '',
        id: 'a187d2ed-e364-46c2-bcb5-444444444'
      },
      {
        team_name: 'team3',
        github_handle: 'ms maintainer3',
        description: '',
        id: 'dfdfd4534-dfdf-49a0-b812-aaaaaaaaaa'
      }
    ]
  }
}
add_team: 
```

## Authentication

Authentication is a simple middleware that checks if the user has got a valid signed cookie. If not, the user is redirected to the sign in page `res.redirect(AUTH_SIGN_IN_URL);`.

```js
export const colaAuthenticationMiddleware = async ( req: Request, res: Response, next: NextFunction) => {

    const cookieSignedValue = getCookieValue(req.signedCookies, COOKIE_ID_NAME);
    const unsignedCookie = getUnsignedCookie(cookieSignedValue, COOKIE_PARSER_SECRET);

    if (validateUnsignedCookie(unsignedCookie)) {
        log.debug(`Successfully verified signature for ${COOKIE_ID_NAME}, cookie value: ${unsignedCookie}`);
    } else {
        log.error(`Failed to verify signature for ${COOKIE_ID_NAME}, cookie value: ${cookieSignedValue}, redirect to ${AUTH_SIGN_IN_URL}`);
        return res.redirect(AUTH_SIGN_IN_URL);
    }

    next();
};
```

To chain the middleware to a particular endpoint it is added to the router object like `router.METHOD(path, [callback, ...] callback)` as described [here](https://expressjs.com/en/5x/api.html#router.METHOD)

```js
// Chain middlewares for the `repo` endpoints
const repoRouter = Router();

repoRouter.get(config.GITHUB_URL + config.CREATE + config.REPO_URL, authentication, get);
repoRouter.post(config.GITHUB_URL + config.CREATE + config.REPO_URL, authentication, ...repoValidation, checkValidations, post);

repoRouter.get(config.GITHUB_URL + config.REMOVE + config.REPO_URL + config.PARAM_ID, authentication, removeById);

repoRouter.get(config.GITHUB_URL + config.UPDATE + config.REPO_URL + config.PARAM_ID, authentication, getById);
repoRouter.post(config.GITHUB_URL + config.UPDATE + config.REPO_URL + config.PARAM_ID, authentication, ...repoValidation, checkValidations, postById);

export default repoRouter;
```

## Validation

In each of the `POST` endpoints for every page, there are sets of middlewares that are used to validate each field submitted by the user. If one of the validation middlewares fail, the `validationResult` [here](https://github.com/cabinetoffice/github-requests-app/blob/c1923314f23897a809624a8ec208648cab228b4e/src/middleware/validation.middleware.ts#L7) extracts the validation errors from a request (`req` object) and formats it as an `errors` object [here](https://github.com/cabinetoffice/github-requests-app/blob/c1923314f23897a809624a8ec208648cab228b4e/src/middleware/validation.middleware.ts#L27). It is passed to the render page and visualises the correct error messages.

```js
// Middlewares validation checks for the add-team page
import { descriptionValidation } from './fields/description.validation';
import { githubHandleValidation } from './fields/github-handle.validation';
import { teamNameValidation } from './fields/team-name.validation';

export const addTeam = [
    ...teamNameValidation, ...githubHandleValidation, ...descriptionValidation
];

```

```js
// Inputs field on add-team page with the errors object 
// content file for include/description.html
{{ govukInput({
  errorMessage: errors.team_name if errors,
  label: {
    text: "Team name",
    classes: "govuk-label--m"
  },
  classes: "govuk-input--width-20",
  id: "team_name",
  name: "team_name",
  value: team_name
}) }}
```
