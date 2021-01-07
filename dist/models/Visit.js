"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var REACTIONS = ['like', 'love', 'disappointment', 'yummy', 'anger', 'disgust'];
var visitSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  reaction: {
    type: String,
    "enum": REACTIONS
  },
  observation: String
});

visitSchema.statics.forUser = function (userId, page) {
  return Visit.paginate({
    '_user': userId
  }, {
    page: page,
    limit: 5,
    sort: {
      '_id': -1
    }
  });
};

visitSchema.plugin(mongoosePaginate);
var Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;