const express = require('express');

let router = require('express-promise-router')();

const funcionalidadesRolController = require('../controllers/FuncionalidadesRolController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(funcionalidadesRolController.index)
  .post(funcionalidadesRolController.create)
 //
 router.route('/:id')
   .get(funcionalidadesRolController.find,funcionalidadesRolController.show)
   .put(funcionalidadesRolController.find,funcionalidadesRolController.update)
   .delete(funcionalidadesRolController.find,funcionalidadesRolController.destroy);
  router.route('/menu/:id')
    .get(funcionalidadesRolController.menu)
    .post(funcionalidadesRolController.nuevaFuncionalidad)  
  router.route('/menu/:id/:idfunc')
    .delete(funcionalidadesRolController.elimiarFuncionalidad)
module.exports = router;
