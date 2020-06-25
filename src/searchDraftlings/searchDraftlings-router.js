const express = require('express');

const searchDraftlingsRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const searchDraftlingsService = require('./searchDraftlings-service');
const xss = require('xss');
const draftlingRouter = require('../draftlings/draftling-router');

const serializeDraftling = draftling => ({
    ...draftling,
    title: xss(draftling.title),
    content: xss(draftling.content),
    wordcount: xss(draftling.wordcount),
    genre: xss(draftling.genre)
});

        searchDraftlingsRouter
        .route('/')
        .get((req, res, next) => {

            const knexInstance = req.app.get('db');
            console.log(req.query)
            if (req.query.title) {
            searchDraftlingsService
              .getByTitle( 
                req.app.get('db'),
                req.query.title)
              }

            if (req.query.genre){
            searchDraftlingsService
                .getByGenre(
                  req.app.get('db'),
                  req.query.genre
                )
              }

            if (req.query.wordcount) {    
              searchDraftlingsService
                .getByWordcount(
                  req.app.get('db'),
                  req.query.wordcount
                )
                .then(draftlings => {
                  console.log(draftlings)
                  if(!draftlings) {
                      return res.status(404).json({
                          error: {message: 'Error getting draftlings'}
                          });
                      }
                  return  res.json({ draftlings })
                })
            } 
        })

        console.log('can you see this?')

module.exports = searchDraftlingsRouter;

