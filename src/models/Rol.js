const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let rolSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
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

rolSchema.plugin(mongoosePaginate);


let rol = mongoose.model('rol', rolSchema);

module.exports = rol;
