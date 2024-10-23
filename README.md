# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Technolgies Used](#technolgies-used)
  - [Client](#client)
  - [API](#api)
  - [Database](#database)
- [Project Structure](#project-structure)
- [Installation \& Configuration](#installation--configuration)
- [Datebase Setup](#datebase-setup)
- [Usage](#usage)
  - [Running Locally](#running-locally)
  - [Running in Production with Docker](#running-in-production-with-docker)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [Reports](#reports)
    - [Options](#options)
    - [Add](#add)
    - [Dashboard](#dashboard)
    - [Interactions](#interactions)
- [Contributing](#contributing)
- [License](#license)

# Overview

LibStats is a full-stack web app designed to track and report reference interaction, types, locations, and formats in a public library setting. The app features a React client and a ExpressJS backend API that interactions with a SQLite3 datebase to store and retrieve interaction data.

This app manages reference interactions in a library setting between different types, in different formats, and at different locations.

Key functionality includes:

- CRUD operations to manage reference interactions
- Linking interactions to pre-defined types, locations, and formats
- Reporting functions to retrive interation data from database
- Data visualization elements

# Technolgies Used

- **Docker**
- **Docker Compose**
- **Caddy**:

## Client

- **React**: Frontend JavaScript library
- **Vite**: Frontend tooling and build tool
- **React Router**: Client-side routing for React
- **React Hot Toast**: Notifications library for React
- **Recharts**: Data visualization library for Reach

## API

- **Express**: Web framework for building the backend API
- **Knex**: SQL query builder for migrations and database queries
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

**3. Set up environment variables**: Create an `.env` file in the project root with the follow contents:

```
NODE_ENV=production
NODE_PORT=[API_PORT]
ORIGINS=COMMA SEPERATED LIST OF CLIENT ORIGINS, EX: HTTP://client,HTTP://clientTwo
VITE_API_URL=http://[SERVER_IP]:${NODE_PORT}
TZ=America/New_York
```

These variables in this `.env` are used by the app in production.

**4. Create databases**: Create the necessary Sqlite3 database files with the following command from the project root:

```bash
touch ./api/data/dev.sqlite
```

or

```bash
touch ./api/data/production.sqlite
```

# Datebase Setup

**1. Run migrations**: In the `api` directory, run the Knex migrations to set up the database. The following command will apply the latest migrations.

```bash
npx knex migrate:latest
```

**2. Database schema**: The database schema consists of the following tables:

- `interactions`: Stores details about each interaction (e.g. id, type, location, format, date)
- `types`: Defines available types of interactions
- `locations`: Defines available location at which interactions can occur
- `formats`: Defines types of formats in which interaction can take place

**3. Database seeds**: Seed the `types`, `locations`, and `formats` tables with the following command:

```bash
npx knex seed:run
```

Use the `--env production` flag to seed a production database

# Usage

LibStats is designed to be run locally in development and run in production using docker and docker-compose

## Running Locally

Run any of the following commands from the project root

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

Visit `http://localhost:3001` to access the api locally

**Run the app fullstack**

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

Once started, the app's client should be available at your machine's local IP address on port 80 while the app's backend will be available at the port number set in the app's `.env`

# API Documentation

## Endpoints

### Reports

### Options

### Add

### Dashboard

### Interactions

# Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a pull request and describe your changes.

# License

This project is licensed under the MIT License
