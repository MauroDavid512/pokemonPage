const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const pokemons = require('./pokemons')
const pokemonCreator = require('./pokemonCreator')
const types = require('./types')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemons )
router.use('/pokemonCreator', pokemonCreator)
router.use('/types', types)




module.exports = router;
