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
    wordcount: xss(draftling.wordcount),
    genre: xss(draftling.genre)
});

    updateDraftlingsRouter.route("/:id").put(bodyParser, (req, res, next) => {
        const { title, wordcount, genre, content } = req.body;
        const draftlingToUpdate = { title, content, genre, wordcount };
      
        const numberOfValues = Object.values(draftlingToUpdate).filter(Boolean)
          .length;
        if (numberOfValues === 0) {
          return res.status(400).json({
            error: {
              message: "request body must contain either  'title' or 'content'",
            },
          });
        }
        updateDraftlingsService
          .editDraftling(req.app.get("db"), req.params.id, draftlingToUpdate)
          .then(() => {
            res.status(204).end();
          })
          .catch(next);
      });

    module.exports = updateDraftlingsRouter;