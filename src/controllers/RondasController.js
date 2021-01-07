const Ronda = require('../models/Ronda');
const helpers = require('./helpers');

const validParams = ['nro','puntos'];

function find(req,res,next){
  Ronda.findOne({nro:req.params.id})
  .then(ronda=>{
    req.ronda = ronda;
    req.mainObj = ronda;
    next();
  }).catch(err=>{
    next(err);
  });
}


function index(req,res){
  //Todos los lugares
  Ronda.find()
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
  Ronda.create(params).then(doc=>{
    req.ronda = doc;
    res.json(doc);
  }).catch(err=>{
    res.json(err);
  });
}


function show(req,res){
  //Busqueda individual
  res.json(req.ronda);
}

function update(req,res){
  //Actualizar un recurso

  const params = helpers.buildParams(validParams,req.body);

  req.ronda = Object.assign(req.ronda,params);

  req.ronda.save().then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  //Eliminar recursos
  req.ronda.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,show,create,destroy,update,find};
