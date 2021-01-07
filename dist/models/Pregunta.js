"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var preguntaSchema = new mongoose.Schema({
  pregunta: String,
  respuesta1: String,
  respuesta2: String,
  respuesta3: String,
  respuesta4: String,
  opcioncorrecta: String,
  status: {
    type: Number,
    "default": 1
  },
  tipo: Number,
  nro: Number,
  ronda: Number
});

function getRandomInt(max) {
  return Math.floor(Math.random() * (max - 1)) + 1;
}

preguntaSchema.pre('save', function (next) {
  if (this.nro) return next();
  generateNroAndContinue.call(this, next);
});

preguntaSchema.statics.validateNroCount = function (nro) {
  return Pregunta.count({
    nro: nro
  }).then(function (count) {
    if (count > 0) return false;
    return true;
  });
};

preguntaSchema.plugin(mongoosePaginate);

function generateNroAndContinue(next) {
  var _this = this;

  this.nro = getRandomInt(100);
  Pregunta.validateNroCount(this.nro).then(function (isValid) {
    if (!isValid) return generateNroAndContinue.call(_this, next);
    next();
  });
}

var Pregunta = mongoose.model('Pregunta', preguntaSchema);
module.exports = Pregunta;