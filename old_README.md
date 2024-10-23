# LibStats

## About

## Stack

LibStats is built using several packages and libraries including the following:

**Client**

- React
- Vite build tool
- React Router
- React Hot Toast

**API**

- NodeJS
- Express
- KnexJS
- Better-Sqlite3

## Running In Production

LibStats is designed to run in production using Docker and Docker Compose. Each service (client and api) should contain a ready to use Dockerfile that will complete any necessary builds, migrations, and configuration. In the app's root directory there is a docker-compose.yaml that will start and maintain both of these containerized services. Review this file to ensure that the docker-compose configuration works for your system (i.e. that ports are available and file paths match your filesystem).

By default the LibStats client listens on port 80 in production and the api listens on port 8080 by default. Both of these ports are exposed to the host system through the `docker-compose.yaml` file located at the app's root. Adjust these accordingly.

To get started in production set up a few things.

**First**: You will need to create a sqlite3 database in the correct directory. Create a database named `production.sqlite` in the directory `./api/data`

**Second**: Create a `.env` in the app's root directory with the following variables.

```
NODE_ENV=production
NODE_PORT=[API_PORT]
ORIGINS=COMMA SEPERATED LIST OF CLIENT ORIGINS, EX: HTTP://CLIENT
VITE_API_URL=http://[SERVER_IP]:${NODE_PORT}
TZ=America/New_York
```

Once you are ready from the app's root directory run `docker compose up -d --build` to start the containers.
