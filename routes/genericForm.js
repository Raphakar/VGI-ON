var express = require('express');
var router = express.Router();
const database = require('../database');

router.get('/', async function (req, res, next) {
    let formTemplates = await database.getFormTemplates();
    res.json(formTemplates);
});

router.post('/', async function (req, res, next) {
    let formTemplate = req.body.formTemplate
    await database.insertFormTemplate(formTemplate);
    res.status(200).send("Inserted!");
});

module.exports = router;