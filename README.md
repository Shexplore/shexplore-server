# Shexplore Server

## Setup:
    npm install
`settings/db.json`
    {
      "client": "pg",
      "connection": {
        "host"     : "HOST",
        "user"     : "USER",
        "password" : "PASSWORD",
        "database" : "DATABASE",
        "charset"  : "utf8"
      }
    }


## Running:
    npm start

To make the database, do
    psql
      CREATE DATABASE "shex";
      \connect shex
      CREATE TABLE users (id INTEGER, name TEXT, verification TEXT, email TEXT, password TEXT);
      CREATE TABLE projects (id INTEGER, uuid TEXT, name TEXT, description TEXT, state TEXT);

or for development
    sqlite3 dev.db.sqlite
      //CREATE TABLE users (id INTEGER, name TEXT, verification TEXT, email TEXT, password TEXT);
      //CREATE TABLE projects (id INTEGER, uuid TEXT, name TEXT, description TEXT, state TEXT);
