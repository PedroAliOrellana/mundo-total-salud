"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var slugify = require('../plugins/slugify');

var conyugueSchema = new mongoose.Schema({
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
conyugueSchema.plugin(mongoosePaginate);
var conyugue = mongoose.model('conyugue', conyugueSchema);
module.exports = conyugue;