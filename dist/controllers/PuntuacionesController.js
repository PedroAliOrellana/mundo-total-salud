"use strict";

var Puntuacion = require('../models/Puntuacion');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var validParams = ['puntos', 'tiempo', '_slug'];

function find(req, res, next) {
  Puntuacion.find({
    _slug: req.params.id
  }).then(function (puntuacion) {
    req.puntuacion = puntuacion;
    req.mainObj = puntuacion;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Puntuacion.find().then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(req, res) {
  //Crear nuevos lugares
  var params = helpers.buildParams(validParams, req.body);
  Puntuacion.create(params).then(function (doc) {
    req.puntuacion = doc;
    res.json(doc);
  })["catch"](function (err) {
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  res.json(req.puntuacion);
}

function update(req, res) {
  //Actualizar un recurso
  var params = helpers.buildParams(validParams, req.body);
  req.puntuacion = Object.assign(req.puntuacion, params);
  req.puntuacion.save().then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.puntuacion.remove().then(function (doc) {
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