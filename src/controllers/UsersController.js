const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const helpers = require('./helpers');
const buildParams = require('./helpers').buildParams;
var nodemailer = require('nodemailer');

const validParams = ['email','password','fecha_creacion','id_rol','token','estatus'];

function create(req,res,next){
  let params = buildParams(validParams,req.body);

  User.create(params)
    .then(user=>{
      req.user = user;
      next();
      // res.json(user);
    }).catch(error=>{
      console.log(error);
      res.status(422).json({
        error
      })
    })
}

function find(req,res,next){
  User.findOne({email:req.params.id})
  .select('email fecha_creacion fecha_actualizacion ultima_secion id_rol token estatus')
  .then(user=>{
    req.user = user;
    req.mainObj = user;
    next();
  }).catch(err=>{
    next(err);
  });
}

function finish(req,res){
  if(req.user){
    res.status(200).json({})
  }else{
    res.status(422).json({error:"No se pudo crear"})
  }
}

async function findByToken(req,res){
  const {id, password} = req.body
  const usuario = await User.findOne({token:id})
  if(usuario){
    usuario.password = password
    usuario.token = ""
    await usuario.save()
    res.status(200).json({respuesta:'Contraseña Creada'})
  }else{
    res.status(204).json({})
  }
}

function index(req,res){
  //Todos los users
  User.find({})
  .select('email fecha_creacion fecha_actualizacion ultima_secion id_rol token estatus')
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

function show(req,res){
  //Busqueda individual
  const user = req.user
  if(user==null){
    res.status(204)
  }else{
    res.status(200)
    user._id= null
    user.token = null
  }  
  res.json(user);
}

function update(req,res){
  //Actualizar un user

  const params = helpers.buildParams(validParams,req.body);

  req.user = Object.assign(req.user,params);

  req.user.save().then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function generateToken(req,res,next){
  if(!req.user) return next();
  req.token = jwt.sign({id:req.user._id},secrets.jwtSecret)
}

function recuperarContrasena(req,res){  
  if(req.user==null){
      res.status(204)      
      res.json({})
    }else{
      const params = helpers.buildParams(validParams,req.user);
      const token = aleatorio(100000,999999)
      params['token']=token;      
      req.user = Object.assign(req.user,params);
      req.user.save().then(doc=>{
      enviarCorreo(req,res)
      res.status(200).json(req.user);
      }).catch(err=>{
        res.json(err);
      });
    }    
}

function aleatorio(minimo,maximo){
  return Math.round(Math.random() * (maximo - minimo) + minimo);
}

function enviarCorreo(req,res){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pedroaliorellana@gmail.com',
      pass: '123/*-qazWSX'
    }
  });
    
  var mailOptions = {
    from: 'pedroaliorellana@gmail.com',
    to: req.user.email,
    subject: 'Restaurar Contraseña',
    html:`
        <div> 
           <p>Saludos desde Mundo Total Salud</p> 
           <p>Acceda al siguiente link para restaurar su contraseña, y use el siguiente codigo `+ req.user.token + `</p> 
           <button>http://localhost:8080/#/identifcacion/confirmar</button>
        </div> 
        `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}



function destroy(req,res){
  //Eliminar recursos
  req.user.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function myPlaces(req,res){
  User.findOne({'_id': req.user.id}).then(user=>{
    console.log(user.places);
    user.places.then(places=>{
      res.json(places);
    })
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
}

// function destroyAll(req,res){
//   User.remove({}).then(r => res.json({}));
// }


module.exports = { create,index,show,destroy,update,find,recuperarContrasena,findByToken,finish}
