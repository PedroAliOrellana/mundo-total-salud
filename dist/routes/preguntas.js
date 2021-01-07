"use strict";

var express = require('express');

var router = express.Router();

var preguntasController = require('../controllers/PreguntasController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(preguntasController.index).post(preguntasController.create);
router.route('/search').get(preguntasController.buscarInactiva).post(preguntasController.activarPregunta);
router.route('/:id').get(preguntasController.find, preguntasController.show).post(preguntasController.find, preguntasController.update);
router.route('/dlt/:id').post(preguntasController.find, preguntasController.destroy);
module.exports = router;