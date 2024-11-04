# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Technologies Used](#technologies-used)
  - [Client](#client)
  - [API](#api)
  - [Database](#database)
- [Project Structure](#project-structure)
- [Installation \& Configuration](#installation--configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
  - [Running Locally](#running-locally)
  - [Running in Production with Docker](#running-in-production-with-docker)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [Report](#report)
    - [Options](#options)
    - [Add](#add)
    - [Dashboard](#dashboard)
    - [Interactions](#interactions)
    - [Failed Responses](#failed-responses)
- [Contributing](#contributing)
- [License](#license)

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

- `interactions`: Stores details about each interaction (e.g. id, type, location, format, date)
- `types`: Defines available types of interactions
- `locations`: Defines available location at which interactions can occur
- `formats`: Defines types of formats in which interaction can take place

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

## Endpoints

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

**Body Parameters**

This endpoint expects the following request body:

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

### Failed Responses

Any endpoint that encounters an error will respond with the following:

```json
{ "message": "Server Error" }
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
