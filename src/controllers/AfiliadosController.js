const Afiliado = require('../models/Afiliado');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');

const validParams = ['cedula','nombre','apellido','fecha_nacimiento','correo','telefono',
'fecha_creacion','linea','nivel','cedula_auspiciador','cedula_abuelo','cedula_bisabuelo',
'hijos','nietos','bisnietos','estatus'];

function find(req,res,next){
  Afiliado.findOne({cedula:req.params.id})
  .then(afiliado=>{
    req.afiliado = afiliado;
    req.mainObj = afiliado;
    next();
  }).catch(err=>{
    next(err);
  });
}

async function findByCorreo(req,res,next){
  const afiliado = await Afiliado.findOne({correo:req.params.id})  
  if (afiliado){
    req.afiliado = afiliado;
    req.mainObj = afiliado;
  }  
  next()
}

function index(req,res){
  //Todos los afiliados
  Afiliado.find({})
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

function findActivos(req,res){
  //Todos los afiliados activos
  Afiliado.find({estatus:req.params.estatus})
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

async function create(req,res){
  //Crear nuevos lugares
  const params =  helpers.buildParams(validParams,req.body);  
  const doc = await Afiliado.create(params)
  if(doc){
    req.afiliado = doc;
    res.status(200).json(doc);
  }else{
    res.status(422).json({})
  }
  
}

async function crearHeredero(req,res){
  const newHer = req.body
  const {id} = req.params
  const afiliado = await Afiliado.findOne({cedula:id})
  afiliado.heredero = newHer
  afiliado.save()
  res.status(201).json(afiliado)
}

async function crearConyugue(req,res){
  const newCon = req.body
  const {id} = req.params
  const afiliado = await Afiliado.findOne({cedula:id})
  afiliado.conyugue = newCon
  afiliado.save()
  res.status(201).json(afiliado)
}

function findHijos(req,res){
  Afiliado.find({cedula_auspiciador:req.params.cedula}).sort({fecha_creacion:-1})
  .then(afiliados=>{
    res.json(afiliados)
  }).catch(err=>{
    res.json(err);
  });
}

function findNietos(req,res){
  Afiliado.find({cedula_abuelo:req.params.cedula}).sort({fecha_creacion:-1})
  .then(afiliados=>{
    res.json(afiliados)
  }).catch(err=>{
    res.json(err);
  });
}

function findBisnietos(req,res){
  Afiliado.find({cedula_bisabuelo:req.params.cedula}).sort({fecha_creacion:-1})
  .then(afiliados=>{
    res.json(afiliados)
  }).catch(err=>{
    res.json(err);
  });
}

function show(req,res){
  //Busqueda individual
  if(req.afiliado==null){
    res.status(204)
    res.json({})
  }else{
    res.status(200)
    res.json(req.afiliado);
  }
  
}

function update(req,res){
  //Actualizar un afiliado

  const params = helpers.buildParams(validParams,req.body);

  req.afiliado = Object.assign(req.afiliado,params);

  req.afiliado.save().then(doc=>{
    res.status(201).json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  //Eliminar recursos
  req.afiliado.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,show,create,destroy,update,find,findActivos,
  findHijos,findBisnietos,findNietos,findByCorreo,crearHeredero,crearConyugue};
