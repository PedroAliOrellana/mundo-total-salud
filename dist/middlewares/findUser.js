"use strict";

var User = require('../models/User');

module.exports = function (req, res, next) {
  if (req.user) {
    User.findById(req.user.id).then(function (user) {
      req.fullUser = user;
      next();
    });
  } else {
    next();
  }
};