var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var categoriesRouter = require('./categories');
var photosRouter = require('./photos');
var tagsRouter = require('./tags');
var genericFormRouter = require('./genericForm');

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/photos', photosRouter);
router.use('/tags', tagsRouter);
router.use('/genericForm', genericFormRouter);


module.exports = router;
