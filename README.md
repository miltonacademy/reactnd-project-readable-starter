# Readable Application

This application displays a list of posts, allowing users to contribute posts, comment on them, and sort via various criteria.

# Installation

This application requires a number of dependencies which are specified in the package.json file. To install the necessary dependencies, navigate to the root directory "reactnd-project-readable-starter", and run the following terminal command:

npm install

# Running the Application

After installation of the necessary dependencies, the application can be launched by running this terminal command on the root directory:

npm start

# Application Usage

The root of the application lists posts. Individual posts can be navigated to by clicking on their title. Posts can be sorted by category, by high/low vote score, by newest/oldest. New posts can be added by clicking "Add New Post." Individual post vote scores can be up or down-voted. Posts can be edited or deleted.

Clicking into individual posts gives access to view the full body of the post, see additional details, as well as view the comments associated with that post. The post can be edited, deleted, up or down-voted. Comments can be added by clicking "Add new comment." Comments can be up or down-voted, edited, or deleted.

The home of the application can be navigated back to at any time by clicking the "Readable" headline or icon in the global header banner.


#####################
# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
