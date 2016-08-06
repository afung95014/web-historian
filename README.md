# web-historian

### Summary
Fetches the HTML from a URL and stores the result. 

### Flow
User inputs a URL and gets back a job ID. Every 10 seconds, the web worker will archive the HTML of any URLs that have not been archived yet. User can check back and see if their URL has been archived yet by inputting the job ID associated with that URL. If the data from that URL has been archived, user will be able see the HTML from that site.

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


