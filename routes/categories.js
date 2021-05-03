var express = require('express');
var router = express.Router();
const database = require('../database');

router.get('/', async function (req, res, next) {
    let categories = await database.getCategories();
    res.json(categories);
});

router.post('/', async function (req, res, next) {
    let categories = await database.getCategories();
    res.json(categories);
});

module.exports = router;