const Heredero = require('../models/Heredero');

async function create(req,res){
    const heredero = new Heredero(req.body)
    await Heredero.create(heredero)
    res.status(200).json(heredero)
}

async function index(req,res){
    const heredero = await Heredero.find()
    res.status(200).json(heredero)
}

async function find(req,res,next){
    const {id} = req.params
    const heredero = await Heredero.findOne({cedula_afiliado:id})
    req.heredero = heredero
    next()
}

async function findId(req,res,next){
    const {id} = req.params
    const heredero = await Heredero.findById(id)
    req.heredero = heredero
    next()
}

async function show(req,res){
    if(req.heredero){
        res.status(200).json(req.heredero)
    }else{
        res.status(204).json({})
    }
    
}

async function update(req,res){
    req.heredero = Object.assign(req.heredero,req.body)
    await req.heredero.save()
    res.status(201).json(req.heredero)
}

async function destroy(req,res){
    if(req.heredero){
        await req.heredero.remove()
        res.status(200).json({})
    }else{
        res.status(204).json({})
    }
}

module.exports = {create,index,find,show,update,destroy,findId}