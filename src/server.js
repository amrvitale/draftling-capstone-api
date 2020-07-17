const express = require('express');
const app = require('./app')
const knex = require('knex');

const { PORT, DATABASE_URL, NODE_ENV } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});
console.log(DATABASE_URL, "hey it's the db url!")

app.set('db', db);
console.log(db, "db")

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

