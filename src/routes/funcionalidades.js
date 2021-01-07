const express = require('express');

let router = require('express-promise-router')();

const funcionalidadesController = require('../controllers/FuncionalidadesController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(funcionalidadesController.index)
  .post(funcionalidadesController.create)
 //
router.route('/:id')
   .get(funcionalidadesController.find,funcionalidadesController.show)
   .post(funcionalidadesController.agregarChildren)
   .put(funcionalidadesController.find,funcionalidadesController.update)
   .delete(funcionalidadesController.find,funcionalidadesController.destroy);
router.route('/rol/:id')
   .get(funcionalidadesController.menu)

module.exports = router;
