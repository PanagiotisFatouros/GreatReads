# GreatReads

GreatReads is a social book archiving web application, with the following functionalities:

1. Find and save your favourite books
2. Write reviews on any books
3. Write notes on any book, and organize them by page
4. Personalize your own profile, and view others

## Viewing the application

Visit https://greatreads.azurewebsites.net/ to view the application

To view locally:

1. Clone the git repository

Run the following commands:

2. npm install
3. npm run build
4. npm run dev | npm run test_dev
# Database connection
Our application uses prisma to assist with our database usage. So we have to generate a prisma schema. To do this we run the following while building:
    
    npm run generate_prisma

To connect directly to the database (eg in the terminal or MySQL workbench), first request the help of one of the core development team members to be added as a user to the database resource.

Following this you can either click “connect” on the overview page to be granted a terminal session once you enter the password or following instructions here to connect another way.

Note: team members will not add you as an owner and will only grant the permission you require.

# Running tests
Ensure the application is not running, then run the following command:

    npm run test

# Coding Style
Please ensure you follow our coding style.
To check code adherence to style and to automatically format whatever is possible, run the following:
    
    npm run lint
    npm run format

# IPV4 to IPV6 fix

Our system uses vite to build to a node application which unfortunately generates code for an IPv4 server. To fix this after building we run the command below (must be run in a linux terminal) which converts the server to an IPv6 connection.
Note this fix is not required to run the build locally and uses a linux command, it is required in the deployed environment, so you do not need to do this.

If you are building on windows and would like to fix this, run 

    npm run build 

then go to a linux terminal and run:

    npm run ipv6_fix (Runs the below command)

    sed -i "s/0.0.0.0/::/" ./build/index.js

# Environment Variables
Our application is deployed to Azure where our environment variables are securely stored
If you need to add a new environment variable please request the help of one of our code owners to assist you.
Note that all environment variables are given default values in the .env file and are not for production usage.

# Writing new code
Please ensure you are descriptive in your issues and PRs that you create.
If you have any questions or ideas don't hesitate to contact one of our code owners to assist you!

## Some ideas of what to implement in future:
Responsive design.

A following your friends feature

A separate account type for authors

More code testing and implement code coverage.

