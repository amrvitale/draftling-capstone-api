const express = require('express');
const critiqueFreeformRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const critiqueFreeformService = require('./critiqueFreeform-service')
const xss = require('xss');

const serializeDraftling = draftling => ({
    ...draftling,
    title: xss(draftling.title),
    content: xss(draftling.content),
    wordcount: xss(draftling.wordcount),
    genre: xss(draftling.genre),
    status: xss(draftling.status)
});

critiqueFreeformRouter
 .route('/')
 .post(bodyParser, (req, res, next) => {
    const {opening, critFreeform} = req.body;
    const freeFormCrit = {opening, critFreeform};
    critiqueFreeformService

 })

 module.exports = critiqueFreeformRouter;