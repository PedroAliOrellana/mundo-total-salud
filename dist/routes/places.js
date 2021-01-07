"use strict";

var express = require('express');

var router = express.Router();

var placesController = require('../controllers/PlacesController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(placesController.index).post(placesController.multerMiddleware(), placesController.create, placesController.saveImage);
router.route('/:id').get(placesController.find, placesController.show).put(placesController.find, authenticateOwner, placesController.update)["delete"](placesController.find, authenticateOwner, placesController.destroy);
module.exports = router;