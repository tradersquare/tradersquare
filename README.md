# TraderSquare
Your one-stop shop for quick stock tips and stock comparison based on professional investment strategies.
Check out the app at tradersquare.io

## Introduction
When it comes to investment strategies for the everyday user, it can quickly become very cumbersome to cut
through the noise. Often, you need an investment advisor with years of experience, who will end up taking
a hefty cut of your investment. For those more financially savvy, very complicated, custom excel spread-
sheets become the norm to assess information based on real-time data.

We've created a service which simplifies certain aspects of the process. TraderSquare gives the user the
functionality to filter stocks based on their own preferences, and order stocks based on different financial
criterea, all without even logging in. Currently, these two services are limited to stocks in the S&P 500, but
users can also find current financial data for any stock provided by the Intrinio API and store that information
in their TraderSquare account.

##Team
1. Angelina May
2. Cindy Sun
3. Akul Aggarwal
4. Chris Battenfield

## Stack
1. Node.js/Express.js
1. React/Redux/React-Router
1. Postgres
1. Heroku, Webpack
1. Firebase Auth

## Git Workflow Example
0. github fork
1. git pull --rebase upstream develop
2. git checkout -b <branch>
3. git pull --rebase upstream develop
4. git push origin -branch -f
5. git push origin <branch>


##Git Commit Message Template
Commit Message Template - [type](scope): subject/description

**Allowed type values:**

Type       |  Description
-----------|----------------------------------------------------------------------
feat       | New feature for the user, not a new feature for build script
bug-fix    | Bug fix for the user, not a fix to a build script
docs       | Changes to the documentation
style      | Formatting, styling, refactoring code for efficiency purposes, etc; 
test       | Adding missing tests, refactoring tests; no production code change
chore      | Updating compiler tasks etc; no production code change
deploy     | Testing or updating deployment configuration

**Allowed scope values:**

Scope      |  Description
-----------|----------------------------------------------------------------------
init       |  Package.json, Webpack related, node modules, versioning, bower, etc.
client     |  Front end, user interface
server     |  Back end, server endpoints
merge      |  Resolution of merge conflicts
db         |  Database files
etc        |  Others that may not belong in the above categories

**Sample commit messages:**

git commit -m "[feature](client): add new filter view"

git commit -m "[bug-fix](server): server connecting to heroku correctly"

git commit -m "[docs](init): Add documentation to multiple functions"
