"use strict";

var Ronda = require('../models/Ronda');

var helpers = require('./helpers');

var validParams = ['nro', 'puntos'];

function find(req, res, next) {
  Ronda.findOne({
    nro: req.params.id
  }).then(function (ronda) {
    req.ronda = ronda;
    req.mainObj = ronda;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Ronda.find().then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(req, res) {
  //Crear nuevos lugares
  var params = helpers.buildParams(validParams, req.body);
  Ronda.create(params).then(function (doc) {
    req.ronda = doc;
    res.json(doc);
  })["catch"](function (err) {
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  res.json(req.ronda);
}

function update(req, res) {
  //Actualizar un recurso
  var params = helpers.buildParams(validParams, req.body);
  req.ronda = Object.assign(req.ronda, params);
  req.ronda.save().then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.ronda.remove().then(function (doc) {
    res.json({});
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

module.exports = {
  index: index,
  show: show,
  create: create,
  destroy: destroy,
  update: update,
  find: find
};