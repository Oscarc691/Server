# Product Server

## Description

This app is used to manipulate a database containing products, each belonging to a category, and each having various tags. It uses unique API endpoints to manipulate data via HTML requests, and responds with JSON data.

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [Credits](#credits)
- [License](#license)

## Usage 

This application is run by initializing a server on the user's machine by running `node server` in the command line, after installing node packages with `npm i`, and seeding the database with `npm run seed`. Once initialized, the server can take HTML requests via Insomnia. Be sure `put` and `post` requests contain an `id` parameter at the end of the route, along with JSON data to be used for the database.

## Installation

This application can be installed by simply cloning the git repository to the user's machine.

## License

Please see the license in the git repository.