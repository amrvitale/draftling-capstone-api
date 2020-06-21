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

updateDraftlingsRouter
        .route('/:id')
        .all((req,res, next) => {
            updateDraftlingsService
            .getById(req.app.get('db'),req.params.id)

            .then(draftling => {
                console.log(draftling);
                if(!draftling) {
                    return res.status(404).json({
                        error: {message: 'Draftling doesn\'t exist.'},
                    });
                }
                res.draftling = draftling;
                next();
            })
            .catch(next);
        })
    

    .put(bodyParser, (req, res, next)=> {
        const {title, wordcount, content} = req.body;
        const draftlingToUpdate = {title, content, wordcount};

        const numberOfValues = Object.values(draftlingToUpdate).filter(Boolean).length;
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: 'request body must contain either  \'title\' or \'content\''
                },
            });
        }
        updateDraftlingsService
        .editDraftling(req.app.get('db'),req.params.id,draftlingToUpdate)
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
    });
    module.exports = updateDraftlingsRouter;