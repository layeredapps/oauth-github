# Documentation for OAuth-Github module

- [Documentation website](https://layeredapps.github.io)
- [Module documentation](https://layeredapps.github.io/oauth-github-module)

#### Index

- [Introduction](#introduction)
- [Import this module](#import-this-module)
- [Provided server, content and proxy handlers](#provided-server-content-and-proxy-handlers)
- [Github repository](https://github.com/layeredapps/maxmind-geoip)
- [NPM package](https://npmjs.org/layeredapps/maxmind-geoip)

# Introduction

Dashboard bundles everything a web app needs, all the "boilerplate" like signing in and changing passwords, into a parallel server so you can write a much smaller web app.

The `oath` module is a framework for using OAuth, a standardized authentication flow for allowing users to "sign in with" 3rd-party services.  

The `oauth-github` module enables signing in and registering with GitHub.

## Create OAuth application on GitHub

In your Github settings, or organization settings, navigate to the developer settings and OAuth apps.  Create an OAuth app and take note of your client id and secret, and redirect URL.

Your redirect URL should be:

    DASHBOARD_SERVER/auth/github-redirect

You will need to configure environment variables for your keys:

    GITHUB_OAUTH_CLIENTID=xxxx
    GITHUB_OAUTH_SECRET=yyyy

## Import this module

Install the module with NPM:

    $ npm install @layeredapps/oauth

Edit your `package.json` to activate the module:

    "dashboard": {
      "modules": [
        "@layeredapps/oauth-github"
      ]
    }

After adding this service, add provider modules too:

    $ npm install @layeredapps/oauth-github

Edit your `package.json` to include the scripts for provider buttons and error message templates, which injects HTML into your `signin` and `register` pages:

    "dashboard": {
      "content": [
        "@layeredapps/oauth-github/src/content/error-templates.js",
        "@layeredapps/oauth-github/src/content/register-button.js",
        "@layeredapps/oauth-github/src/content/signin-button.js"
      ]
    }
 
# Provided server, content and proxy handlers

This module comes with some convenience scripts you can add to your `package.json`:

| Type     | Script path                                                      | Description                                                                                       |
|----------|------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| content  | @layeredapps/oauth-github/src/content/register-button.js         | Adds a GitHub button to the `<div id="oauth-buttons"></div>` on the registration page.            |
| content  | @layeredapps/oauth-github/src/content/signin-button.js           | Adds a GitHub button to the `<div id="oauth-buttons"></div>` on the signin page.                  |
| content  | @layeredapps/oauth-github/src/content/signin-error-templates.js  | Adds error messages for user declining, GitHub suspension or misconfiguration to the signin page. |

## Icons

Icons are obtained via [FlatIcon](https://flaticon.com) and copyright their respective owners:

- [GitHub icon](https://www.flaticon.com/free-icon/github-sign_25657) by [Dave Gandy](https://www.flaticon.com/authors/dave-gandy)
