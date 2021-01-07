"use strict";

var express = require('express');

var router = require('express-promise-router')();

var solicitudesAfiliacionController = require('../controllers/SolicitudesAfiliacionController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(solicitudesAfiliacionController.index).post(solicitudesAfiliacionController.create); //

router.route('/:id').get(solicitudesAfiliacionController.find, solicitudesAfiliacionController.show).put(solicitudesAfiliacionController.find, solicitudesAfiliacionController.update)["delete"](solicitudesAfiliacionController.find, solicitudesAfiliacionController.destroy);
module.exports = router;