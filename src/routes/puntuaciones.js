const express = require('express');

let router = express.Router();

const puntuacionesController = require('../controllers/PuntuacionesController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(puntuacionesController.index)
  .post(puntuacionesController.create)
 //
 router.route('/:id')
   .get(puntuacionesController.find,puntuacionesController.show)
   .put(puntuacionesController.find,puntuacionesController.update)
   .delete(puntuacionesController.find,puntuacionesController.destroy);

module.exports = router;
