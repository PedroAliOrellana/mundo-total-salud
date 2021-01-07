"use strict";

function buildParams(validParams, body) {
  var params = {};
  validParams.forEach(function (attr) {
    if (Object.prototype.hasOwnProperty.call(body, attr)) params[attr] = body[attr];
  });
  return params;
}

module.exports = {
  buildParams: buildParams
};