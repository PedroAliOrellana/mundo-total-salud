"use strict";

var express = require('express');

var router = express.Router();

var preguntaUsuarioController = require('../controllers/preguntaUsuarioController');

router.route('/').get(preguntaUsuarioController.index).post(preguntaUsuarioController.create);
router.route('/:id').post(preguntaUsuarioController.findByUser);
router.route('/dlt/').post(preguntaUsuarioController.destroy);
module.exports = router;