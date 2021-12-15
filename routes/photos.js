var express = require('express');
var fs = require('fs');
var router = express.Router();
const database = require('../database');
const folderControl = require("../services/folderControl")
router.get('/', async function (req, res, next) {
    let photos = await database.getPhotos();
    res.json(photos);
});

router.post('/', async function (req, res, next) {
    try {
        const photo = req.body.photoToSubmit;
        const path = folderControl.createIfNotExistsPhotoFolder();
        const filePath = path + Date.now() + ".png";
        let base64Image = photo.image.split(';base64,').pop();
        await folderControl.addFileToFolder(filePath, base64Image);
        let tags = photo.tags.split(",");
        tags = tags.length > 0 ? tags.map(e => { return { name: e.trim() } }).filter(e => e.name) : [];
        let tagIds = await database.insertTags(tags);
        let photoObject = {
            title: photo.title,
            file: filePath,
            location: {
                type: "Point",
                location: [req.body.location.latitude, req.body.location.longitude],
            },
            description: photo.description,
            category: req.body.categorySelected,
            listTags: tagIds,
            pictureDate: photo.photoDate,
            dateUploaded: new Date(),
            direction: req.body.location.direction,
            genericFormValues: req.body.genericFormValues
        };
        await database.insertPhoto(photoObject);
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

module.exports = router;