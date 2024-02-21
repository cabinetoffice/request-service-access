# Project Structure and Code Style

## Github Request App

Github Request App is a simple app with a few endpoints, each endpoint represents a possible action to the Github account (eg. add member to org/team, remove team ...).
All information filled by the user will be saved on a browser cookie which is configured to sign the cookie with the `COOKIE_SESSION_SECRET` environment variable. The payload stored in the cookie is also protected by the `crypto` module meaning the client side data is both encrypted and signed.

Generally we will fetch information from the session, on the GET controller, to be used to populate data on the view. Instead the saving of user data into the session is done on the POST controller of each page.
It is important to remember that there is a mapping between the saved data on the session and the user data passed to the view for visualisation.

The compiled/transpiled project is copied into the dist folder used later to bootstrap the application from `dist/server.js`. All static files will be fetched from a CDN on AWS CloudFront service.

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

Each page or user interface, defined by an endpoint, is divided into three components (MVC) and as a best practice the names for the model, view and controller have, when possible, the same start name of the endpoints (e.g. for the `/confirmation` page we have the: `confirmation.controller.ts` and `confirmation.html` files. If models were present, we would have `confirmation.model.ts`)

### Model

In the model we define the interface, the data structure used to represent the data for that particular page and an array used to map back and forth information between the `session` data and the `nunjucks` html view data.

```js
// Remove Member Page Model
export const RemoveMemberKey = "remove-member";

export const RemoveMemberMappedKeys: (keyof RemoveMember)[] = ["github_handle", "description"];

export interface RemoveMember {
    github_handle?: string
    description?: string
}
```

For each interface we have a key used to represent the object on the application data model, and the `ApplicationData` represents the object that will be saved in the session, as a subfield of our session data.

```js
// Github Request Application Data model
export interface ApplicationData {
    remove_member?: RemoveMember;
    ​...​
}
```

### View

We utilise both `Nunjucks` and `GDS` style/components. To streamline the construction of pages, we employ common components that are utilised across the UI, which are stored in an includes directory within the `view` directory. This directory contains all the useful shared chunks of HTML code. This approach ensures consistency in error messaging, input formats, and other aspects.

The data value is passed by the `GET` controller using the `res.render(templateUrl, {...data})` method. If the value is not set, the input field will remain empty. Additionally, if specificity is required, we can include a variable using the `set` command, as demonstrated in the example below.

```js
// Nunjucks HTML inputs field for removing a github member 
{% extends "layout.html" %}

{% block beforeContent %}
  {% include "include/back-link.html" %}
{% endblock %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      ...
      {% include "include/error-list.html" %}

      <form method="post">

        {% include "include/github-handle.html" %}

        {% set descriptionText = "Description (optional)" %}
        {% set descriptionHint = "Include a description on why this user is getting removed." %}

        {% include "include/description.html" %}

        {% include "include/save-button.html" %}

      </form>
    </div>
  </div>
{% endblock %}
```

### Controller

Generally only POST and GET http methods are allowed, and therefore we will have mainly just the get and post controllers, and it is literally the last successful middleware of the chain that has the duty to respond to the user.
In the `get` method we fetch possible data and pass it to the view/template to be visualized to the user

```js
// Github Request for the Remove Member page
export const get = (req: Request, res: Response, next: NextFunction) => {
  try {
    ...
    const appData: ApplicationData = getSessionData(req.session);
    const removeMember = appData[RemoveMemberKey];

    return res.render(config.REMOVE_MEMBER, {
      ...removeMember,
      ...
    });
  } catch (error) {
    ...
  }
};

```

and in the `post` method we save the user data every time that a page is submitted.

```js
// Post controller for the Remove Member page
export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    ...
    const data = mapData(req.body, RemoveMemberKeys);
    setSessionData(req.session, data, RemoveMemberKey);
    ...

    return res.redirect(config.HOME);
  } catch (error) {
    ...
  }
};
```

## Authentication

Authentication is a simple middleware that checks if the user has got a valid signed cookie, otherwise it will be redirected to sign in page `res.redirect(AUTH_SIGN_IN_URL);`.

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

To chain the middleware to the particular endpoint we add it to the router object like `router.METHOD(path, [callback, ...] callback)` as described [here](https://expressjs.com/en/5x/api.html#router.METHOD)

```js
// Chain middlewares for the `remove-member` endpoints
const removeMemberRouter = Router();

removeMemberRouter.get(config.REMOVE_MEMBER_URL, authentication, get);

removeMemberRouter.post(config.REMOVE_MEMBER_URL, authentication, ...removeMember, checkValidations, post);

export default removeMemberRouter;
```

## Validation

In each `POST` endpoints for every page we have a sets of middlewares used to validate each fields submitted by the user, if one of the validation middlewares fails the `validationResult` [here](https://github.com/cabinetoffice/github-requests-app/blob/c1923314f23897a809624a8ec208648cab228b4e/src/middleware/validation.middleware.ts#L7) will extracts the validation errors from a request (`req` object) and it will be formatted as an `errors` object [here](https://github.com/cabinetoffice/github-requests-app/blob/c1923314f23897a809624a8ec208648cab228b4e/src/middleware/validation.middleware.ts#L27) and it will be passed to the render page for the correct error visualisation.

```js
// Middlewares validation checks for the remove-member page
import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';

export const removeMember = [
    body('github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.GIT_HANDLE),
    ...descriptionValidation
];
```

```js
// Inputs field on remove-member page with the errors object 
// content file for include/description.html
  {{ govukTextarea({
    errorMessage: errors.description if errors,
    value: description,
    name: "description",
    id: "description",
    label: {
      text: descriptionText,
      classes: "govuk-label--m",
      isPageHeading: true
    },
    hint: {
      text: descriptionHint
    }
  }) }}
```
