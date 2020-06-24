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
        .route('/search/:query')
        .get((req, res, next) => {
            const knexInstance = req.app.get('db');
            console.log(req.app.get('db'))
            console.log(knexInstance)
            // PSEUDOCODE:
            // break the query URL param into separate terms
            // get the data from the service based on the terms
            .then(draftlings => {
                if(!draftlings) {
                    return res.status(404).json({
                        error: {message: 'Error getting draftlings'}
                        });
                    }
                    // break the query URL param into separate terms
                    // set the draftlings array = draftlings.filter(draftling = {
                      // for each term:
                        // if draftling[key] is not equal to term value, return false
                      // return true
                    // })
                    res.json({ draftling });
                })
                .catch(next);
            })

        console.log('can you see this?')
module.exports = searchDraftlingsRouter;

