const express = require('express');

const publishDraftlingsRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const publishDraftlingsService = require('./publish-service');
const xss = require('xss');

const serializeDraftling = draftling => ({
    ...draftling,
    title: xss(draftling.title),
    content: xss(draftling.content),
    wordcount: xss(draftling.wordcount),
    genre: xss(draftling.genre)
});

publishDraftlingsRouter
.route('/')
.get((req, res, next) => {
    const knexInstance = req.app.get('db');
    console.log(req.query)

    publishDraftlingsService
})

module.exports = publishDraftlingsRouter;
