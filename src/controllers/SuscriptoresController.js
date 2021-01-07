const Suscriptor = require('../models/Suscriptor');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');

const validParams = ['cedula','nombre','apellido','fecha_nacimiento','correo','telefono',
'fecha_creacion','linea','nivel','cedula_auspiciador','cedula_abuelo','cedula_bisabuelo',
'hijos','nietos','bisnietos','estatus'];

function find(req,res,next){
  Suscriptor.findOne({cedula:req.params.id})
  .then(suscriptor=>{
    req.suscriptor = suscriptor;
    req.mainObj = suscriptor;
    next();
  }).catch(err=>{
    next(err);
  });
}

async function findByCorreo(req,res,next){
  const suscriptor = await Suscriptor.findOne({correo:req.params.id})  
  if (suscriptor){
    req.suscriptor = suscriptor;
    req.mainObj = suscriptor;
  }  
  next()
}

function index(req,res){
  //Todos los suscriptor
  Suscriptor.find({})
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

function findActivos(req,res){
  //Todos los suscriptor activos
  Suscriptor.find({estatus:req.params.estatus})
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
  const doc = await Suscriptor.create(params)
  if(doc){
    req.suscriptor = doc;
    res.status(200).json(doc);
  }else{
    res.status(422).json({})
  }
  
}

async function crearHeredero(req,res){
  const newHer = req.body
  const {id} = req.params
  const suscriptor = await Suscriptor.findOne({cedula:id})
  suscriptor.heredero = newHer
  suscriptor.save()
  res.status(201).json(suscriptor)
}

async function crearConyugue(req,res){
  const newCon = req.body
  const {id} = req.params
  const suscriptor = await Suscriptor.findOne({cedula:id})
  suscriptor.conyugue = newCon
  suscriptor.save()
  res.status(201).json(suscriptor)
}

function findHijos(req,res){
  Suscriptor.find({cedula_auspiciador:req.params.cedula}).sort({fecha_creacion:-1})
  .then(suscriptor=>{
    res.json(suscriptor)
  }).catch(err=>{
    res.json(err);
  });
}

function findNietos(req,res){
  Suscriptor.find({cedula_abuelo:req.params.cedula}).sort({fecha_creacion:-1})
  .then(suscriptor=>{
    res.json(suscriptor)
  }).catch(err=>{
    res.json(err);
  });
}

function findBisnietos(req,res){
  Suscriptor.find({cedula_bisabuelo:req.params.cedula}).sort({fecha_creacion:-1})
  .then(suscriptor=>{
    res.json(suscriptor)
  }).catch(err=>{
    res.json(err);
  });
}

function show(req,res){
  //Busqueda individual
  if(req.suscriptor==null){
    res.status(204)
    res.json({})
  }else{
    res.status(200)
    res.json(req.suscriptor);
  }
  
}

function update(req,res){
  //Actualizar un suscriptor

  const params = helpers.buildParams(validParams,req.body);

  req.suscriptor = Object.assign(req.suscriptor,params);

  req.suscriptor.save().then(doc=>{
    res.status(201).json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  //Eliminar recursos
  req.suscriptor.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,show,create,destroy,update,find,findActivos,
  findHijos,findBisnietos,findNietos,findByCorreo,crearHeredero,crearConyugue};
