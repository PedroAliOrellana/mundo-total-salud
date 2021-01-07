"use strict";

var express = require('express');

var router = require('express-promise-router')();

var herederoController = require('../controllers/HerederoController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(herederoController.index).post(herederoController.create); //

router.route('/:id').get(herederoController.find, herederoController.show).put(herederoController.findId, herederoController.update)["delete"](herederoController.findId, herederoController.destroy);
module.exports = router;