"use strict";

var buildParams = require('./helpers').buildParams;

var validParams = ['origins', 'name'];

var Application = require('../models/Application');

function find(req, res, next) {
  Application.findById(req.params.id).then(function (application) {
    req.mainObj = application;
    req.application = application;
    next();
  })["catch"](next);
}

function index(req, res) {}

function create(req, res) {
  var params = buildParams(validParams, req.body);
  Application.create(params).then(function (application) {
    res.json(application);
  })["catch"](function (error) {
    res.status(422).json({
      error: error
    });
  });
}

function destroy(req, res) {
  req.application.remove().then(function (doc) {
    res.json({});
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
}

module.exports = {
  create: create,
  find: find,
  destroy: destroy,
  index: index
};