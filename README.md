# Writing new code

To ensure our team remains organised, we self enforce the following process:

First create a new JiraTicket in the active sprint describing what you would like to do.

This ticket will have an id of “IT-\*”. Create a branch on the repository with the same id.

All code relevant to this issue should be written in this branch.

Create a PR with the naming syntax: “IT-\*: [Name of JiraTicket]” and request the review of an appropriate team member.

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

Note all functionality is linked together and can be accessed by navigating the webpage clicking links.

## View the application

Visit https://greatreads.azurewebsites.net/ to view the application - Recommend.

To test locally - Not recommended, view the readme for more information.

Clone the git repository

Run the following commands

npm install
npm run build
npm run dev

Note in this release we have allowed access to the database from all IP addresses so any user with the username and password can run the application locally.

## Logging in / Registering

…/authentication

From here to register an account enter a username and password. Click register and this will create an account.

You can then in future login with these account details.

../authentication/login for login

../authentication/register to register

../sign-out to log out of an account.

## Viewing a book - Only while logged in.

To search for a book, change the dropdown on the search bar to book/author/genre and search.

…/books/[googleBooksID] eg. “tPxdHRmXsiMC” (must be logged in)

## Notes and reviews

Go to view a book as in the above dot-point and all the entering a review functionality is now working.

## Viewing profile.

To search for a user, change the dropdown on the search bar to user and search and then click on the profile

../profile/[userID]

## Viewing Library and Bookshelf

Click “My Library”

Click on “View All” to see a list of all bookshelves

Click on a bookshelf to open it

Click on a notes collection to open the page for the book where the collection is written

Adding to library and bookshelf.

Click on a book and click “save book” following that save to whatever library you would like.

## Creating a new bookshelf.

Click “My Library” → “View All” → “New Bookshelf”

## View your dashboard at the home page

## Update your details (profile pic, name, password, bio, etc) in the settings page

Hover over user icon in top right of nav bar → select ‘Settings’
