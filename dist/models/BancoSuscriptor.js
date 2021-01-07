"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
var bancoSuscriptorSchema = new Schema({
  tipo: String,
  nombre: String,
  nro_de_cuenta: String,
  banco: String,
  cedula: String,
  fecha_creacion: {
    type: Date,
    "default": Date.now()
  },
  fecha_actualizacion: {
    type: Date,
    "default": Date.now()
  },
  estatus: {
    type: Number,
    "default": 1
  },
  suscriptor: {
    type: Schema.Types.ObjectId,
    ref: 'suscriptor'
  }
});
bancoSuscriptorSchema.plugin(mongoosePaginate);
var bancoSuscriptor = mongoose.model('bancoSuscriptor', bancoSuscriptorSchema);
module.exports = bancoSuscriptor;