"use strict";

var Application = require('../models/Application');

module.exports = function (options) {
  var AuthApp = function AuthApp(req, res, next) {
    Application.count({}).then(function (appCount) {
      if (appCount > 0 && !req.application) return next(new Error('An application is required to consume this API'));
      if (!req.validRequest) return next(new Error('Origin invalid'));
      next();
    })["catch"](next);
  };

  AuthApp.unless = require('express-unless');
  return AuthApp;
};