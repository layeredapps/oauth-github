# Documentation for OAuth-Github module

#### Index

- [Introduction](#introduction)
- [Import this module](#import-this-module)
- [Github repository](https://github.com/layeredapps/maxmind-geoip)
- [NPM package](https://npmjs.org/layeredapps/maxmind-geoip)

# Introduction

Dashboard bundles everything a web app needs, all the "boilerplate" like signing in and changing passwords, into a parallel server so you can write a much smaller web app.

[OAuth](https://www.maxmind.com/en/home) provide authentication options for websites using the Oauth standard, so users can "sign in with" GitHub and other compatible services rather than by username/password.

[OAuth-Github] enables signing in and registering with GitHub.

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
        "@layeredapps/oauth"
      ],
      "content": [
        "@layeredapps/oauth/src/content/register-buttons.js",
        "@layeredapps/oauth/src/content/signin-buttons.js"
      ]
    }

After adding this service, add provider modules too:

    $ npm install @layeredapps/oauth-github

Edit your `package.json` to including the provider buttons:

    "dashboard": {
      "modules": [
        "@layeredapps/oauth",
        "@layeredapps/oauth-github"
      ],
      "content": [
        "@layeredapps/oauth/src/content/register-buttons.js",
        "@layeredapps/oauth/src/content/signin-buttons.js",
        "@layeredapps/oauth-github/src/content/register-button.js"
        "@layeredapps/oauth-github/src/content/signin-button.js"
      ]
    }
    
