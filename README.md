# Apify Actor monorepo example

This repository shows how to structure a monorepo containing multiple Apify Actors,
along with shared packages used in multiple packages.

## Structure

The project is structured as a NPM workspace,
with the Actors being in the `@actors` scope and packages in the `@packages` scope.

The TypeScript Actors and packages are structured in one TypeScript project,
with project references ensuring that they are built in the correct topological order
based on their interdependencies.

To enable testing the TypeScript Actors locally
without having to rebuild them or the TypeScript packages after every code change,
`ts-node` along with the [`tsconfig-paths`](https://github.com/dividab/tsconfig-paths) loader is used.
Since `tsconfig-paths` does not play well with ESM packages,
a custom wrapper for the loader is used, defined in `module_loader.js`.

The `actors` folder contains the code of the Actors in this project.
There is one JavaScript actor and one TypeScript actor,
with their respective Dockerfiles showing how to build them on the Apify Platform correctly,
including the shared packages, but excluding the code of other actors.

The `packages` folder contains simplistic packages that are used in multiple Actors.
There is one JavaScript and one TypeScript package,
and both are written as ES modules.

The `shared` folder contains an input schema for both of the Actors,
which is referenced from the respective Actor's `.actor/actor.json` file.

## Building monorepo Actors on the Apify platform

To build Actors from a monorepo,
you have to specify the path to the correct Actor in the Git URL of the Actor on the Apify Platform.

For example, to build the TypeScript Actor from this monorepo,
you would specify this in the Actor's setup:

- Git URL: `https://github.com/apify/actor-monorepo-example`
- Branch: `main`
- Folder: `actors/typescript-actor`
