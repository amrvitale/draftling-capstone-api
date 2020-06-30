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
    wordcount: xss(draftling.wordcount),
    genre: xss(draftling.genre),
    status: xss(draftling.status)
});

draftlingRouter
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

    .post(bodyParser, (req, res, next) => {
        const {title, content, wordcount, genre, modified} = req.body;
        const newDraftling = { title, content, wordcount, genre, modified};
        draftlingService
            .insertDraftling(req.app.get("db"), newDraftling)
            .then((draftling) => {
                res
                 .status(201)
                 .location(req.originalUrl + `${draftling.id}`)
                 .json(serializeDraftling(draftling));
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    });
    
    draftlingRouter
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
    
    .get((req, res, next) => {
        return res.json(serializeDraftling(res.draftling));
    })
    .put(bodyParser, (req, res, next) => {
        const { title, wordcount, genre, content, status } = req.body;
        const draftlingToUpdate = { title, content, genre, wordcount, status };
        const numberOfValues = Object.values(draftlingToUpdate).filter(Boolean)
          .length;

        if (numberOfValues === 0) {
          return res.status(400).json({
            error: {
              message: "request body must contain 'title', 'wordcount', or 'genre'",
            },
          });
        }

        draftlingService
        .editDraftling(req.app.get("db"), req.params.id, draftlingToUpdate)
        .then(() => {
          res.status(204).end();
        })
        .catch(next);

      });
    

    module.exports = draftlingRouter;

    /*  .delete((req, res, next) => {
        const { id } = req.params;
        const knexInstance = req.app.get('db');
        draftlingService.deleteDraftling(knexInstance, id)
            .then(() => {
                res.status(204).end();
            })
            .catch(next);
    }) */