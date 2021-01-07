"use strict";

var buildParams = require('./helpers').buildParams;

var validParams = ['_place'];

var FavoritePlace = require('../models/FavoritePlace');

var User = require('../models/User');

function find(req, res, next) {
  FavoritePlace.findById(req.params.id).then(function (fav) {
    req.mainObj = fav;
    req.favorite = fav;
    next();
  })["catch"](next);
}

function index(req, res) {
  if (!req.fullUser) return res.json({});
  req.fullUser.favorites.then(function (places) {
    res.json(places);
  })["catch"](function (err) {
    console.log(err);
    res.json(err);
  });
}

function create(req, res) {
  var params = buildParams(validParams, req.body);
  params['_user'] = req.user.id;
  FavoritePlace.create(params).then(function (favorite) {
    res.json(favorite);
  })["catch"](function (error) {
    res.status(422).json({
      error: error
    });
  });
}

function destroy(req, res) {
  req.favorite.remove().then(function (doc) {
    res.json({});
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
}

module.exports = {
  create: create,
  find: find,
  destroy: destroy,
  index: index
};