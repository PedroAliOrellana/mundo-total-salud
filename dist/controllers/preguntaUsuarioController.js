"use strict";

var Pregunta = require('../models/PreguntaUsuario');

var helpers = require('./helpers');

var validParams = ['pregunta', 'respuesta1', 'respuesta2', 'respuesta3', 'respuesta4', 'opcioncorrecta', 'opcionselect', 'status', 'tipo', 'ronda', 'slug'];

function index(req, res) {
  //Todos los lugares
  Pregunta.find().sort({
    nro: '-1'
  }).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function findByUser(req, res) {
  //Todos los lugares
  Pregunta.find().where({
    slug: req.params.id
  }).sort({
    nro: '-1'
  }).then(function (docs) {
    res.json(docs);
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

function destroy(req, res) {
  //Eliminar recursos
  Pregunta.remove().where({
    slug: req.body.slug
  }).then(function (doc) {
    res.json({});
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  findByUser: findByUser
};