const bancoSuscriptor = require('../models/BancoSuscriptor');

async function create(req,res){
    const banco = new bancoSuscriptor(req.body)
    await bancoSuscriptor.create(banco)
    res.status(200).json(banco)
}

async function index(req,res){
    const banco = await bancoSuscriptor.find().populate('Suscriptor')
    res.status(200).json(banco)
}

async function find(req,res,next){
    const {id} = req.params
    const banco = await bancoSuscriptor.find({suscriptor:id}).populate('Suscriptor')
    req.banco = banco
    next()
}

async function findId(req,res,next){
    const {id} = req.params
    const banco = await bancoSuscriptor.findById(id)
    req.banco = banco
    next()
}

async function show(req,res){
    if(req.banco){
        res.status(200).json(req.banco)
    }else{
        res.status(204).json({})
    }
    
}

async function update(req,res){
    req.banco = Object.assign(req.banco,req.body)
    await req.banco.save()
    res.status(201).json(req.banco)
}

async function destroy(req,res){
    if(req.banco){
        await req.banco.remove()
        res.status(200).json({})
    }else{
        res.status(204).json({})
    }
}

module.exports = {create,index,find,show,update,destroy,findId}