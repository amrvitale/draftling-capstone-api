const express = require('express');

const updateDraftlingsRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const updateDraftlingsService = require('./updateDraftlings-service');
const xss = require('xss');

const serializeDraftling = draftling => ({
    ...draftling,
    title: xss(draftling.title),
    content: xss(draftling.content),
    wordcount: xss(draftling.wordcount)
});

/*updateDraftlingsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        console.log(knexInstance)
        updateDraftlingService
            .getAllDraftlings(knexInstance)
            .then((draftlings) => {
                res.json(draftlings.map((draftling) => serializeDraftling(draftling)));
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    })*/


updateDraftlingsRouter
        .route('/')
        .all((req,res, next) => {
            console.log('received put')

            updateDraftlingsService.getById(
                req.app.get('db'),
                req.params.id
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
    

    .put(bodyParser, (req, res, next)=> {
        const {title, wordcount, content} = req.query;
        const draftlingToUpdate = {title, content, wordcount, modified};

        const numberOfValues = Object.values(draftlingToUpdate).filter(Boolean).length;
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: 'request body must contain either  \'title\' or \'content\''
                }
            });
        }
        updateDraftlingsService.updateDraftling(
            req.app.get('db'),
            req.params.id,
            draftlingToUpdate
        )
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
    });
    module.exports = updateDraftlingsRouter;