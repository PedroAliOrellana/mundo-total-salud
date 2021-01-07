"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Heredero = require('../models/Heredero');

function create(_x, _x2) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var heredero;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            heredero = new Heredero(req.body);
            _context.next = 3;
            return Heredero.create(heredero);

          case 3:
            res.status(200).json(heredero);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

function index(_x3, _x4) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var heredero;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Heredero.find();

          case 2:
            heredero = _context2.sent;
            res.status(200).json(heredero);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _index.apply(this, arguments);
}

function find(_x5, _x6, _x7) {
  return _find.apply(this, arguments);
}

function _find() {
  _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var id, heredero;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return Heredero.findOne({
              cedula_afiliado: id
            });

          case 3:
            heredero = _context3.sent;
            req.heredero = heredero;
            next();

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _find.apply(this, arguments);
}

function findId(_x8, _x9, _x10) {
  return _findId.apply(this, arguments);
}

function _findId() {
  _findId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id, heredero;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return Heredero.findById(id);

          case 3:
            heredero = _context4.sent;
            req.heredero = heredero;
            next();

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _findId.apply(this, arguments);
}

function show(_x11, _x12) {
  return _show.apply(this, arguments);
}

function _show() {
  _show = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (req.heredero) {
              res.status(200).json(req.heredero);
            } else {
              res.status(204).json({});
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _show.apply(this, arguments);
}

function update(_x13, _x14) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            req.heredero = Object.assign(req.heredero, req.body);
            _context6.next = 3;
            return req.heredero.save();

          case 3:
            res.status(201).json(req.heredero);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _update.apply(this, arguments);
}

function destroy(_x15, _x16) {
  return _destroy.apply(this, arguments);
}

function _destroy() {
  _destroy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!req.heredero) {
              _context7.next = 6;
              break;
            }

            _context7.next = 3;
            return req.heredero.remove();

          case 3:
            res.status(200).json({});
            _context7.next = 7;
            break;

          case 6:
            res.status(204).json({});

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _destroy.apply(this, arguments);
}

module.exports = {
  create: create,
  index: index,
  find: find,
  show: show,
  update: update,
  destroy: destroy,
  findId: findId
};