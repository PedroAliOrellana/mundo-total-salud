"use strict";

var express = require('express');

var router = require('express-promise-router')();

var BancoSuscriptorController = require('../controllers/BancoSuscriptorController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(BancoSuscriptorController.index).post(BancoSuscriptorController.create); //

router.route('/:id').get(BancoSuscriptorController.find, BancoSuscriptorController.show).put(BancoSuscriptorController.findId, BancoSuscriptorController.update)["delete"](BancoSuscriptorController.findId, BancoSuscriptorController.destroy);
module.exports = router;