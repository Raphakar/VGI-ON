var express = require('express');
var router = express.Router();
const database = require('../database');
/* GET home page. */
router.get('/', async function(req, res, next) {
    let users = await database.getUsers()
    console.log(users)
});

module.exports = router;
