# TraderSquare

## Introduction

Making stock analysis accessible to everyone!

## Stack
1. Node.js/Express.js
2. React/Redux
3. Postgres
4. Enzyme/Mocha/Chai
5. Heroku, Webpack

## Git Flow Example
0. github fork
1. git pull --rebase upstream develop
2. git checkout -b <branch>
3. git pull --rebase upstream develop
4. git push origin <branch>

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
