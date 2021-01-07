"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var User = require('../models/User');

var jwt = require('jsonwebtoken');

var secrets = require('../config/secrets');

var helpers = require('./helpers');

var buildParams = require('./helpers').buildParams;

var nodemailer = require('nodemailer');

var validParams = ['email', 'password', 'fecha_creacion', 'id_rol', 'token', 'estatus'];

function create(req, res, next) {
  var params = buildParams(validParams, req.body);
  User.create(params).then(function (user) {
    req.user = user;
    next(); // res.json(user);
  })["catch"](function (error) {
    console.log(error);
    res.status(422).json({
      error: error
    });
  });
}

function find(req, res, next) {
  User.findOne({
    email: req.params.id
  }).select('email fecha_creacion fecha_actualizacion ultima_secion id_rol token estatus').then(function (user) {
    req.user = user;
    req.mainObj = user;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function finish(req, res) {
  if (req.user) {
    res.status(200).json({});
  } else {
    res.status(422).json({
      error: "No se pudo crear"
    });
  }
}

function findByToken(_x, _x2) {
  return _findByToken.apply(this, arguments);
}

function _findByToken() {
  _findByToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, id, password, usuario;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, id = _req$body.id, password = _req$body.password;
            _context.next = 3;
            return User.findOne({
              token: id
            });

          case 3:
            usuario = _context.sent;

            if (!usuario) {
              _context.next = 12;
              break;
            }

            usuario.password = password;
            usuario.token = "";
            _context.next = 9;
            return usuario.save();

          case 9:
            res.status(200).json({
              respuesta: 'Contraseña Creada'
            });
            _context.next = 13;
            break;

          case 12:
            res.status(204).json({});

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findByToken.apply(this, arguments);
}

function index(req, res) {
  //Todos los users
  User.find({}).select('email fecha_creacion fecha_actualizacion ultima_secion id_rol token estatus').then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function show(req, res) {
  //Busqueda individual
  var user = req.user;

  if (user == null) {
    res.status(204);
  } else {
    res.status(200);
    user._id = null;
    user.token = null;
  }

  res.json(user);
}

function update(req, res) {
  //Actualizar un user
  var params = helpers.buildParams(validParams, req.body);
  req.user = Object.assign(req.user, params);
  req.user.save().then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function generateToken(req, res, next) {
  if (!req.user) return next();
  req.token = jwt.sign({
    id: req.user._id
  }, secrets.jwtSecret);
}

function recuperarContrasena(req, res) {
  if (req.user == null) {
    res.status(204);
    res.json({});
  } else {
    var params = helpers.buildParams(validParams, req.user);
    var token = aleatorio(100000, 999999);
    params['token'] = token;
    req.user = Object.assign(req.user, params);
    req.user.save().then(function (doc) {
      enviarCorreo(req, res);
      res.status(200).json(req.user);
    })["catch"](function (err) {
      res.json(err);
    });
  }
}

function aleatorio(minimo, maximo) {
  return Math.round(Math.random() * (maximo - minimo) + minimo);
}

function enviarCorreo(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pedroaliorellana@gmail.com',
      pass: '123/*-qazWSX'
    }
  });
  var mailOptions = {
    from: 'pedroaliorellana@gmail.com',
    to: req.user.email,
    subject: 'Restaurar Contraseña',
    html: "\n        <div> \n           <p>Saludos desde Mundo Total Salud</p> \n           <p>Acceda al siguiente link para restaurar su contrase\xF1a, y use el siguiente codigo " + req.user.token + "</p> \n           <button>http://localhost:8080/#/identifcacion/confirmar</button>\n        </div> \n        "
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.user.remove().then(function (doc) {
    res.json({});
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function myPlaces(req, res) {
  User.findOne({
    '_id': req.user.id
  }).then(function (user) {
    console.log(user.places);
    user.places.then(function (places) {
      res.json(places);
    });
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
} // function destroyAll(req,res){
//   User.remove({}).then(r => res.json({}));
// }


module.exports = {
  create: create,
  index: index,
  show: show,
  destroy: destroy,
  update: update,
  find: find,
  recuperarContrasena: recuperarContrasena,
  findByToken: findByToken,
  finish: finish
};