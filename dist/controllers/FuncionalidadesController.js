"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Funcionalidad = require('../models/Funcionalidad');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var validParams = ['nombre', 'descripcion', 'id_funcion_padre', 'icono', 'orden', 'nivel', 'url_vista', 'fecha_creacion', 'estatus'];

function find(req, res, next) {
  Funcionalidad.findOne({
    _id: req.params.id
  }).populate('children').then(function (funcionalidad) {
    req.funcionalidad = funcionalidad;
    req.mainObj = funcionalidad;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Funcionalidad.find().then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function agregarChildren(_x, _x2) {
  return _agregarChildren.apply(this, arguments);
}

function _agregarChildren() {
  _agregarChildren = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newFunc, id, resPost;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newFunc = new Funcionalidad(req.body);
            _context.next = 3;
            return newFunc.save();

          case 3:
            id = req.params.id;
            _context.next = 6;
            return Funcionalidad.findById(id);

          case 6:
            resPost = _context.sent;
            resPost.children = resPost.children.concat([newFunc]);
            _context.next = 10;
            return resPost.save();

          case 10:
            res.status(201).json(newFunc);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _agregarChildren.apply(this, arguments);
}

function menu(_x3, _x4) {
  return _menu.apply(this, arguments);
}

function _menu() {
  _menu = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, rol;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return Funcionalidad.find({
              rol: id
            }).populate('children');

          case 3:
            rol = _context2.sent;
            res.status(200).json(rol);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _menu.apply(this, arguments);
}

function create(req, res) {
  //Crear nuevos lugares
  var params = helpers.buildParams(validParams, req.body);
  Funcionalidad.create(params).then(function (doc) {
    req.funcionalidad = doc;
    res.json(doc);
  })["catch"](function (err) {
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  res.json(req.funcionalidad);
}

function update(req, res) {
  //Actualizar un recurso
  var params = helpers.buildParams(validParams, req.body);
  req.funcionalidad = Object.assign(req.funcionalidad, params);
  req.funcionalidad.save().then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.funcionalidad.remove().then(function (doc) {
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
  agregarChildren: agregarChildren,
  menu: menu
};