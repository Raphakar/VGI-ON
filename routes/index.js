var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var categoriesRouter = require('./categories');
var photosRouter = require('./photos');

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/photos', photosRouter);


module.exports = router;
