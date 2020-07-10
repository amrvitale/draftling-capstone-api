require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const {CLIENT_ORIGIN} = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const draftlingRouter = require('./draftlings/draftling-router')
const draftlingService = require('./draftlings/draftling-service')
const searchDraftlingsRouter = require('./searchDraftlings/searchDraftlings-router')
const searchDraftlingsService = require('./searchDraftlings/searchDraftlings-service')
const critiqueRouter = require('./critiques/critique-router')
const critiqueService = require('./critiques/critique-service')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

app.use(cors());

app.use(helmet())
app.disable('etag');
app.options('*', cors());  // enable pre-flight

app.use('/api/mydraftlings', draftlingRouter);
app.use ('/api/search', searchDraftlingsRouter);
app.use(`/api/draftling`, critiqueRouter);

app.get('/api/*', cors(), (req, res) => {
  res.json({ok: true});
});

  app.use(function errorHandler(error, req, res, next) {
      let response
      if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
      } else {
        console.error(error)
        response = { message: error.message, error }
      }
      res.status(500).json(response)
    })

module.exports = app