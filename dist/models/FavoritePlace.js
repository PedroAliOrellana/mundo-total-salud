"use strict";

var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  }
});
var FavoritePlace = mongoose.model('FavoritePlace', favoriteSchema);
module.exports = FavoritePlace;