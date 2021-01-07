"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var solicitudAfilacionSchema = new mongoose.Schema({
  cedula: String,
  nombre: String,
  apellido: String,
  correo: String,
  telefono: String,
  fecha_nacimiento: {
    type: Date,
    "default": Date.now()
  },
  cedula_auspiciador: String,
  tipo_pago: String,
  cedula_pago: String,
  monto_pago: Number,
  fecha_pago: {
    type: Date,
    "default": Date.now()
  },
  referencia_pago: String,
  banco_pago: String,
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
solicitudAfilacionSchema.plugin(mongoosePaginate);
var solicitudAfilacion = mongoose.model('solicitudAfilacion', solicitudAfilacionSchema);
module.exports = solicitudAfilacion;