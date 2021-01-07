"use strict";

var Application = require('../models/Application');

module.exports = function (req, res, next) {
  if (req.application) return next();
  var applicationId = req.headers.application;
  if (!applicationId) return next();
  Application.findOne({
    applicationId: applicationId
  }).then(function (app) {
    if (!app) return next(new Error('Invalid Application'));
    req.application = app;
    req.validRequest = req.application.origins.split(",").find(function (origin) {
      origin = origin.replace(/\s/g, '');
      console.log(req.headers.origin);
      return origin == req.headers.origin;
    });
    next();
  })["catch"](next);
};