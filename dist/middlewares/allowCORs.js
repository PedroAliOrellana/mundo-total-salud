"use strict";

var expressUnless = require('express-unless');

module.exports = function (options) {
  var CORsMiddleware = function CORsMiddleware(req, res, next) {
    if (req.application) {
      req.application.origins.split(",").forEach(function (origin) {
        res.header("Access-Control-Allow-Origin", origin);
      });
    } else {
      res.header("Access-Control-Allow-Origin", '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    }

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Application");
    next();
  };

  CORsMiddleware.unless = expressUnless;
  return CORsMiddleware;
};