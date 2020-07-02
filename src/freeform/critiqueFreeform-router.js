const express = require('express');
const critiqueFreeformRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const critiqueFreeformService = require('./critiqueFreeform-service')
const xss = require('xss');

const serializeFreeformcrit = freeformcrit => ({
    ...freeformcrit,
    opening: xss(freeformcrit.opening),
    critfreeform: xss(freeformcrit.critfreeform),
});

critiqueFreeformRouter
 .route('/')
 .get((req, res, next) => {
     const knexInstance = req.app.get("db");
     console.log(knexInstance)
     critiqueFreeformService
     .getAllFreeforms(knexInstance)
     .then((freeformcrits) => {
         res.json(freeformcrits.map((freeformcrit) => serializeFreeformcrit(freeformcrit)));
     })
     .catch((err) => {
        console.log(err);
        next(err);
     });
 })

 critiqueFreeformRouter
 .route('/:id')
 .post(bodyParser, (req, res, next) => {
     console.log('inside post')
    const {opening, critfreeform} = req.body;
    const freeFormCrit = {opening, critfreeform};
    critiqueFreeformService
    .insertFreeform(req.app.get("db"), freeFormCrit)

 })

 module.exports = critiqueFreeformRouter;