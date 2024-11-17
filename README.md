# Table of Contents

<!-- TOC -->
* [Table of Contents](#table-of-contents)
* [Overview](#overview)
* [Technologies Used](#technologies-used)
  * [Client](#client)
  * [API](#api)
  * [Database](#database)
* [Project Structure](#project-structure)
* [Installation & Configuration](#installation--configuration)
* [Database Setup](#database-setup)
* [Usage](#usage)
  * [Running Locally](#running-locally)
  * [Running in Production with Docker](#running-in-production-with-docker)
* [API Documentation](#api-documentation)
  * [App Endpoints](#app-endpoints)
    * [Report](#report)
    * [Options](#options)
    * [Record](#record)
    * [Summary](#summary)
    * [Interactions](#interactions)
  * [Authorization Endpoints](#authorization-endpoints)
    * [Token](#token)
    * [Verify](#verify)
  * [Admin Endpoints](#admin-endpoints)
    * [Get All Rows](#get-all-rows)
    * [Select Rows By ID](#select-rows-by-id)
    * [Add New Row](#add-new-row)
    * [Update Row By ID](#update-row-by-id)
  * [Failed Responses](#failed-responses)
* [Contributing](#contributing)
* [License](#license)
<!-- TOC -->

# Overview

LibStats is a full-stack web app designed to track and report reference interaction, types, locations, and formats in a public library setting. The app features a React client and an Express.js backend API that interacts with a SQLite3 database to store and retrieve interaction data.

This app manages reference interactions in a library setting between different types, in different formats, and at different locations.

Key functionality includes:

- CRUD operations to manage reference interactions
- Linking interactions to pre-defined types, locations, and formats
- Reporting functions to retrieve interaction data from database
- Data visualization elements

# Technologies Used

- **Docker**
- **Docker Compose**
- **Caddy**

## Client

- **React**: Frontend JavaScript library
- **Vite**: Frontend tooling and build tool
- **React Router**: Client-side routing for React
- **React Hot Toast**: Notifications library for React
- **Recharts**: Data visualization library for React

## API

- **Express**: Web framework for building the backend API
- **Knex**: SQL query builder and migrations tool
- **better-sqlite3**: SQLite database driver
- **jsonwebtoken**: Authorization using JWT

## Database

- **SQLite3**: A lightweight SQL database to store interactions, types, locations, and formats

# Project Structure

```
/ ── project root
    ├── api
    │   ├── data
    │   ├── Dockerfile
    │   ├── knexfile.js
    │   ├── node_modules
    │   ├── package.json
    │   ├── package-lock.json
    │   └── src
    ├── Caddyfile
    ├── client
    │   ├── Dockerfile
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── public
    │   ├── README.md
    │   ├── src
    │   └── vite.config.js
    ├── docker-compose.yaml
    └── README.md
```

# Installation & Configuration

**1. Clone the repository**

```bash
git clone https://github.com/jamesspearsv/libstats-node.git
cd libstats-node
```

**2. Install dependencies**

For the frontend

```bash
cd client
npm install
```

For the backend

```bash
cd api
npm install
```

**3. Set up environment variables**: Create an `.env` file in the project root with the following contents:

```
NODE_ENV=production
NODE_PORT=[...]
ORIGINS=[...]
VITE_API_HOST=http://[...]:${NODE_PORT}
TZ=America/New_York
SECRET_KEY=[...]
ADMIN_PASSWORD=[...]
```

These variables in this `.env` are used by the app in production.

- `NODE_ENV`: Defines which environment the API is running in the API container
- `NODE_PORT`: Defines which port is exposed by the API container in Docker. Defaults to `3001` if not provided
- `ORIGINS`: Comma separated list of client origins (`http://localhost,http://localhost:3000`). Allowed origins in the CORS configuration for the API
- `VITE_API_HOST`: Variable to pass the API host to the client frontend. Replace placeholder with host server IP or 
  hostname (`localhost`)
- `TZ`: Sets the timezone of the API container and impacts the default timezone for timestamps during database insertions and request logging
- `SECRET_KEY`: Secret value that is used for signing API access tokens
- `ADMIN_PASSWORD`: Secret value that is used for accessing protected API routes and client views


# Database Setup

The app's data is stored using SQLite3 databases in `./api/data`. To create and set up a development or production 
database follow the below instructions.

Use the `--env production` flag to seed a production database. 

**1. Run migrations**: In the `api` directory, run the Knex migrations to set up the database. The following command will apply the latest migrations.


```bash
npx knex migrate:latest
```
or 

```bash
npx knex migrate:latest --env production
```

**2. Database schema**: The database schema consists of the following tables:

- `interactions`: Stores details about each interaction (columns: id, type_id, location_id, format_id, date)
- `types`: Defines available types of interactions (columns: id, value, desc)
- `locations`: Defines available location at which interactions can occur (columns: id, value)
- `formats`: Defines types of formats in which interaction can take place (columns: id, value)

**3. Database seeds**: Seed the `types`, `locations`, and `formats` tables with predefined values

```bash
npx knex seed:run
```

or

```bash
npx knex seed:run --env production
```

Migration and seeds files can be found in `./api/src/db/migrations` and `./api/src/db/seeds` respectively


**Only seed a production database once to avoid data lose**

# Usage

LibStats is designed to be run locally in development and run in production using docker and docker-compose

## Running Locally

Run any of the following commands from the project root. Both the frontend and backend can be run independently or as a fullstack app

**Run the frontend independently**

```bash
cd client
npm run dev
```

Visit `http://localhost:3000` to access the client locally

**Run the backend independently**

```bash
cd api
npm run dev
```

Visit `http://localhost:3001` to access the API locally

**Run the fullstack app**

```bash
cd api
npm run app
```

## Running in Production with Docker

**1. Verify database set up**

To run the app in production, ensure that a `production.sqlite` file has been created with any migrations and seeds run.

```bash
cd api
npx knex migrate:latest --env production
npx knex seed:run --env production
```

**2. Start the docker stack**

From the project root run the following command:

```bash
sudo docker compose up -d --build
```

Once started, the app's client should be available at your machine's local IP address on port 80 while the app's backend will be available the value defined using `NODE_PORT` in the app's `.env`. If this is not set the API will be available on port 3001

# API Documentation

## App Endpoints

All example endpoint responses are abbreviated for this README

### Report

GET /app/report

Returns a report of interactions between a range of given dates and at a given location.

**Query Parameters**

- `start` and `end` (required): Filter interactions by date range (e.g. `2024-01-01` to `2024-01-03`)
- `location` (required): Filter interaction by a given location id (e.g. `1`)

**Response**

```json
{
  "message": "ok",
  "rows": [],
  "count_total": 0,
  "count_format": [
    {
      "id": 1,
      "value": "In-Person",
      "number_of_interactions": 0
    }
  ],
  "count_type": [
    {
      "id": 1,
      "value": "Directional",
      "number_of_interactions": 0
    }
  ],
  "count_days": [
    {
      "date": "2024-01-01",
      "number_of_interactions": 0
    }
  ]
}
```

### Options

GET /app/options

Returns the defined rows in `types`, `locations`, and `formats` tables. Used in build forms for client UI

**Response**

```json
{
  "message": "ok",
  "types": [
    {
      "id": 1,
      "value": "Directional",
      "desc": "Simple questions about facilities, hours, etc."
    }
  ],
  "locations": [
    {
      "id": 1,
      "value": "Circulation"
    }
  ],
  "formats": [
    {
      "id": 1,
      "value": "In-Person"
    }
  ]
}
```

### Record

POST /app/record

Inserts a new row into the `interactions` table

**Request Parameters**

This endpoint expects a json body with a specified type id, location id, and format, id

```json
{
  "type": 1,
  "location": 2,
  "format": 1
}
```

Each parameter represents the unique id of a row in the respective database table

- `type`: Integer (required)
- `location`: Integer (required)
- `format`: Integer (required)

**Response**

```json
{ "message": "data added" }
```

### Summary

GET /app/summary

Returns data for the app homepage

**Response**

```json
{ "message": "ok", "count_month": 10 }
```

### Interactions

GET /app/interactions

Returns all rows in the `interactions` table

**Response**

```json
[
  {
    "id": 52,
    "type": "Directional",
    "location": "Reference",
    "format": "In-Person",
    "date": "2024-10-23"
  },
  {
    "id": 53,
    "type": "Directional",
    "location": "Reference",
    "format": "In-Person",
    "date": "2024-10-23"
  }
]
```

## Authorization Endpoints

### Token

POST /auth/token

This endpoint verifies a user based on the app admin password and return an authorization object if the provided 
password is correct.

**Request Parameters**

This endpoint expects a json body with a supplied password

```json
{
  "password": "[...]"
}
```

- `password`: string(required)

**Response**

A successful response will take the below format:

```json
{
 "message": "ok",
  "token" : "[...]",
  "token_type" : "Bearer",
  "issued_at": "[...]",
  "expires_in": 600
}
```

- `token`: String representing the issued JWT access token
- `token_type`: String representing the type of token issued
- `issued_at`: Unix timestamp in seconds representing when the token was issued
- `expires_in`: Number of seconds since issuance that the token will expire. App defaults to 600 seconds (10 minutes)

### Verify

POST /auth/verify

This verifies that a given token is valid.

**Request Parameters**

This endpoint expects a request with a correctly formed `Authorization` header.

```http request
POST http://[...]/auth/verify
Content-Type: application/json
Authorization: Bearer [...]
```

Replace the placeholder above with a valid access token

## Admin Endpoints

All endpoints in this category require a valid access token requested using `/auth/token`. Tokens should be included 
in the request `Authorization` header in the following format `Authorization: Bearer [token]`.

Admin endpoints query a select set of tables including:

- `types`
- `locations`
- `formats`

### Get All Rows

GET /admin/:table

Gets all rows from a given table

**Request Parameters**

This expect a valid table from the above choices and a valid access token.

The request below will return all rows from the `types` table.

```http request
GET http://[...]/admin/types
Authroization: Bearer [...]
```

**Response**

Returns a json response containing a response message in the selected rows

```json
{
  "message": "ok",
  "rows": [
    {
    "id": 1,
    "value": "Directional",
    "desc": "Simple questions about facilities, hours, etc."
    },
    {
    "id": 2,
    "value": "Digital Resources",
    "desc": "Questions about accessing and using MPL digital resources."
    }
  ]
}
```
### Select Rows By ID

GET /admin/:table/:id

Requests a single row by ID from a given table.

**Request Parameters**

This endpoints expects a valid table name, row ID, and access token. The below request will select a row with an ID 
1 from the `types` table

```http request
GET http://[...]/admin/types/1
Authorization: Bearer [...]
```

**Response**

Returns a json response with a response message and row if found.

```json
{
  "message": "row found",
  "row": {
    "id": 1,
    "value": "Directional",
    "desc": "Simple questions about facilities, hours, etc."
  }
}
```

### Add New Row

POST /admin/:table

Add a new row to a given table.

**Request Parameters**

This endpoint expects a valid table name and a correctly formed json body representing the columns and values to be 
inserted into the database excluding an ID.

```http request
POST http://[...]/admin/types
Content-Type: application/json
Authorization: Bearer [...]

{
  "value": "Informational",
  "desc": "Simple questions about hours, directions, etc."
}
```

**Response**

Returns a json response with a successful message

```json
{ "message": "New row added", 
  "row": {
        "id": 5,
        "value": "Directional",
        "desc": "Simple questions about hours, directions, etc."
  }
}
```

### Update Row By ID

POST /admin/:table/:id

Update a single row in a given table by ID

**Request Parameters**

Expects a valid table, row ID, authorization header with access token, and json body representing the new values for 
to update the row with excluding the row ID

```http request
POST http://[...]/admin/types/1
Content-Type: application/json
Authorization: Bearer [...]

{
    "value": "Directional",
    "desc": "Simple questions about facilities, hours, etc."
}
```

**Response**

Returns a json response with a successful message and the updated row

```json
{
  "message": "Row updated",
  "row": {
      "id": 1,
      "value": "Directional",
      "desc": "Simple questions about hours, directions, etc."
    }
}
```

### Admin Stats

GET /admin/stats

This endpoint return all time statistics from the interaction table including total number of interactions and count 
of interaction grouped by category (types, formats, interactions)

**Request Parameters**

Expects a valid access token and `Authorization` header

```http request
GET http://[...]/admin/stats
Authorization: Bearer [...]
```

**Response**

Returns a json response with counts from the interactions table and respective response message

```json
{
  "message": "ok",
  "count_total": 157,
  "count_type": [
    {
      "id": 1,
      "value": "Directional",
      "total_interactions": 30
    }
  ],
  "count_location": [
    {
      "id": 1,
      "value": "Circulation",
      "total_interactions": 48
    }
  ],
  "count_format": [
    {
      "id": 1,
      "value": "In-Person",
      "total_interactions": 88
    }
  ]
}
```

## Failed Responses

Any endpoint that response unsuccessfully or encounters an error will respond with a json like 
the following and an appropriate http status code.

```json
{ "message": "No row found" }
```

# Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a pull request and describe your changes.

# License

This project is licensed under the MIT License
