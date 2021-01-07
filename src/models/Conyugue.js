const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const slugify = require('../plugins/slugify');


let conyugueSchema = new mongoose.Schema({
cedula: String,
nombre: String,
apellido: String,
fecha_nacimiento: Date,
correo:String,  
telefono: String,
cedula_afiliado:String,
fecha_creacion: {
    type: Date,
    default: Date.now()
},
fecha_actualizacion: {
    type: Date,
    default: Date.now()
}  
});

conyugueSchema.plugin(mongoosePaginate);

let conyugue = mongoose.model('conyugue',conyugueSchema);

module.exports = conyugue;
