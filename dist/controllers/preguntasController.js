"use strict";

var Pregunta = require('../models/Pregunta');

var helpers = require('./helpers');

var validParams = ['pregunta', 'respuesta1', 'respuesta2', 'respuesta3', 'respuesta4', 'opcioncorrecta', 'status', 'tipo', 'ronda'];

function find(req, res, next) {
  Pregunta.findOne({
    nro: req.params.id
  }).then(function (pregunta) {
    req.pregunta = pregunta;
    req.mainObj = pregunta;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Pregunta.find().where({
    status: 1
  }).sort({
    nro: '-1'
  }).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function buscarInactiva(req, res) {
  //Todos los lugares
  Pregunta.find().where({
    status: 3
  }).sort({
    nro: '1'
  }).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function activarPregunta(req, res) {
  //buscar pregunta para conquis
  Pregunta.findOne({
    status: 2
  }).then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(req, res) {
  //Crear nuevos lugares
  var params = helpers.buildParams(validParams, req.body);
  Pregunta.create(params).then(function (doc) {
    req.pregunta = doc;
    res.json(doc);
  })["catch"](function (err) {
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  res.json(req.pregunta);
}

function update(req, res) {
  //Actualizar un recurso
  var params = helpers.buildParams(validParams, req.body);
  req.pregunta = Object.assign(req.pregunta, params);
  req.pregunta.save().then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.pregunta.remove().then(function (doc) {
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
  find: find,
  activarPregunta: activarPregunta,
  buscarInactiva: buscarInactiva
};