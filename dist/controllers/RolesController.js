"use strict";

var Rol = require('../models/Rol');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var validParams = ['nombre', 'descripcion', 'fecha_creacion', 'estatus'];

function find(req, res, next) {
  Rol.find({
    id: req.params.id
  }).then(function (rol) {
    req.rol = rol;
    req.mainObj = rol;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Rol.find().then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(req, res) {
  //Crear nuevos lugares
  var params = helpers.buildParams(validParams, req.body);
  Rol.create(params).then(function (doc) {
    req.rol = doc;
    res.json(doc);
  })["catch"](function (err) {
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  res.json(req.rol);
}

function update(req, res) {
  //Actualizar un recurso
  var params = helpers.buildParams(validParams, req.body);
  req.rol = Object.assign(req.rol, params);
  req.rol.save().then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.rol.remove().then(function (doc) {
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