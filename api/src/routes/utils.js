//Aqui estarán todas las funciones que se utilizaran durante el ruteo.

const axios = require('axios')
const { Pokemon, Type } = require('../db.js')


const mayus = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const pokemonCreator = async (dataPokemon) => {
    try {
        const { name, img, hp, attack, defense, speed, height, weight, types, is_default} = dataPokemon; // esto para el req.body en post
        const aux1 = await getAllDbPoke()
        //Traigo los datos existentes en la base para corroborar que no se repita ningun pokemon
        const aux2 = aux1.find(e => e.name === name)
        if (aux2) {
            throw new Error('Ya existe un pokemon con ese nombre')
        }
        let typePoke = await Type.findAll({
            where: { name: types },
        });  //Busco los tipos dentro de la base de datos en su respectiva tabla
        let aux = [];
        let msg = ""
        typePoke.forEach((e) => {
            aux.push(e.name);
        })
        if (aux.length === 1) {
            msg += aux[0]
        } else if (aux.length === 2) {
            msg += `${aux[0]} and ${aux[1]}`
        } else {
            for (let i = 0; i < aux.length; i++) {
                if (i === aux.length - 2) {
                    msg += `${aux[aux.length - 2]} and ${aux[aux.length - 1]}`
                } else if (i < aux.length - 2) {
                    msg += `${aux[i]}, `
                }
            }
        }

        const newPoke = await Pokemon.create({
            name: mayus(name),
            img,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            is_default,
            typesString: mayus(msg)
        });

        newPoke.addType(typePoke);

        return await getPokeDetail(name);
        //La funcion al ser ejecutada me devolverá el detalle del pokemon creado
    } catch (error) {
        console.log("Error en funcion pokemonCreator", error.message);
    }
};


const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
        const requestUrl = apiUrl.data.results.map(e => axios.get(e.url))
        const subrequestUrl = await axios.all(requestUrl)

        /*
        En la lista principal de pokemons en la api, cada uno tiene sus propiedades en una url aparte asi que requiero hacer un subrequest por cada uno de ellos para poderme traer sus atributos.
        */

        const pokeData = subrequestUrl.map(e => e.data)
        let pokemons = pokeData.map((poke) => {
            
            return {
                id: poke.id,
                name: mayus(poke.name),
                height: poke.height,
                weight: poke.weight,
                hp: poke.stats[0].base_stat,
                attack: poke.stats[1].base_stat,
                defense: poke.stats[2].base_stat,
                speed: poke.stats[5].base_stat,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`,
                is_default: poke.is_default,
                types: poke.types.map(e => e.type.name),
            }
        })
        pokemons.forEach(async (e) => {
            await pokemonCreator(e)
        })

        /*
        Utilizo la funcion previamente creada llamada pokemonCreator para que cada vez que 
        traiga un pokemon de la api este se sume a la base de datos (uso la propiedad is_default para distinguirlos de los que cree el usuario)
        */

        return pokemons
    } catch (error) {
        console.log('Error en getApiInfo', error.message)
    }
}


const getAllDbPoke = async () => {
    try {
        const allDbPokes = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return allDbPokes
        //Devuelve array con todos los pokemons

    } catch (error) {
        console.log('Error en getAllDbPoke ', error.message)
    }
}



const getApiType = async () => {
    try {
        const apiUrl = await axios.get(`https://pokeapi.co/api/v2/type/`)
        const apiInfo = apiUrl.data.results.map(e => e.name);

        //Suma todos los tipos de pokemon a la tabla Type

        apiInfo.forEach((type) => {
            Type.findOrCreate({
                where: { name: type }
            })
        })
        return apiInfo
    } catch (error) {
        console.log('Error en getApiType', error.message)
    }
}


const getPokeDetail = async (id) => {
    const allPokes = await getAllDbPoke()

    /*
    El proximo condicional me permite emplear esta misma funcion tanto cuando
    buscaré un pokemon por su numero de id como para buscarlo por su nombre
    */

    if (typeof (id) === 'number') {
        try {
            const pokemon = allPokes.find(e => e.id === id)
            // console.log('numero ', pokemon)
            return pokemon
        } catch (error) {
            console.log('Error en getPokeDetail con id numerico', error.message)
        }
    }else if(typeof (id) === 'string') {
        try {
            const pokemon = allPokes.filter(e => e.name === id)
            // console.log('string ', pokemon)
            return pokemon
        } catch (error) {
            console.log('Error en getPokeDetail con id string', error.message)
        }
    }
}



module.exports = {
    getApiInfo,
    getAllDbPoke,
    getApiType,
    pokemonCreator,
    getPokeDetail
}

