"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var puntuacionSchema = new mongoose.Schema({
  puntos: Number,
  tiempo: Number,
  _slug: {
    type: mongoose.Schema.Types.Object,
    ref: 'Usuario',
    required: true
  }
});
puntuacionSchema.plugin(mongoosePaginate);
var Puntuacion = mongoose.model('Puntuacion', puntuacionSchema);
module.exports = Puntuacion;