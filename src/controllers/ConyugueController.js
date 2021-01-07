const Conyugue = require('../models/Conyugue');

async function create(req,res){
    const params = new Conyugue(req.body)
    await Conyugue.create(params)
    res.status(200).json(params)
}

async function index(req,res){
    const conyugue = await Conyugue.find()
    res.status(200).json(conyugue)
}

async function find(req,res,next){
    const {id} = req.params
    const conyugue = await Conyugue.findOne({cedula_afiliado:id})
    req.conyugue = conyugue
    next()
}

async function findId(req,res,next){
    const {id} = req.params
    const conyugue = await Conyugue.findById(id)
    req.conyugue = conyugue
    next()
}

async function show(req,res){
    if(req.conyugue){
        console.log(req.conyugue)
        res.status(200).json(req.conyugue)
    }else{
        res.status(204).json({})
    }
    
}

async function update(req,res){
    req.conyugue = Object.assign(req.conyugue,req.body)
    await req.conyugue.save()
    res.status(201).json(req.conyugue)
}

async function destroy(req,res){
    if(req.conyugue){
        await req.conyugue.remove()
        res.status(200).json({})
    }else{
        res.status(204).json({})
    }
}

module.exports = {create,index,find,show,update,destroy,findId}