"use strict";

var buildParams = require('./helpers').buildParams;

var validParams = ['_place', 'reaction', 'observation'];

var Visit = require('../models/Visit');

var User = require('../models/User');

function find(req, res, next) {
  Visit.findById(req.params.visit_id).then(function (visit) {
    req.mainObj = visit;
    req.visit = visit;
    next();
  })["catch"](next);
}

function index(req, res) {
  //req.user
  var promise = null;

  if (req.place) {
    promise = req.place.visits;
  } else if (req.user) {
    promise = Visit.forUser(req.user.id, req.query.page || 1);
  }

  if (promise) {
    promise.then(function (visits) {
      res.json(visits);
    })["catch"](function (error) {
      res.status(500).json({
        error: error
      });
    });
  } else {
    res.status(404).json({});
  }
}

function create(req, res) {
  var params = buildParams(validParams, req.body);
  params['_user'] = req.user.id;
  Visit.create(params).then(function (visit) {
    res.json(visit);
  })["catch"](function (error) {
    res.status(422).json({
      error: error
    });
  });
}

function destroy(req, res) {
  req.visit.remove().then(function (doc) {
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