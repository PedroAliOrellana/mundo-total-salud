"use strict";

var express = require('express');

var router = require('express-promise-router')();

var funcionalidadesRolController = require('../controllers/FuncionalidadesRolController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(funcionalidadesRolController.index).post(funcionalidadesRolController.create); //

router.route('/:id').get(funcionalidadesRolController.find, funcionalidadesRolController.show).put(funcionalidadesRolController.find, funcionalidadesRolController.update)["delete"](funcionalidadesRolController.find, funcionalidadesRolController.destroy);
router.route('/menu/:id').get(funcionalidadesRolController.menu).post(funcionalidadesRolController.nuevaFuncionalidad);
router.route('/menu/:id/:idfunc')["delete"](funcionalidadesRolController.elimiarFuncionalidad);
module.exports = router;