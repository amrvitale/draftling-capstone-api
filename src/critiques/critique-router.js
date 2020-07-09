const express = require('express');
const critiqueRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const critiqueService = require('./critique-service')
const xss = require('xss');

const serializeFreeform = freeformcrit => ({
    ...freeformcrit,
    opening: xss(freeformcrit.opening),
    critfreeform: xss(freeformcrit.critfreeform),
});
const serializeTemplate = templateCrit => ({
    ...templateCrit,
    plot: xss(templateCrit.plot),
    pov: xss(templateCrit.pov),
    characters: xss(templateCrit.characters),
    dialogue: xss(templateCrit.dialogue),
    gramspell: xss(templateCrit.gramspell),
    overall: xss(templateCrit.overall)
});
critiqueRouter
 .route('/freeform')
 .get((req, res, next) => {
     const knexInstance = req.app.get("db");
     console.log(knexInstance)
     critiqueService
     .getAllFreeforms(knexInstance)
     .then((freeformcrits) => {
         res.json(freeformcrits.map((freeformcrit) => serializeFreeform(freeformcrit)));
     })
     .catch((err) => {
        console.log(err);
        next(err);
     });
 })
 critiqueRouter
 .route(`/freeform/:id`)
 .post(bodyParser, (req, res, next) => {
    console.log('inside post for freeform', req.body);
    const {opening, critfreeform} = req.body;
    const freeFormCrit = {opening, critfreeform};
    critiqueService
    .insertFreeform(req.app.get("db"), freeFormCrit)
    .then((freeFormCrit) => {
        res
            .status(201)
            .location(req.originalUrl + `${draftling.id}`)
            .json(serializeFreeform(freeFormCrit));
    })
    .catch((err) => {
        console.log(err);
        next(err);
    });

})
 

 critiqueRouter
 .route('/template')
 .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    console.log(knexInstance)
    critiqueService
    .getAllTemplates(knexInstance)
    .then((templateCrit) => {
        res.json(templateCrits.map((templateCrit) => serializeTemplate(templateCrit)));
    })
    .catch((err) => {
       console.log(err);
       next(err);
    });
})

critiqueRouter
.route(`/template/:id`)
 .post(bodyParser, (req, res, next) => {
    console.log('inside post for template', req.body);
    const {plot, pov, characters, dialogue, gramspell, overall} = req.body;
    const templateCrit = { plot, pov, characters, dialogue, gramspell, overall};
    critiqueService
        .insertTemplate(req.app.get("db"), templateCrit)
        .then((templateCrit) => {
            res
            .status(201)
            .location(req.originalUrl + `${draftling.id}`)
            .json(serializeTemplate(templateCrit));
        })
        .catch((err) => {
            console.log(err);
        next(err);
        });
})

 module.exports = critiqueRouter;