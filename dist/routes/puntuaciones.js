"use strict";

var express = require('express');

var router = express.Router();

var puntuacionesController = require('../controllers/PuntuacionesController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(puntuacionesController.index).post(puntuacionesController.create); //

router.route('/:id').get(puntuacionesController.find, puntuacionesController.show).put(puntuacionesController.find, puntuacionesController.update)["delete"](puntuacionesController.find, puntuacionesController.destroy);
module.exports = router;