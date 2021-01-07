"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Suscriptor = require('../models/Suscriptor');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var validParams = ['cedula', 'nombre', 'apellido', 'fecha_nacimiento', 'correo', 'telefono', 'fecha_creacion', 'linea', 'nivel', 'cedula_auspiciador', 'cedula_abuelo', 'cedula_bisabuelo', 'hijos', 'nietos', 'bisnietos', 'estatus'];

function find(req, res, next) {
  Suscriptor.findOne({
    cedula: req.params.id
  }).then(function (suscriptor) {
    req.suscriptor = suscriptor;
    req.mainObj = suscriptor;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function findByCorreo(_x, _x2, _x3) {
  return _findByCorreo.apply(this, arguments);
}

function _findByCorreo() {
  _findByCorreo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var suscriptor;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Suscriptor.findOne({
              correo: req.params.id
            });

          case 2:
            suscriptor = _context.sent;

            if (suscriptor) {
              req.suscriptor = suscriptor;
              req.mainObj = suscriptor;
            }

            next();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findByCorreo.apply(this, arguments);
}

function index(req, res) {
  //Todos los suscriptor
  Suscriptor.find({}).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function findActivos(req, res) {
  //Todos los suscriptor activos
  Suscriptor.find({
    estatus: req.params.estatus
  }).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(_x4, _x5) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var params, doc;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //Crear nuevos lugares
            params = helpers.buildParams(validParams, req.body);
            _context2.next = 3;
            return Suscriptor.create(params);

          case 3:
            doc = _context2.sent;

            if (doc) {
              req.suscriptor = doc;
              res.status(200).json(doc);
            } else {
              res.status(422).json({});
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create.apply(this, arguments);
}

function crearHeredero(_x6, _x7) {
  return _crearHeredero.apply(this, arguments);
}

function _crearHeredero() {
  _crearHeredero = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var newHer, id, suscriptor;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newHer = req.body;
            id = req.params.id;
            _context3.next = 4;
            return Suscriptor.findOne({
              cedula: id
            });

          case 4:
            suscriptor = _context3.sent;
            suscriptor.heredero = newHer;
            suscriptor.save();
            res.status(201).json(suscriptor);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _crearHeredero.apply(this, arguments);
}

function crearConyugue(_x8, _x9) {
  return _crearConyugue.apply(this, arguments);
}

function _crearConyugue() {
  _crearConyugue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var newCon, id, suscriptor;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            newCon = req.body;
            id = req.params.id;
            _context4.next = 4;
            return Suscriptor.findOne({
              cedula: id
            });

          case 4:
            suscriptor = _context4.sent;
            suscriptor.conyugue = newCon;
            suscriptor.save();
            res.status(201).json(suscriptor);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _crearConyugue.apply(this, arguments);
}

function findHijos(req, res) {
  Suscriptor.find({
    cedula_auspiciador: req.params.cedula
  }).sort({
    fecha_creacion: -1
  }).then(function (suscriptor) {
    res.json(suscriptor);
  })["catch"](function (err) {
    res.json(err);
  });
}

function findNietos(req, res) {
  Suscriptor.find({
    cedula_abuelo: req.params.cedula
  }).sort({
    fecha_creacion: -1
  }).then(function (suscriptor) {
    res.json(suscriptor);
  })["catch"](function (err) {
    res.json(err);
  });
}

function findBisnietos(req, res) {
  Suscriptor.find({
    cedula_bisabuelo: req.params.cedula
  }).sort({
    fecha_creacion: -1
  }).then(function (suscriptor) {
    res.json(suscriptor);
  })["catch"](function (err) {
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  if (req.suscriptor == null) {
    res.status(204);
    res.json({});
  } else {
    res.status(200);
    res.json(req.suscriptor);
  }
}

function update(req, res) {
  //Actualizar un suscriptor
  var params = helpers.buildParams(validParams, req.body);
  req.suscriptor = Object.assign(req.suscriptor, params);
  req.suscriptor.save().then(function (doc) {
    res.status(201).json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.suscriptor.remove().then(function (doc) {
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
  findActivos: findActivos,
  findHijos: findHijos,
  findBisnietos: findBisnietos,
  findNietos: findNietos,
  findByCorreo: findByCorreo,
  crearHeredero: crearHeredero,
  crearConyugue: crearConyugue
};