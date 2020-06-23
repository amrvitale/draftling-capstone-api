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
    .route('/search')
    .get(bodyParser, (req, res, next) => {
        searchDraftlingsService.getByTitle(
            req.app.get("db"), 
            req.params.title
        )
        console.log(req.app.get('db'))
        .then(draftling => {
            if(!draftling) {
                return res.status(404).json({
                    error: {message: 'Draftling doesn\'t exist.'}
                    });
                }
                res.draftling = draftling;
                next();
            })
            .catch(next);
        })
        searchDraftlingsRouter
        .route('/search')
        .get((req, res, next) => {
            const knexInstance = req.app.get('db');
            console.log(req.app.get('db'))
            console.log(knexInstance)
            searchDraftlingsService.getByGenre(
                req.app.get('db'), 
                req.params.genre
            )
            .then(draftling => {
                if(!draftling) {
                    return res.status(404).json({
                        error: {message: 'Draftling doesn\'t exist.'}
                        });
                    }
                    res.draftling = draftling;
                    next();
                })
                .catch(next);
            })

        searchDraftlingsRouter
        .route('/search')
        .get((req, res, next) => { 
            const knexInstance = req.app.get('db');
            console.log(knexInstance)
            console.log(req.app.get('db'))
            searchDraftlingsService.getByTitleAndGenre(
                req.app.get('db'), req.params.title.genre || ''
                )
                .then(draftling => {
                    if(!draftling) {
                        return res.status(404).json({
                            error: {message: 'Draftling doesn\'t exist.'}
                            });
                        }
                        res.draftling = draftling;
                        next();
                    })
                    .catch(next);

        })     

        console.log('can you see this?')
module.exports = searchDraftlingsRouter;

