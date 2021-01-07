"use strict";

var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var slugify = require('../plugins/slugify');

var Schema = mongoose.Schema;
var afiliadoSchema = new mongoose.Schema({
  cedula: {
    type: String,
    unique: true
  },
  nombre: String,
  apellido: String,
  fecha_nacimiento: Date,
  correo: {
    type: String,
    unique: true
  },
  telefono: String,
  fecha_creacion: {
    type: Date,
    "default": Date.now()
  },
  fecha_actualizacion: {
    type: Date,
    "default": Date.now()
  },
  linea: Number,
  nivel: Number,
  cedula_auspiciador: String,
  cedula_abuelo: String,
  cedula_bisabuelo: String,
  hijos: {
    type: Number,
    "default": 0
  },
  nietos: {
    type: Number,
    "default": 0
  },
  bisnietos: {
    type: Number,
    "default": 0
  },
  estatus: {
    type: Number,
    "default": 1
  }
});
/* afiliadoSchema.pre('save',function(next){
  if(this.slug) return next();
  generateSlugAndContinue.call(this,0,next);
});

afiliadoSchema.statics.validateSlugCount = function(slug){
  return afiliado.count({slug: slug}).then(count=>{
    if(count > 0) return false;
    return true;
  })
} */

afiliadoSchema.plugin(mongoosePaginate);
/* function generateSlugAndContinue(count,next){
  this.slug = slugify(this.nombre);
  if(count != 0)
    this.slug = this.slug + "-"+count;


  afiliado.validateSlugCount(this.slug).then(isValid=>{
    if(!isValid)
      return generateSlugAndContinue.call(this,count+1,next);

    next();


  })
} */

var afiliado = mongoose.model('afiliado', afiliadoSchema);
module.exports = afiliado;