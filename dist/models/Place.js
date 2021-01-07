"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var uploader = require('./uploader');

var slugify = require('../plugins/slugify');

var Visit = require('./Visit');

var placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  address: String,
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    "default": false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

placeSchema.methods.updateImage = function (path, imageType) {
  var _this = this;

  // Primero subir la imagen
  // Guardar el lugar
  return uploader(path).then(function (secure_url) {
    return _this.saveImageUrl(secure_url, imageType);
  });
};

placeSchema.methods.saveImageUrl = function (secureUrl, imageType) {
  this[imageType + 'Image'] = secureUrl;
  return this.save();
};

placeSchema.pre('save', function (next) {
  if (this.slug) return next();
  generateSlugAndContinue.call(this, 0, next);
});

placeSchema.statics.validateSlugCount = function (slug) {
  return Place.count({
    slug: slug
  }).then(function (count) {
    if (count > 0) return false;
    return true;
  });
};

placeSchema.virtual('visits').get(function () {
  return Visit.find({
    '_place': this._id
  }).sort('-id');
});
placeSchema.plugin(mongoosePaginate);

function generateSlugAndContinue(count, next) {
  var _this2 = this;

  this.slug = slugify(this.title);
  if (count != 0) this.slug = this.slug + "-" + count;
  Place.validateSlugCount(this.slug).then(function (isValid) {
    if (!isValid) return generateSlugAndContinue.call(_this2, count + 1, next);
    next();
  });
}

var Place = mongoose.model('Place', placeSchema);
module.exports = Place;