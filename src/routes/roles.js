const express = require('express');

let router = express.Router();

const rolesController = require('../controllers/RolesController');

const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(rolesController.index)
  .post(rolesController.create)
 //
 router.route('/:id')
   .get(rolesController.find,rolesController.show)
   .put(rolesController.find,rolesController.update)
   .delete(rolesController.find,rolesController.destroy);

module.exports = router;
