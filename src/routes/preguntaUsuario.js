const express = require('express');

let router = express.Router();

const preguntaUsuarioController = require('../controllers/preguntaUsuarioController');

router.route('/')
  .get(preguntaUsuarioController.index)
  .post(preguntaUsuarioController.create)
router.route('/:id')
  .post(preguntaUsuarioController.findByUser)
router.route('/dlt/')
  .post(preguntaUsuarioController.destroy);
 


module.exports = router;
