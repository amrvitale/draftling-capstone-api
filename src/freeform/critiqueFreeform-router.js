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
 .route('/draftling/:id')
 .post(bodyParser, (req, res, next) => {
    const {opening, critFreeform} = req.body;
    const freeFormCrit = {opening, critFreeform};
    critiqueFreeformService
    .insertFreeform(req.app.get("db"), freeFormCrit)

 })

 module.exports = critiqueFreeformRouter;