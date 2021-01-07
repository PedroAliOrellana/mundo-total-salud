"use strict";

var Application = require('../models/Application');

module.exports = function (req, res, next) {
  if (req.xhr) return next();
  var secret = req.headers.secret;
  if (!secret) return next();
  Application.findOne({
    secret: secret
  }).then(function (app) {
    if (!app) return next(new Error('Invalid application'));
    req.application = app;
    req.validRequest = true;
    next();
  })["catch"](function (error) {
    next(error);
  });
};