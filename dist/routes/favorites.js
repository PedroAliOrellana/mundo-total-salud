"use strict";

var express = require('express');

var router = express.Router();

var authenticateOwner = require('../middlewares/authenticateOwner');

var findUser = require('../middlewares/findUser');

var favoritesController = require('../controllers/FavoritesController');

var jwtMiddleware = require('express-jwt');

var secrets = require('../config/secrets');

router.route('/').get(jwtMiddleware({
  secret: secrets.jwtSecret
}), findUser, favoritesController.index).post(favoritesController.create);
router.route('/:id')["delete"](favoritesController.find, authenticateOwner, favoritesController.destroy);
module.exports = router;