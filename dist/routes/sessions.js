"use strict";

var express = require('express');

var router = express.Router();

var sessionsController = require('../controllers/sessionsController');

router.route('/').post(sessionsController.authenticate, sessionsController.generateToken, sessionsController.sendToken);
module.exports = router;