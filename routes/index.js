var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var categoriesRouter = require('./categories');

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);


module.exports = router;
