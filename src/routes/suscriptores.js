const express = require('express');

let router = require('express-promise-router')();

const suscriptorController = require('../controllers/SuscriptoresController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(suscriptorController.index)
  .post(suscriptorController.create)
router.route('/hijos/:cedula')
  .get(suscriptorController.findHijos)
router.route('/nietos/:cedula')
  .get(suscriptorController.findNietos)  
router.route('/bisnietos/:cedula')
.get(suscriptorController.findBisnietos)
router.route('/activo/')
  .get(suscriptorController.findActivos)
router.route('/correo/:id')
    .get(suscriptorController.findByCorreo,suscriptorController.show)
router.route('/heredero/:id')
    .post(suscriptorController.crearHeredero)
router.route('/conyugue/:id')
    .post(suscriptorController.crearConyugue)
router.route('/:id')
  .get(suscriptorController.find,suscriptorController.show)
  .post(suscriptorController.find,suscriptorController.update)
  .delete(suscriptorController.find,suscriptorController.destroy);

module.exports = router;
