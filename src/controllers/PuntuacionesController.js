const Puntuacion = require('../models/Puntuacion');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');

const validParams = ['puntos','tiempo','_slug'];

function find(req,res,next){
  Puntuacion.find({_slug:req.params.id})
  .then(puntuacion=>{
    req.puntuacion = puntuacion;
    req.mainObj = puntuacion;
    next();
  }).catch(err=>{
    next(err);
  });
}


function index(req,res){
  //Todos los lugares
  Puntuacion.find()
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
  Puntuacion.create(params).then(doc=>{
    req.puntuacion = doc;
    res.json(doc);
  }).catch(err=>{
    res.json(err);
  });
}


function show(req,res){
  //Busqueda individual
  res.json(req.puntuacion);
}

function update(req,res){
  //Actualizar un recurso

  const params = helpers.buildParams(validParams,req.body);

  req.puntuacion = Object.assign(req.puntuacion,params);

  req.puntuacion.save().then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  //Eliminar recursos
  req.puntuacion.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,show,create,destroy,update,find};
