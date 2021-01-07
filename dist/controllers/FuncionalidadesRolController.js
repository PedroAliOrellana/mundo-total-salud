"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var FuncionalidadRol = require('../models/rolFuncionalidad');

var Funcionalidad = require('../models/funcionalidad');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var _require = require('../config/upload'),
    array = _require.array;

var rolFuncionalidad = require('../models/rolFuncionalidad');

var validParams = ['id_rol', 'funcionalidad', 'fecha_creacion', 'estatus'];

function find(_x, _x2, _x3) {
  return _find.apply(this, arguments);
}

function _find() {
  _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var funcR;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return FuncionalidadRol.findOne({
              id_rol: req.params.id
            });

          case 2:
            funcR = _context.sent;
            req.funcionalidadRol = funcR;
            req.mainObj = funcR;
            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _find.apply(this, arguments);
}

function index(_x4, _x5) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var funcionalidad;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return FuncionalidadRol.find();

          case 2:
            funcionalidad = _context2.sent;
            res.status(200).json(funcionalidad);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _index.apply(this, arguments);
}

function nuevaFuncionalidad(_x6, _x7) {
  return _nuevaFuncionalidad.apply(this, arguments);
}

function _nuevaFuncionalidad() {
  _nuevaFuncionalidad = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, newFunc, rolF;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            newFunc = new Funcionalidad(req.body);
            _context3.next = 4;
            return rolFuncionalidad.findOne({
              id_rol: id
            });

          case 4:
            rolF = _context3.sent;
            newFunc.rol = rolF;
            _context3.next = 8;
            return newFunc.save();

          case 8:
            rolF.funcionalidad = rolF.funcionalidad.concat([newFunc]);
            _context3.next = 11;
            return rolF.save();

          case 11:
            res.status(201).json(newFunc);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _nuevaFuncionalidad.apply(this, arguments);
}

function elimiarFuncionalidad(_x8, _x9) {
  return _elimiarFuncionalidad.apply(this, arguments);
}

function _elimiarFuncionalidad() {
  _elimiarFuncionalidad = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$params, id, idfunc, rolF;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, idfunc = _req$params.idfunc;
            _context4.next = 3;
            return rolFuncionalidad.findOne({
              id_rol: id
            });

          case 3:
            rolF = _context4.sent;
            rolF.funcionalidad.pull({
              _id: idfunc
            });
            _context4.next = 7;
            return rolF.save();

          case 7:
            res.status(201).json(rolF);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _elimiarFuncionalidad.apply(this, arguments);
}

function menu(_x10, _x11) {
  return _menu.apply(this, arguments);
}

function _menu() {
  _menu = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, rol;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return FuncionalidadRol.findOne({
              id_rol: id
            }).populate('funcionalidad');

          case 3:
            rol = _context5.sent;
            res.status(200).json(rol);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _menu.apply(this, arguments);
}

function create(_x12, _x13) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var newRF, rolF;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //Crear nuevos lugares

            /* const params = helpers.buildParams(validParams,req.body); */
            newRF = new rolFuncionalidad(req.body);
            _context6.next = 3;
            return FuncionalidadRol.create(newRF);

          case 3:
            rolF = _context6.sent;
            req.funcionalidadRol = rolF;
            res.status(201).json(rolF);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _create.apply(this, arguments);
}

function show(req, res) {
  //Busqueda individual
  res.json(req.funcionalidadRol);
}

function update(_x14, _x15) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var funcAct;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            //Actualizar un recurso
            req.funcionalidadRol = Object.assign(req.funcionalidadRol, req.body);
            _context7.next = 3;
            return req.funcionalidadRol.save();

          case 3:
            funcAct = _context7.sent;
            res.status(200).json(funcAct);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _update.apply(this, arguments);
}

function destroy(_x16, _x17) {
  return _destroy.apply(this, arguments);
}

function _destroy() {
  _destroy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!req.funcionalidadRol) {
              _context8.next = 6;
              break;
            }

            _context8.next = 3;
            return req.funcionalidadRol.remove();

          case 3:
            res.status(200).json({
              succes: true
            });
            _context8.next = 7;
            break;

          case 6:
            res.status(204).json({});

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _destroy.apply(this, arguments);
}

module.exports = {
  index: index,
  show: show,
  create: create,
  destroy: destroy,
  update: update,
  find: find,
  menu: menu,
  nuevaFuncionalidad: nuevaFuncionalidad,
  elimiarFuncionalidad: elimiarFuncionalidad
};