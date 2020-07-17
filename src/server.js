const express = require('express');
const app = require('./app')
const knex = require('knex');

const { PORT, DATABASE_URL, NODE_ENV } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});
console.log(DATABASE_URL)

app.set('db', db);
console.log(db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

