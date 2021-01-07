const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let puntuacionSchema = new mongoose.Schema({
  puntos: Number,
  tiempo: Number,
  _slug:{
    type: mongoose.Schema.Types.Object,
    ref: 'Usuario',
    required: true
  }
});

puntuacionSchema.plugin(mongoosePaginate);


let Puntuacion = mongoose.model('Puntuacion',puntuacionSchema);

module.exports = Puntuacion;
