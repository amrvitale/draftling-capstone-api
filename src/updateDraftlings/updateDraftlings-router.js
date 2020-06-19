const express = require('express');

const draftlingRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const draftlingService = require('./draftling-service');
const xss = require('xss');

const serializeDraftling = draftling => ({
    ...draftling,
    title: xss(draftling.title),
    content: xss(draftling.content),
    wordcount: xss(draftling.wordcount)
});

updateDraftlingRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        console.log(knexInstance)
        draftlingService
            .getAllDraftlings(knexInstance)
            .then((draftlings) => {
                res.json(draftlings.map((draftling) => serializeDraftling(draftling)));
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    })


    updraftlingRouter
        .route('/:id')
        .all((req,res, next) => {
            draftlingService.getById(
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
        const {title, content} = req.body;
        const draftlingToUpdate = {title, content, wordcount, modified};

        const numberOfValues = Object.values(draftlingToUpdate).filter(Boolean).length;
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: 'request body must contain either  \'title\' or \'content\''
                }
            });
        }
        draftlingService.updateDraftling(
            req.app.get('db'),
            req.params.id,
            draftlingToUpdate
        )
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
    });
    module.exports = draftlingRouter;