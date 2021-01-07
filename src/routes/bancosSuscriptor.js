const express = require('express');

let router = require('express-promise-router')();

const BancoSuscriptorController = require('../controllers/BancoSuscriptorController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(BancoSuscriptorController.index)
  .post(BancoSuscriptorController.create)
 //
router.route('/:id')
   .get(BancoSuscriptorController.find,BancoSuscriptorController.show)
   .put(BancoSuscriptorController.findId,BancoSuscriptorController.update)
   .delete(BancoSuscriptorController.findId,BancoSuscriptorController.destroy);

module.exports = router;