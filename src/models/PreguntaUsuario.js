const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let preguntaUsuarioSchema = new mongoose.Schema({
  pregunta: String,
  respuesta1: String,
  respuesta2: String,
  respuesta3: String,
  respuesta4: String,
  opcioncorrecta: String,
  opcionselect: Number,
  status: Boolean,
  tipo: Number,
  nro: Number,
  ronda: Number,
  slug: String
});


preguntaUsuarioSchema.plugin(mongoosePaginate);


let PreguntaUsuario = mongoose.model('PreguntaUsuario',preguntaUsuarioSchema);

module.exports = PreguntaUsuario;
