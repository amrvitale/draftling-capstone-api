const express = require('express');

const searchDraftlingsRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const searchDraftlingsService = require('./searchDraftlings-service');
const xss = require('xss');

const serializeDraftling = draftling => ({
    ...draftling,
    title: xss(draftling.title),
    content: xss(draftling.content),
    wordcount: xss(draftling.wordcount),
    genre: xss(draftling.genre)
});

searchDraftlingsRouter.route('/search').get(bodyParser, (req, res, next) => {
    const { title, wordcount, genre, content } = req.body;
    const searchResult = { title, wordcount, genre, content }; 
});

searchDraftlingsService
    .getByTitle(req.app.get("db"), req.params.title, searchResult)
    .then(() => {
        res.status(204).end();
    })
    .catch(next);

    .getByGenre(req.app.get('db'), req.params.genre, searchResult)
    .then(() => {
        res.status(204).end();
    })
    .catch(next);

    .getByTitleAndGenre(req.app.get('db'), req.params.title.genre, searchResult)
    .then(() => {
        res.status(204).end();
    })
    .catch(next);

module.exports = searchDraftlingsRouter;