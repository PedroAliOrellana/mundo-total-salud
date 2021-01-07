const express = require('express');

let router = express.Router();

const preguntasController = require('../controllers/PreguntasController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(preguntasController.index)
  .post(preguntasController.create)
 
router.route('/search')
  .get(preguntasController.buscarInactiva)
  .post(preguntasController.activarPregunta)
  
router.route('/:id')
  .get(preguntasController.find,preguntasController.show)
  .post(preguntasController.find,preguntasController.update)
  
router.route('/dlt/:id')
  .post(preguntasController.find,preguntasController.destroy);
 


module.exports = router;
