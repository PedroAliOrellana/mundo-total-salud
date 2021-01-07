"use strict";

var express = require('express');

var router = require('express-promise-router')();

var afiliadosController = require('../controllers/AfiliadosController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(afiliadosController.index).post(afiliadosController.create);
router.route('/hijos/:cedula').get(afiliadosController.findHijos);
router.route('/nietos/:cedula').get(afiliadosController.findNietos);
router.route('/bisnietos/:cedula').get(afiliadosController.findBisnietos);
router.route('/activo/').get(afiliadosController.findActivos);
router.route('/correo/:id').get(afiliadosController.findByCorreo, afiliadosController.show);
router.route('/heredero/:id').post(afiliadosController.crearHeredero);
router.route('/conyugue/:id').post(afiliadosController.crearConyugue);
router.route('/:id').get(afiliadosController.find, afiliadosController.show).post(afiliadosController.find, afiliadosController.update)["delete"](afiliadosController.find, afiliadosController.destroy);
module.exports = router;