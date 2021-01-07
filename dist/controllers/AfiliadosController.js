"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Afiliado = require('../models/Afiliado');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var validParams = ['cedula', 'nombre', 'apellido', 'fecha_nacimiento', 'correo', 'telefono', 'fecha_creacion', 'linea', 'nivel', 'cedula_auspiciador', 'cedula_abuelo', 'cedula_bisabuelo', 'hijos', 'nietos', 'bisnietos', 'estatus'];

function find(req, res, next) {
  Afiliado.findOne({
    cedula: req.params.id
  }).then(function (afiliado) {
    req.afiliado = afiliado;
    req.mainObj = afiliado;
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
    var afiliado;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Afiliado.findOne({
              correo: req.params.id
            });

          case 2:
            afiliado = _context.sent;

            if (afiliado) {
              req.afiliado = afiliado;
              req.mainObj = afiliado;
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
  //Todos los afiliados
  Afiliado.find({}).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function findActivos(req, res) {
  //Todos los afiliados activos
  Afiliado.find({
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
            return Afiliado.create(params);

          case 3:
            doc = _context2.sent;

            if (doc) {
              req.afiliado = doc;
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
    var newHer, id, afiliado;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newHer = req.body;
            id = req.params.id;
            _context3.next = 4;
            return Afiliado.findOne({
              cedula: id
            });

          case 4:
            afiliado = _context3.sent;
            afiliado.heredero = newHer;
            afiliado.save();
            res.status(201).json(afiliado);

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
    var newCon, id, afiliado;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            newCon = req.body;
            id = req.params.id;
            _context4.next = 4;
            return Afiliado.findOne({
              cedula: id
            });

          case 4:
            afiliado = _context4.sent;
            afiliado.conyugue = newCon;
            afiliado.save();
            res.status(201).json(afiliado);

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
  Afiliado.find({
    cedula_auspiciador: req.params.cedula
  }).sort({
    fecha_creacion: -1
  }).then(function (afiliados) {
    res.json(afiliados);
  })["catch"](function (err) {
    res.json(err);
  });
}

function findNietos(req, res) {
  Afiliado.find({
    cedula_abuelo: req.params.cedula
  }).sort({
    fecha_creacion: -1
  }).then(function (afiliados) {
    res.json(afiliados);
  })["catch"](function (err) {
    res.json(err);
  });
}

function findBisnietos(req, res) {
  Afiliado.find({
    cedula_bisabuelo: req.params.cedula
  }).sort({
    fecha_creacion: -1
  }).then(function (afiliados) {
    res.json(afiliados);
  })["catch"](function (err) {
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  if (req.afiliado == null) {
    res.status(204);
    res.json({});
  } else {
    res.status(200);
    res.json(req.afiliado);
  }
}

function update(req, res) {
  //Actualizar un afiliado
  var params = helpers.buildParams(validParams, req.body);
  req.afiliado = Object.assign(req.afiliado, params);
  req.afiliado.save().then(function (doc) {
    res.status(201).json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.afiliado.remove().then(function (doc) {
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