"use strict";

var express = require('express');

var router = express.Router();

var rondasController = require('../controllers/RondasController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(rondasController.index).post(rondasController.create); //

router.route('/:id').get(rondasController.find, rondasController.show).put(rondasController.find, rondasController.update)["delete"](rondasController.find, rondasController.destroy);
module.exports = router;