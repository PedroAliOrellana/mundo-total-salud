"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
var rolFuncionalidadSchema = new Schema({
  id_rol: String,
  funcionalidad: [{
    type: Schema.Types.ObjectId,
    ref: 'funcionalidad'
  }],
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
rolFuncionalidadSchema.plugin(mongoosePaginate);
var rolFuncionalidad = mongoose.model('rolFuncionalidad', rolFuncionalidadSchema);
module.exports = rolFuncionalidad;