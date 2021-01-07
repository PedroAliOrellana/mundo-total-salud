const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

let funcionalidadSchema = new Schema({
  nombre: String,
  descripcion: String,
  icono: String,
  orden: Number,
  nivel: Number,
  url_vista: String,
  fecha_creacion: {
    type: Date,
    default: Date.now()
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now()
  },
  estatus: {
    type: Number,
    default: 1
  },
  rol:{
    type: Schema.Types.ObjectId,
    ref: 'rolFuncionalidad'
  },
  children:[{
    type: Schema.Types.Object,
    ref: 'funcionalidad'
  }]
});

funcionalidadSchema.plugin(mongoosePaginate);


let funcionalidad = mongoose.model('funcionalidad', funcionalidadSchema);

module.exports = funcionalidad;
