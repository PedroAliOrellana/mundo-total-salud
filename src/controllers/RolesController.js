const Rol = require('../models/Rol');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');

const validParams = ['nombre','descripcion','fecha_creacion','estatus'];

function find(req,res,next){
  Rol.find({id:req.params.id})
  .then(rol=>{
    req.rol = rol;
    req.mainObj = rol;
    next();
  }).catch(err=>{
    next(err);
  });
}


function index(req,res){
  //Todos los lugares
  Rol.find()
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
  Rol.create(params).then(doc=>{
    req.rol = doc;
    res.json(doc);
  }).catch(err=>{
    res.json(err);
  });
}


function show(req,res){
  //Busqueda individual
  res.json(req.rol);
}

function update(req,res){
  //Actualizar un recurso

  const params = helpers.buildParams(validParams,req.body);

  req.rol = Object.assign(req.rol,params);

  req.rol.save().then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  //Eliminar recursos
  req.rol.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,show,create,destroy,update,find};
