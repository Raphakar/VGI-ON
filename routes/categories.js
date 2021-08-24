var express = require('express');
var router = express.Router();
const database = require('../database');

router.get('/', async function (req, res, next) {
    let categories = await database.getCategories();
    res.json(categories);
});

router.get('/getGenericFormCategoriesAvailable', async function (req, res, next) {
    let categories = await database.getGenericFormCategoriesAvailable();
    res.json(categories);
});

router.get('/genericForm/:idCategory', async function (req, res, next) {
    let categoryGenericForm = await database.getCategoryGenericForm(req.params.idCategory);
    res.json(categoryGenericForm[0]);
});

router.post('/', async function (req, res, next) {
    let categories = await database.getCategories();
    res.json(categories);
});

module.exports = router;