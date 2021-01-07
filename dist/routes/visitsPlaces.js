"use strict";

var express = require('express');

var router = express.Router();

var authenticateOwner = require('../middlewares/authenticateOwner');

var visitsController = require('../controllers/visitsController');

var placesController = require('../controllers/placesController');

router.route('/:id/visits').get(placesController.find, visitsController.index).post(placesController.find, visitsController.create);
router.route('/:id/visits/:visit_id')["delete"](visitsController.find, authenticateOwner, visitsController.destroy);
module.exports = router;