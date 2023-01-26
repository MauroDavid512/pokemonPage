const { Router } = require('express')
const {pokemonCreator} = require('./utils.js')

const router = Router();


router.post('/',(req,res)=>{
    try{
        const dataPokemon = req.body
        const createdPoke = pokemonCreator(dataPokemon)
        res.status(201).json(createdPoke)
    }catch(error){
        res.status(400).json({error: `Error en ruta de creación: ${error.message}`})
    }
})

module.exports = router