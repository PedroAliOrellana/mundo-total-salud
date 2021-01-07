"use strict";

var express = require('express');

var router = require('express-promise-router')();

var conyugueController = require('../controllers/conyugueController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(conyugueController.index).post(conyugueController.create); //

router.route('/:id').get(conyugueController.find, conyugueController.show).put(conyugueController.findId, conyugueController.update)["delete"](conyugueController.findId, conyugueController.destroy);
module.exports = router;