const Pregunta = require('../models/PreguntaUsuario');
const helpers = require('./helpers');

const validParams = ['pregunta','respuesta1','respuesta2','respuesta3','respuesta4','opcioncorrecta','opcionselect','status','tipo','ronda','slug'];

function index(req,res){
  //Todos los lugares
  Pregunta.find().sort({nro:'-1'})
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}
function findByUser(req,res){
  //Todos los lugares
  Pregunta.find().where({slug:req.params.id}).sort({nro:'-1'})
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

function create(req,res){
  //Crear nuevos lugares
  const params = helpers.buildParams(validParams,req.body);
  Pregunta.create(params).then(doc=>{
    req.pregunta = doc;
    res.json(doc);
  }).catch(err=>{
    res.json(err);
  });
}


function destroy(req,res){
  //Eliminar recursos
  Pregunta.remove().where({slug:req.body.slug}).then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,create,destroy,findByUser};
