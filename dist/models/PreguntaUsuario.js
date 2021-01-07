"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var preguntaUsuarioSchema = new mongoose.Schema({
  pregunta: String,
  respuesta1: String,
  respuesta2: String,
  respuesta3: String,
  respuesta4: String,
  opcioncorrecta: String,
  opcionselect: Number,
  status: Boolean,
  tipo: Number,
  nro: Number,
  ronda: Number,
  slug: String
});
preguntaUsuarioSchema.plugin(mongoosePaginate);
var PreguntaUsuario = mongoose.model('PreguntaUsuario', preguntaUsuarioSchema);
module.exports = PreguntaUsuario;