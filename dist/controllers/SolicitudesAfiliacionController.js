"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Solicitud = require('../models/SolicitudAfiliacion');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var validParams = ['cedula', 'nombre', 'apellido', 'correo', 'telefono', 'fecha_creacion', 'fecha_nacimiento', 'cedula_auspiciador', 'fecha_actualizacion', 'estatus', 'banco_pago'];

function find(req, res, next) {
  Solicitud.findOne({
    cedula: req.params.id
  }).then(function (solicitud) {
    req.solicitud = solicitud;
    req.mainObj = solicitud;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Solicitud.find({
    estatus: 1
  }).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(_x, _x2) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newSolicitud;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Crear nuevos lugares
            newSolicitud = new Solicitud(req.body);
            _context.next = 3;
            return newSolicitud.save();

          case 3:
            req.solicitud = newSolicitud;
            res.status(201).json(newSolicitud);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

function show(req, res) {
  //Busqueda individual
  if (req.solicitud != null) {
    return res.status(200).json(req.solicitud);
  } else {
    return res.status(204).json({});
  }
}

function update(_x3, _x4) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var params;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!req.solicitud) {
              _context2.next = 8;
              break;
            }

            params = helpers.buildParams(validParams, req.body);
            req.solicitud = Object.assign(req.solicitud, params);
            _context2.next = 5;
            return req.solicitud.save();

          case 5:
            res.status(201).json(req.solicitud);
            _context2.next = 9;
            break;

          case 8:
            res.status(403).json({});

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _update.apply(this, arguments);
}

function destroy(req, res) {
  //Eliminar recursos
  req.solicitud.remove().then(function (doc) {
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