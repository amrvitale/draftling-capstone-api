const express = require('express');
const critiqueTemplateRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const critiqueTemplateService = require('./critiqueTemplate-service')
const xss = require('xss');

const serializeTemplateCrit = templateCrit => ({
    ...templateCrit,
    plot: xss(templateCrit.plot),
    pov: xss(templateCrit.pov),
    characters: xss(templateCrit.characters),
    dialogue: xss(templateCrit.dialogue),
    gramspell: xss(templateCrit.gramspell),
    overall: xss(templateCrit.overall)
});

critiqueTemplateRouter
 .route('/draftling/:id')
 .post(bodyParser, (req, res, next) => {
    const {plot, pov, characters, dialogue, gramspell, overall} = req.body;
    const templateCrit = {plot, pov, characters, dialogue, gramspell, overall};
    critiqueTemplateService
     .insertTemplate(req.app.get("db"), templateCrit)
     

 })

 module.exports = critiqueTemplateRouter;