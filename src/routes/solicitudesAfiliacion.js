const express = require('express');

let router = require('express-promise-router')();

const solicitudesAfiliacionController = require('../controllers/SolicitudesAfiliacionController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(solicitudesAfiliacionController.index)
  .post(solicitudesAfiliacionController.create)
 //
 router.route('/:id')
   .get(solicitudesAfiliacionController.find,solicitudesAfiliacionController.show)
   .put(solicitudesAfiliacionController.find,solicitudesAfiliacionController.update)
   .delete(solicitudesAfiliacionController.find,solicitudesAfiliacionController.destroy);

module.exports = router;
