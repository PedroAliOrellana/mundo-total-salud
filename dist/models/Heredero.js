"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var slugify = require('../plugins/slugify');

var herederoSchema = new mongoose.Schema({
  cedula: String,
  nombre: String,
  apellido: String,
  fecha_nacimiento: Date,
  correo: String,
  telefono: String,
  cedula_afiliado: String,
  fecha_creacion: {
    type: Date,
    "default": Date.now()
  },
  fecha_actualizacion: {
    type: Date,
    "default": Date.now()
  }
});
herederoSchema.plugin(mongoosePaginate);
var heredero = mongoose.model('heredero', herederoSchema);
module.exports = heredero;