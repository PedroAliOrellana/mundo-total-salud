const express = require('express');
let router = require('express-promise-router')();

const usersController = require('../controllers/UsersController');

const sessionsController = require('../controllers/SessionsController');

router.route('/')

  .get(usersController.index)  
  .put(usersController.findByToken)
  .post(
      usersController.create,
      sessionsController.generateToken,
      usersController.finish);
router.route('/:id')
  .get(usersController.find,usersController.show)
  .put(usersController.find,usersController.update)
  .delete(usersController.find,usersController.destroy)
router.route('/restaurar/:id') 
 .get(usersController.find,usersController.recuperarContrasena) /* 
router.route('/crearPassword/:id/:password') 
 .get(usersController.findByToken) */
module.exports = router;
