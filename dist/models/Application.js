"use strict";

var mongoose = require('mongoose');

var randomstring = require('randomstring');

function assignRandomAndUniqueValueToField(app, field, next) {
  var randomString = randomstring.generate(20);
  var searchCriteria = {};
  searchCriteria[field] = randomString;
  Application.count(searchCriteria).then(function (count) {
    if (count > 0) return assignRandomAndUniqueValueToField(app, field, next);
    app[field] = randomString;
    next();
  });
}

var applicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true
  },
  secret: {
    type: String,
    required: true,
    unique: true
  },
  origins: String,
  name: String
});
applicationSchema.pre('validate', function (next) {
  var _this = this;

  assignRandomAndUniqueValueToField(this, 'applicationId', function () {
    assignRandomAndUniqueValueToField(_this, 'secret', next);
  });
});
var Application = mongoose.model('Application', applicationSchema);
module.exports = Application;