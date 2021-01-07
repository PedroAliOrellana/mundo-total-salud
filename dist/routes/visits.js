"use strict";

var express = require('express');

var router = express.Router();

var authenticateOwner = require('../middlewares/authenticateOwner');

var visitsController = require('../controllers/visitsController');

var jwtMiddleware = require('express-jwt');

var secrets = require('../config/secrets');

router.route('/').get(jwtMiddleware({
  secret: secrets.jwtSecret
}), visitsController.index).post(visitsController.create);
router.route('/:visit_id')["delete"](visitsController.find, authenticateOwner, visitsController.destroy);
module.exports = router;