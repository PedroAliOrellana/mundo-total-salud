const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const slugify = require('../plugins/slugify');
const Schema = mongoose.Schema;

let suscriptorSchema = new mongoose.Schema({
  cedula:{
    type: String,
    unique: true
  },
  nombre: String,
  apellido: String,
  fecha_nacimiento: Date,
  correo:{
    type: String,
    unique: true
  },  
  telefono: String,
  fecha_creacion: {
    type: Date,
    default: Date.now()
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now()
  },
  linea: Number,
  nivel: Number,
  cedula_auspiciador: String,
  cedula_abuelo: String,
  cedula_bisabuelo: String,
  hijos: {
    type: Number,
    default: 0
  },
  nietos: {
    type: Number,
    default: 0
  },
  bisnietos: {
    type: Number,
    default: 0
  },
  estatus:{
    type: Number,
    default: 1
  }
});


/* suscriptorSchema.pre('save',function(next){
  if(this.slug) return next();
  generateSlugAndContinue.call(this,0,next);
});

suscriptorSchema.statics.validateSlugCount = function(slug){
  return suscriptor.count({slug: slug}).then(count=>{
    if(count > 0) return false;
    return true;
  })
} */

suscriptorSchema.plugin(mongoosePaginate);


/* function generateSlugAndContinue(count,next){
  this.slug = slugify(this.nombre);
  if(count != 0)
    this.slug = this.slug + "-"+count;


  suscriptor.validateSlugCount(this.slug).then(isValid=>{
    if(!isValid)
      return generateSlugAndContinue.call(this,count+1,next);

    next();


  })
} */

let suscriptor = mongoose.model('suscriptor',suscriptorSchema);

module.exports = suscriptor;
