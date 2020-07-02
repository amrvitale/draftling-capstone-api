const express = require('express');
const critiqueTemplateRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const critiqueTemplateService = require('./critiqueTemplate-service')
const xss = require('xss');

const serializeDraftling = draftling => ({
    ...draftling,
    title: xss(draftling.title),
    content: xss(draftling.content),
    wordcount: xss(draftling.wordcount),
    genre: xss(draftling.genre),
    status: xss(draftling.status)
});

critiqueTemplateRouter
 .route('/')
 .post(bodyParser, (req, res, next) => {
    const {plot, pov, characters, dialogue, gramspell, overall} = req.body;
    const templateCrit = {plot, pov, characters, dialogue, gramspell, overall};
    critiqueTemplateService

 })

 module.exports = critiqueTemplateRouter;