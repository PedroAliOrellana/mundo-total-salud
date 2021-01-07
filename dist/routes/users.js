"use strict";

var express = require('express');

var router = require('express-promise-router')();

var usersController = require('../controllers/UsersController');

var sessionsController = require('../controllers/sessionsController');

router.route('/').get(usersController.index).put(usersController.findByToken).post(usersController.create, sessionsController.generateToken, usersController.finish);
router.route('/:id').get(usersController.find, usersController.show).put(usersController.find, usersController.update)["delete"](usersController.find, usersController.destroy);
router.route('/restaurar/:id').get(usersController.find, usersController.recuperarContrasena);
/* 
router.route('/crearPassword/:id/:password') 
.get(usersController.findByToken) */

module.exports = router;