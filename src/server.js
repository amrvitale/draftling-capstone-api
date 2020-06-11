const express = require('express');
const app = require('./app')
const knex = require('knex');

const { PORT } = require('./config')



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

