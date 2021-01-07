"use strict";

var jwt = require('jsonwebtoken');

var secrets = require('../config/secrets');

var User = require('../models/User');

function authenticate(req, res, next) {
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (user) {
      user.verifyPassword(req.body.password).then(function (valid) {
        if (valid) {
          req.user = user;
          next();
        } else {
          next();
        }
      });
    } else {
      next();
    }
  })["catch"](function (error) {
    return next(error);
  });
}

function generateToken(req, res, next) {
  if (!req.user) {
    return next();
  }

  req.token = jwt.sign({
    id: req.user._id
  }, secrets.jwtSecret);
  next();
}

function sendToken(req, res) {
  if (req.user) {
    res.status(200).json({
      user: req.user,
      jwt: req.token
    });
  } else {
    res.status(204).json({
      error: 'No se pudo iniciar Sesion'
    });
  }
}

module.exports = {
  authenticate: authenticate,
  generateToken: generateToken,
  sendToken: sendToken
};