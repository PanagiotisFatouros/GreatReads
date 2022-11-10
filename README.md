# GreatReads

GreatReads is a social book archiving web application, with the following funtionalities:

1. Find and save your favourite books
2. Write reviews on any books
3. Write notes on any book, and organise them by page
4. Personalise your own profile, and view others

## Viewing the application

Visit https://greatreads.azurewebsites.net/ to view the application

To test locally:

1. Clone the git repository

Run the following commands:

2. npm install
3. npm run build
4. npm run dev
# Database connection

To connect directly to the database (eg in the terminal or MySQL workbench), first request the help of one of the core development team members to be added as a user to the database resource.

Following this you can either click “connect” on the overview page to be granted a terminal session once you enter the password or following instructions here to connect another way.

Note: team members will not add you as an owner and will only grant the permission you require.

# Running tests
Ensure the application is not runnning before testing

To test, run the following command:

    npm run test

# IPV4 to IPV6 fix

Our system uses vite to build to a node application which unfortunately generates code for an IPv4 server. To fix this after building we run the command below (must be run in a linux terminal) which converts the server to an IPv6 connection.

If you are building on windows, run 

    npm run build 

then go to a linux terminal and run:

    npm run ipv6_fix // Runs the below command

    sed -i "s/0.0.0.0/::/" ./build/index.js