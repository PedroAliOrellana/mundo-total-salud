"use strict";

var Place = require('../models/Place');

var upload = require('../config/upload');

var uploader = require('../models/uploader');

var helpers = require('./helpers');

var validParams = ['title', 'description', 'address', 'acceptsCreditCard', 'openHour', 'closeHour'];

function find(req, res, next) {
  Place.findOne({
    slug: req.params.id
  }).then(function (place) {
    req.place = place;
    req.mainObj = place;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Place.paginate({}, {
    page: req.query.page || 1,
    limit: 8,
    sort: {
      '_id': -1
    }
  }).then(function (docs) {
    res.json(docs);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(req, res, next) {
  //Crear nuevos lugares
  var params = helpers.buildParams(validParams, req.body);
  console.log(req.user);
  params['_user'] = req.user.id;
  Place.create(params).then(function (doc) {
    req.place = doc;
    next();
  })["catch"](function (err) {
    next(err);
  });
}

function show(req, res) {
  //Busqueda individual
  res.json(req.place);
}

function update(req, res) {
  //Actualizar un recurso
  var params = helpers.buildParams(validParams, req.body);
  req.place = Object.assign(req.place, params);
  req.place.save().then(function (doc) {
    res.json(doc);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.place.remove().then(function (doc) {
    res.json({});
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function multerMiddleware() {
  return upload.fields([{
    name: 'avatar',
    maxCount: 1
  }, {
    name: 'cover',
    maxCount: 1
  }]);
}

function saveImage(req, res) {
  if (req.place) {
    var files = ['avatar', 'cover'];
    var promises = [];
    files.forEach(function (imageType) {
      if (req.files && req.files[imageType]) {
        var path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path, imageType));
      }
    });
    Promise.all(promises).then(function (results) {
      console.log(results);
      res.json(req.place);
    })["catch"](function (err) {
      console.log(err);
      res.json(err);
    });
  } else {
    res.status(422).json({
      error: req.error || 'Could not save place'
    });
  }
}

module.exports = {
  index: index,
  show: show,
  create: create,
  destroy: destroy,
  update: update,
  find: find,
  multerMiddleware: multerMiddleware,
  saveImage: saveImage
};