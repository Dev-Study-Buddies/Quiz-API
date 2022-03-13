# Contributing

## Participation

1. Assign yourself to an open git issue
    * To suggest a new feature or bugfix:
      * Check it does not already exist first! If it doesn't then:
      * Open github issue
      * Label it accordingly
      * Discuss with project members on discord or through github
2. Create a branch with `<issue-number>-<branch-descriptor>` naming scheme [ *(see article)*](https://deepsource.io/blog/git-branch-naming-conventions/)
3. Work on assigned issue
    * Try not to go outside the scope of the git issue
      * discuss with project members if you end up having to implement new features outside of the original scope
4. Sync branch with dev
5. Create remote branch and push to that branch
6. Start the [pull request process](#pull-request=process)

## Git workflow: Issue branching

* Branches are created from issues/ tasks
* Branches have the same name of its issue id#
* One Branch per issue and one issue per branch
* see [article](https://medium.com/flexisaf/git-workflow-for-your-project-3d9dbdc5f8e2)

## Coding Style & Info

* CommonJS (require & module.exports)
* Functional (avoid OOP & classes)
* Use arrow functions where possible
* Async/ Await where possible

## Project setup

* Clone project repo
* Run `npm install`
* Copy `sample.env` and rename to `.env`

## Running project

* With Docker
  * Linux: `make docker-dev-build`
    * Non-linux: `docker-compose -f docker-compose-dev.yml build`
  * Linux: `make docker-dev-run`
    * Non-linux: `docker-compose -f docker-compose-dev.yml up`
* Without docker
  * No mongodb setup: `npm run local`
  * Mongodb is setup & `.env` is updated with new URI: `npm run dev`

## Testing

* Run all tests: `npm run test`
* Run single test file: `npm run test -i testFileName`

## Pull Request Process

1. Create branch with correct naming scheme (see [section](#how-to-participate))
2. Ensure code is working properly and passed all tests (see [section](#testing))
3. Open PR (against dev branch)
4. Code review must be completed by running the code and tests, and ensuring code meets our coding standards (see [section](#coding-style))
    * *review is not necessary if PR is related to documentation or project maintenance*
5. Upon approving PR:
    * Close the github issue that the PR for
    * Delete PR branch
    * Merge PR into `dev` branch (*just merge PR to main if its related to documenation or project maintenance*)

## Code of Conduct

*See [Contributors Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.txt)*

## Join us

We are discussing this project on [discord](https://discord.gg/R26trBfT2P)