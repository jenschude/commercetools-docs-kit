<!-- vale Google.We = NO -->
<!-- vale Google.Will = NO -->
<!-- vale Google.FirstPerson = NO -->

# Contributing

Please _read_ before contributing to commercetools Documentation Kit to get familiar with the guidelines for contributing to the project.

## Core Ideas

At commercetools we want to create documentation websites that are visually and functional consistent. To do so, commercetools provides this set of tools and components that should be used across the different websites, for example a Gatsby documentation theme.

This repository contains all the necessary packages to build a documentation website. Some of them do not need to be used directly but are instead required by other packages. Let's have a deeper look.

## Folder Structure

This repository is managed as a monorepo, meaning it contains multiple (sub)packages located in the [`packages`](./packages) directory.

## Getting started

1. Clone the repository
2. Run `yarn` in the root folder

Once it's done, you can run `yarn start` or `yarn test` (`yarn test:watch`) to develop the packages.

## Developing locally

To develop locally, you can use the `websites/docs-smoke-test` application to test the changes in some of the packages.

## Rebasing and merging Pull Requests

We only allow the **Squash and merge** mode when merging a Pull Request so that:

- we have a cleaner commit history on `main` branch
- we can have automatic releases, like `canary`, that will publish a new version on each new commit in `main`

Furthermore, we also prefer to use `rebase` when keeping branches up-to-date. This is again to have a cleaner history.

## Development tools

We use a bunch of tools to help the development process and to ease maintenance.

### Linters

We use `eslint` and `stylelint` to check both the JS code and the CSS-in-JS. Linters run as a `jest-runner`, which provides a nice developer experience like jest watch mode.

To run them, execute `yarn lint`. You can also run individual linters (check the available `scripts` in the `package.json`).

### Prettier

To ensure a consistent code formatting, we use `prettier` for all different types of supported file extensions. The formatting is also checked by the ESlint plugin for prettier.

### Git hooks

We use some git hooks to enforce some conventions, powered by the `husky` package:

- `commit-msg`: it checks that the commit message adheres to the [conventional commit](https://conventionalcommits.org/)
- `pre-commit`: we use this to run `lint-staged`, which runs linters and prettier on the staged files

### GitHub labels

To help maintaining GitHub labels, we use the `@commercetools/github-labels` package that allows to manage the labels using a config file. See the package for more information about its usage.

## Dependencies

We use `yarn` to manage the dependencies in the monorepo, using the `workspace` feature of `yarn`. Furthermore, to ensure that every contributor uses the same version of `yarn`, we include the `yarn` binary in the repository and point `yarn-path` to it (see `.yarnrc`). This helps ensuring that things like `yarn.lock` is consistent.

## Dependency updates

We use the `Renovate App` to manage dependency updates. The app/bot will create Pull Requests whenever there are new versions of the dependencies used in the repository. To avoid too many Pull Requests, we have scheduled updates on Mondays only.

## Adding changesets

commercetools-docs uses [changesets](https://github.com/atlassian/changesets) to do versioning and creating changelogs.

As a contributor you need to add a changeset by running `yarn changeset`.
The command will prompt to select the packages that should be bumped, their associated semver bump types and some markdown which will be inserted into the changelogs.

When opening a Pull Request, a `changeset-bot` checks that the Pull Request contains a changeset. A changeset is **NOT required**, as things like documentation or other changes in the repository itself generally don't need a changeset.

## Releasing packages

commercetools-docs uses [changesets](https://github.com/atlassian/changesets) to do versioning and publishing a release.

A [Changesets release GitHub Action](https://github.com/changesets/action) opens a `Version Packages` Pull Request whenever there are some changesets that have not been released yet.

When the `Version Packages` Pull Request gets merged, the Changesets release GitHub Action will automatically trigger the release.

## Canary releases

On `main` branch, we automatically publish **canary** releases from CI to the `canary` distribution channel, _after_ the build runs successfully.

Canary releases are useful to test early changes that should not be released yet to `next` or `latest`. They are automatically triggered and released after a Pull Request merged into `main`.

Note that canary releases **will not create git tags and version bump commits**.
