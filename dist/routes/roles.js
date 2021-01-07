"use strict";

var express = require('express');

var router = express.Router();

var rolesController = require('../controllers/RolesController');

var authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/').get(rolesController.index).post(rolesController.create); //

router.route('/:id').get(rolesController.find, rolesController.show).put(rolesController.find, rolesController.update)["delete"](rolesController.find, rolesController.destroy);
module.exports = router;