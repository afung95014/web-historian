# web-historian
fetches the HTML from a URL and stores the result

## Requirements

- Node 0.10.x
- Postgresql 9.1.x

> Initial Postgres Database Setup

- If you don't have Postgres.app, point to http://postgresapp.com/, download,
and install the app
- Open Postgres.app from your Applications folder
- Click on the Postgres elephant icon on the menu bar and select 'Open psql'
to start the Postgres instance (a psql terminal window should open up)
- In the window, create the database table by typing:
```sh
CREATE DATABASE web-hist;
```

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Starting application

```sh
npm run createTable
npm start
npm run worker
```


