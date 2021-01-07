const express = require('express');

let router = require('express-promise-router')();

const herederoController = require('../controllers/HerederoController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(herederoController.index)
  .post(herederoController.create)
 //
router.route('/:id')
   .get(herederoController.find,herederoController.show)
   .put(herederoController.findId,herederoController.update)
   .delete(herederoController.findId,herederoController.destroy);

module.exports = router;