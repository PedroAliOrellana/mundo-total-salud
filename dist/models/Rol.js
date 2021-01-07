"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var rolSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
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
  }
});
rolSchema.plugin(mongoosePaginate);
var rol = mongoose.model('rol', rolSchema);
module.exports = rol;