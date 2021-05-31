var express = require('express');
var fs = require('fs');
var router = express.Router();
const database = require('../database');
const folderControl = require("../services/folderControl")
router.get('/', async function (req, res, next) {
    let categories = await database.getCategories();
    res.json("categories");
});

router.post('/', async function (req, res, next) {
    console.log(req.body);
    const currentDate = new Date();
    try {
        const path = folderControl.createIfNotExistsPhotoFolder();
        folderControl.addFileToFolder(path+currentDate.toISOString()+".png", req.body.photoToSubmit.image);
            
    } catch (error) {
        console.log(error)
    }
    res.send("categories");
});

module.exports = router;