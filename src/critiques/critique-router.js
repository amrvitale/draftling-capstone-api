const express = require('express');
const critiqueRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const critiqueService = require('./critique-service')
const xss = require('xss');

const serializeFreeform = freeformCrit => ({
    ...freeformCrit,
    opening: xss(freeformCrit.opening),
    critfreeform: xss(freeformCrit.critfreeform),
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
    console.log("Getting critiques");
    const knexInstance = req.app.get("db");
    console.log(knexInstance)
    critiqueService
    .getAllFreeforms(knexInstance)
    .then((freeformCrits) => {
        console.log("Made it to .then");
        const seralizedCrits = freeformCrits.map((freeformCrit) => serializeFreeform(freeformCrit));
        console.log(seralizedCrits);
        res.json(seralizedCrits);
    })
    .catch((err) => {
       console.log("Entered catch");
       console.log(err);
       next(err);
    });
    console.log("Done getting critiques");
})

 critiqueRouter
 .route(`/freeform/:id`)
 .post(bodyParser, (req, res, next) => {
    console.log('inside post for freeform', req.body);
    const {opening, critfreeform} = req.body;
    const freeformCrit = {opening, critfreeform};
    critiqueService
    .insertFreeform(req.app.get("db"), freeformCrit)
    .then((freeformCrit) => {
        res
            .status(201)
            .location(req.originalUrl + `${freeformCrit.id}`)
            .json(serializeFreeform(freeformCrit));
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