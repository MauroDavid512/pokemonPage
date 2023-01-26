const { Router } = require('express')
const { getAllDbPoke, getPokeDetail } = require('./utils')
const router = Router();



router.get('/', async (req, res) => {
    try {
        const info = await getAllDbPoke()
        const {name} = req.query
        if(name){
            try{
                const mayus = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
                console.log (mayus)
                const pokeDetail = await getPokeDetail(mayus)
                res.status(200).json(pokeDetail)
            }catch(error){
                res.status(404).json({error: error.message})
            }
        }else{
        res.status(200).json(info)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/created', async (req, res) => {
    try {
        const info = await getAllDbPoke()
        const newPokes = info.filter(e => {
            if(!e.is_default){
                return e
        }})
        res.status(200).json(newPokes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.get('/originals', async (req, res) => {
    try {
        const info = await getAllDbPoke()
        const newPokes = info.filter(e => {
            if(e.is_default){
                return e
        }})
        res.status(200).json(newPokes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.get('/:id', async (req,res) =>{
    try{
        const id = req.params.id
        const pokeDetail = await getPokeDetail(parseInt(id))
        res.status(200).json(pokeDetail)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})



module.exports = router