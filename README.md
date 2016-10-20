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

## Stack
1. Node.js/Express.js
2. React/Redux/React-Router
3. Postgres
4. Enzyme/Mocha/Chai
5. Heroku, Webpack
6. Firebase Auth

## Git Flow Example
0. github fork
1. git pull --rebase upstream develop
2. git checkout -b <branch>
3. git pull --rebase upstream develop
4. git push origin -branch -f
5. git push origin <branch>

## Git Commit Messages

<type>(<scope>): <subject>

Allowed <type> values:
feature -(new feature for the user, not a new feature for build script)
bug-fix - (bug fix for the user, not a fix to a build script)
docs - (changes to the documentation)
style - (formatting, missing semi colons, etc; no production code change)
refactor - (refactoring production code, eg. renaming a variable)
test - (adding missing tests, refactoring tests; no production code change)
chore - (updating grunt tasks etc; no production code change)

Example <scope> values:
init - anything webpack related, npm, versioning, bower, etc.
client - frontend/react
server - backend/express/node
db - db/postgres
merge - resolving merge conflicts
etc. - anything else that doesn't belong in above

Example commit messages:
git commit -m "[feature](client): Add new signup page"
git commit -m "[bug-fix](server): Server connecting to heroku correctly"
git commit -m "[docs](init): Add documentation to multiple functions"

## DocBlockr Documentation Formatting

/**
 * [description]
 * @param  {Array}  state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 * RefUrl  {url}           [description]
 * API     {params}        [description]
 **/

[description] header should include --
-Description for Require/Import statements BEFORE the statement
-Backend Side - Description of where we are sending the information and using the information (identify file)
-Client Side - Description of where we the GET/POST request is happening on the server side (identify file)
-Libraries - Description of what built in methods are doing under the hood. RefUrl to specific place in documentation.
