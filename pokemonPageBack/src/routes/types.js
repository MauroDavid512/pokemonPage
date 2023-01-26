const { Router } = require('express');
const { Type } = require('../db')
const router = Router();

router.get('/', async (req,res)=> {
    try{
        const info = await Type.findAll()
        res.status(201).send(info)
    }catch(error){
        res.status(400).json({error: 'Error en ruta /types '+ error.message})
    }
})



module.exports = router