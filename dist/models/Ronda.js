"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var rondaSchema = new mongoose.Schema({
  nro: Number,
  puntos: Number
});
rondaSchema.plugin(mongoosePaginate);
var Ronda = mongoose.model('Ronda', rondaSchema);
module.exports = Ronda;