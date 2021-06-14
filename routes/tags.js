var express = require('express');
var router = express.Router();
const database = require('../database');

router.get('/', async function (req, res, next) {
    let tags = await database.getTags();
    res.json(tags);
});

module.exports = router;