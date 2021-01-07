const express = require('express');

let router = express.Router();

const rondasController = require('../controllers/RondasController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(rondasController.index)
  .post(rondasController.create)
 //
 router.route('/:id')
   .get(rondasController.find,rondasController.show)
   .put(rondasController.find,rondasController.update)
   .delete(rondasController.find,rondasController.destroy);

module.exports = router;
