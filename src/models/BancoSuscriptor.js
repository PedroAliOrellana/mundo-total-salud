const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

let bancoSuscriptorSchema = new Schema({
  tipo: String,
  nombre: String,
  nro_de_cuenta: String,
  banco: String,
  cedula: String,
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
  suscriptor:{
    type: Schema.Types.ObjectId,
    ref: 'suscriptor'
  }
});

bancoSuscriptorSchema.plugin(mongoosePaginate);


let bancoSuscriptor = mongoose.model('bancoSuscriptor',bancoSuscriptorSchema);

module.exports = bancoSuscriptor;
