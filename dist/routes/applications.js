"use strict";

var express = require('express');

var router = express.Router();

var authenticateAdmin = require('../middlewares/authenticateAdmin');

var findUser = require('../middlewares/findUser');

var applicationsController = require('../controllers/applicationsController');

var jwtMiddleware = require('express-jwt');

var secrets = require('../config/secrets');

router.all('*', jwtMiddleware({
  secret: secrets.jwtSecret
}), findUser, authenticateAdmin);
router.route('/').get(applicationsController.index).post(applicationsController.create);
router.route('/:id')["delete"](applicationsController.find, applicationsController.destroy);
module.exports = router;