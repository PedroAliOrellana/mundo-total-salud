const FuncionalidadRol = require('../models/RolFuncionalidad');
const Funcionalidad = require('../models/funcionalidad');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');
const { array } = require('../config/upload');
const rolFuncionalidad = require('../models/rolFuncionalidad');

const validParams = ['id_rol','funcionalidad','fecha_creacion','estatus'];

async function find(req,res,next){
  const funcR = await FuncionalidadRol.findOne({id_rol:req.params.id})
    req.funcionalidadRol = funcR;
    req.mainObj = funcR;
    next();
}


async function index(req,res){
  const funcionalidad = await FuncionalidadRol.find()
  res.status(200).json(funcionalidad); 
}

async function nuevaFuncionalidad (req,res){
  const {id} = req.params;
  const newFunc = new Funcionalidad(req.body);
  const rolF = await rolFuncionalidad.findOne({id_rol:id}); 
  newFunc.rol = rolF;
  await newFunc.save();
  rolF.funcionalidad = rolF.funcionalidad.concat([newFunc]);
  await rolF.save();
  res.status(201).json(newFunc);
}

async function elimiarFuncionalidad(req,res){
  const {id, idfunc} = req.params;
  const rolF = await rolFuncionalidad.findOne({id_rol:id});
  rolF.funcionalidad.pull({_id:idfunc})
  await rolF.save()
  res.status(201).json(rolF);
}

async function menu(req,res){
    const {id} = req.params
    let rol = await FuncionalidadRol.findOne({id_rol:id}).populate('funcionalidad');
    res.status(200).json(rol)
}

async function create(req,res){
  //Crear nuevos lugares
  /* const params = helpers.buildParams(validParams,req.body); */
  const newRF = new rolFuncionalidad(req.body)
  const rolF = await FuncionalidadRol.create(newRF)
  req.funcionalidadRol = rolF;
  res.status(201).json(rolF);  
}


function show(req,res){
  //Busqueda individual
  res.json(req.funcionalidadRol);
}

async function update(req,res){
  //Actualizar un recurso
  req.funcionalidadRol = Object.assign(req.funcionalidadRol,req.body);
  const funcAct = await req.funcionalidadRol.save()
  res.status(200).json(funcAct)  
}

async function destroy(req,res){
  //Eliminar recursos
  if(req.funcionalidadRol){
    await req.funcionalidadRol.remove()
    res.status(200).json({succes:true})
  }else{
    res.status(204).json({})
  }  
}



module.exports = {index,show,create,destroy,update,find,menu,nuevaFuncionalidad,elimiarFuncionalidad};
