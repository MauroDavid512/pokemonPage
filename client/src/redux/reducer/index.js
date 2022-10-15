import {
    GET_ALL_POKES,
    GET_ORIGINALS_POKES,
    GET_CREATED_POKES,
    GET_POKE_DETAILS,
    GET_ALL_TYPES,
    TYPE_FILTER,
    ATTACK_SORT,
    NAME_SORT,
    SEARCH_FILTER,
    PAGINA,
    SET_ORIGIN,
    SET_TYPE
} from '../actions'

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    pokemonDetail: {},
    title: "",
    ordenamiento: "indefinido",
    page: 1,
    selectT: "all",
    selectO: 'all'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKES: return {
            ...state, pokemons: action.payload, allPokemons: action.payload, title: "TODOS LOS POKEMONS!", pokemonDetail: {}, ordenamiento: 'indefinido', page :1
        }
        case SEARCH_FILTER:
            return {
                ...state, pokemons: action.payload, title: "BUSQUEDA REALIZADA: " + action.payload[0].name, ordenamiento: "indefinido", page :1
            }
        case TYPE_FILTER:
            const pokemons = state.allPokemons
            const typeFiltered = action.payload === 'all' ? pokemons : pokemons.filter(e => e.types[0].name === action.payload || (e.types[1] ? e.types[1].name === action.payload : null))
            let aux = ""
            if (typeFiltered.length === 0) {
                aux = `Lo siento, no tenemos guardados pokemons de tipo ${action.payload}`
            } else {
                aux = action.payload === 'all' ? "TODOS LOS POKEMONS!" : `POKEMONS TIPO: ${action.payload.toUpperCase()}`
            }
            return {
                ...state,
                pokemons: typeFiltered,
                title: aux,
                page :1
            }
        case ATTACK_SORT:
            let palabra= ""
            if(action.payload === 'upA'){
                palabra = "ascA"
            }else if(action.payload === 'downA'){
                palabra = "desA"
            }
            let orden = action.payload === 'upA' ?
                state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    } else if (a.attack < b.attack) {
                        return -1;
                    } else {
                        return 0;
                    }
                }) : state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    } else if (a.attack < b.attack) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                console.log(orden)
            return {
                ...state,
                pokemons: orden,
                ordenamiento: palabra
            }
        case NAME_SORT:
            let palabra2= ""
            if(action.payload === 'up'){
                palabra2 = "ascN"
            }else if(action.payload === 'down'){
                palabra2 = "desN"
            }
            let orden2 = action.payload === 'up' ?
            state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }
            }) : state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                } else if (a.name < b.name) {
                    return 1;
                } else {
                    return 0;
                }
            })
            console.log(orden2)
        return {
            ...state,
            pokemons: orden2,
            ordenamiento: palabra2
        }
        case SET_ORIGIN: return {
            ...state, selectO: action.payload
        }
        case SET_TYPE: return {
            ...state, selectT: action.payload
        }
        case GET_ORIGINALS_POKES: return {
            ...state, pokemons: action.payload, title: 'TODOS LOS POKEMONS ORIGINALES!', page: 1
        }
        case GET_CREATED_POKES: return {
            ...state, pokemons: action.payload, title: 'TUS CREACIONES!', page: 1
        }
        case GET_POKE_DETAILS: return {
            ...state, pokemonDetail: action.payload, pokemons: state.allPokemons
        }
        case GET_ALL_TYPES: return {
            ...state, types: action.payload
        }
        case PAGINA: return {
            ...state, page: action.payload
        }
        default: return state
    }
}

export default rootReducer