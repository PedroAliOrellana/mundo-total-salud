const Funcionalidad = require('../models/Funcionalidad');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');

const validParams = ['nombre','descripcion','id_funcion_padre','icono','orden','nivel','url_vista',
                    'fecha_creacion','estatus'];

function find(req,res,next){
  Funcionalidad.findOne({_id:req.params.id}).populate('children')
  .then(funcionalidad=>{
    req.funcionalidad = funcionalidad;
    req.mainObj = funcionalidad;
    next();
  }).catch(err=>{
    next(err);
  });
}


function index(req,res){
  //Todos los lugares
  Funcionalidad.find()
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

async function agregarChildren(req,res){
  const newFunc = new Funcionalidad(req.body)  
  await newFunc.save()
  const {id} = req.params  
  const resPost = await Funcionalidad.findById(id)
  resPost.children = resPost.children.concat([newFunc])
  await resPost.save()
  res.status(201).json(newFunc)
}

async function menu(req,res){
  const {id} = req.params
  let rol = await Funcionalidad.find({rol:id}).populate('children')
  res.status(200).json(rol)
}

function create(req,res){
  //Crear nuevos lugares
  const params = helpers.buildParams(validParams,req.body);
  Funcionalidad.create(params).then(doc=>{
    req.funcionalidad = doc;
    res.json(doc);
  }).catch(err=>{
    res.json(err);
  });
}


function show(req,res){
  //Busqueda individual
  res.json(req.funcionalidad);
}

function update(req,res){
  //Actualizar un recurso

  const params = helpers.buildParams(validParams,req.body);

  req.funcionalidad = Object.assign(req.funcionalidad,params);

  req.funcionalidad.save().then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  //Eliminar recursos
  req.funcionalidad.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,show,create,destroy,update,find,agregarChildren,menu};
