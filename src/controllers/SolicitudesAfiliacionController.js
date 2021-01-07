const Solicitud = require('../models/SolicitudAfiliacion');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');

const validParams = ['cedula','nombre','apellido','correo','telefono','fecha_creacion',
                    'fecha_nacimiento','cedula_auspiciador','fecha_actualizacion','estatus','banco_pago'];

function find(req,res,next){
  Solicitud.findOne({cedula:req.params.id})
  .then(solicitud=>{
    req.solicitud = solicitud;
    req.mainObj = solicitud;
    next();
  }).catch(err=>{
    next(err);
  });
}


function index(req,res){
  //Todos los lugares
  Solicitud.find({estatus:1})
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

async function create(req,res){
  //Crear nuevos lugares
  const newSolicitud = new Solicitud(req.body);
  await newSolicitud.save()
  req.solicitud = newSolicitud;
  res.status(201).json(newSolicitud);
}


function show(req,res){
  //Busqueda individual
  if(req.solicitud != null){
    return res.status(200).json(req.solicitud);
  }else{
    return  res.status(204).json({})
  }
  
}

async function update(req,res){
  //Actualizar un recurso
  if(req.solicitud){
    const params = helpers.buildParams(validParams,req.body);
    req.solicitud = Object.assign(req.solicitud,params);
    await req.solicitud.save()
    res.status(201).json(req.solicitud);
  }else{
    res.status(403).json({});
  }
}

function destroy(req,res){
  //Eliminar recursos
  req.solicitud.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}



module.exports = {index,show,create,destroy,update,find};
