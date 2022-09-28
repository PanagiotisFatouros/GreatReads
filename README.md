# Writing new code

To ensure our team remains organised, we self enforce the following process:

First create a new JiraTicket in the active sprint describing what you would like to do.

This ticket will have an id of “IT-*”. Create a branch on the repository with the same id.

All code relevant to this issue should be written in this branch.

Create a PR with the naming syntax: “IT-*: [Name of JiraTicket]” and request the review of an appropriate team member.

Ensure that there are no code-style warnings and all checks are passed.

Squash and Merge into the main branch. It will then automatically deploy to Azure, please ensure this deployment is complete, you can see it’s status in the GithubActions section of our repository.

# Running the application locally

First clone the repository.

Then run the following commands:

npm install

npm run build

npm run dev or npm run test_dev

# Database connection

Currently the database is set so any IP address can access it. This will be changed in future. But it allows anyone to run the application locally.

To connect directly to the database (eg in the terminal or MySQL workbench), first request the help of one of the core development team members to be added as a user to the database resource.

Note team members will not add you as an owner and will only grant the permission you require.

Following this you can either click “connect” on the overview page to be granted a terminal session once you enter the password or following instructions here to connect another way. 

# Running tests

Note please ensure you are not running the code at this point

npm run test // Runs only tests and returns their output

npm run coverage // Runs tests and checks code coverage, currently broken

# Coding Style

npm run format // Optional: Fixes any problems it can automatically.

npm run lint // Does the check except for files which are not considered.

# IPV4 to IPV6 fix

Our system uses vite to build to a node application which unfortunately generates code for an IPv4 server. To fix this after building we run the command below (must be run in a linux terminal) which converts the server to an IPv6 connection.

If you are building on windows, run npm run build then go to a linux terminal and run the below.

npm run ipv6_fix // Runs the below command

sed -i "s/0.0.0.0/::/" ./build/index.js

# Functionality Available:

## View the application

Visit https://greatreads.azurewebsites.net/ to view the application

## Logging in / Registering (minimal fields: will be improved)

…/authentication

From here to register an account enter a username and password. Click register and this will create an account.

You can then login with these account details.

../sign-out to log out of an account.

log in test: you can log in with username/password both empty as this is set as a test user.

## Viewing a book, given a Google Books ID (connected to Google Books API)

…/books/[googleBooksID] eg. “tPxdHRmXsiMC” (must be logged in)

## Front end for notes and reviews (not connected to database)

## Viewing dummy profile (not connected to database)