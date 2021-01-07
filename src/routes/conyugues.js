const express = require('express');

let router = require('express-promise-router')();

const conyugueController = require('../controllers/conyugueController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(conyugueController.index)
  .post(conyugueController.create)
 //
router.route('/:id')
   .get(conyugueController.find,conyugueController.show)
   .put(conyugueController.findId,conyugueController.update)
   .delete(conyugueController.findId,conyugueController.destroy);

module.exports = router;