"use strict";

var express = require('express');

var router = require('express-promise-router')();

var funcionalidadesController = require('../controllers/FuncionalidadesController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(funcionalidadesController.index).post(funcionalidadesController.create); //

router.route('/:id').get(funcionalidadesController.find, funcionalidadesController.show).post(funcionalidadesController.agregarChildren).put(funcionalidadesController.find, funcionalidadesController.update)["delete"](funcionalidadesController.find, funcionalidadesController.destroy);
router.route('/rol/:id').get(funcionalidadesController.menu);
module.exports = router;