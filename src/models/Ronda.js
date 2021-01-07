const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let rondaSchema = new mongoose.Schema({
  nro: Number,
  puntos: Number
});

rondaSchema.plugin(mongoosePaginate);


let Ronda = mongoose.model('Ronda',rondaSchema);

module.exports = Ronda;
