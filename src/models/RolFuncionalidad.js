const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

let rolFuncionalidadSchema = new Schema({
  id_rol: String,
  funcionalidad: [{
    type: Schema.Types.ObjectId,
    ref:'funcionalidad'
  }],
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
  }
});

rolFuncionalidadSchema.plugin(mongoosePaginate);


let rolFuncionalidad = mongoose.model('rolFuncionalidad', rolFuncionalidadSchema);

module.exports = rolFuncionalidad;
