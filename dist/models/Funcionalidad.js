"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
var funcionalidadSchema = new Schema({
  nombre: String,
  descripcion: String,
  icono: String,
  orden: Number,
  nivel: Number,
  url_vista: String,
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
  rol: {
    type: Schema.Types.ObjectId,
    ref: 'rolFuncionalidad'
  },
  children: [{
    type: Schema.Types.Object,
    ref: 'funcionalidad'
  }]
});
funcionalidadSchema.plugin(mongoosePaginate);
var funcionalidad = mongoose.model('funcionalidad', funcionalidadSchema);
module.exports = funcionalidad;