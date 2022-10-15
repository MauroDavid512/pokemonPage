import axios from "axios";

export const GET_ALL_POKES = "GET_ALL_POKES";
export const GET_POKE_DETAILS = "GET_POKE_DETAILS";
export const GET_ORIGINALS_POKES = "GET_ORIGINALS_POKES"
export const GET_CREATED_POKES = "GET_CREATED_POKES"
export const CREATE_POKE = "CREATE_POKE";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const ATTACK_SORT = 'ATTACK_SORT';
export const NAME_SORT = 'NAME_SORT';
export const TYPE_FILTER = "TYPE_FILTER";
export const SEARCH_FILTER = "SEARCHFILTER"
export const PAGINA = "PAGINA";
export const GET_GRASS = "GET_GRASS";
export const SET_TYPE = 'SET_TYPE';
export const SET_ORIGIN = "SET_ORIGIN";
export const SET_FILTERS = "SET_FILTERS";



export const changePage = (page) => {
    return function (dispatch){
        dispatch({type: PAGINA, payload: page})
    }
}

export const setSelectT = (payload) => {
    return function (dispatch){
        dispatch({type: SET_TYPE, payload: payload})
    }
}

export const setSelectO = (payload) => {
    return function (dispatch){
        dispatch({type: SET_ORIGIN, payload: payload})
    }
}

export const getAllPokes = () => {
    return async function (dispatch) {
        const pokes = await axios.get("http://localhost:3001/pokemons")
        const respuesta = pokes.data
        dispatch({ type: GET_ALL_POKES, payload: respuesta })
    };
}

export const onSearch = (name) => {
    return async function(dispatch) {
        const poke = await axios.get(`http://localhost:3001/pokemons/?name=${name}`)
        const pokeData = poke.data
        dispatch({ type: SEARCH_FILTER, payload: pokeData})
    }
} 

export const filterType = (payload) => {
    return {
        type: TYPE_FILTER,
        payload
    }
}

export const nameSort = (payload) => {
    return async function (dispatch) {
        dispatch({
            type: NAME_SORT,
            payload: payload
        })
    }
}

export const attackSort = (payload) => {
    return async function (dispatch) {
        dispatch({
            type: ATTACK_SORT,
            payload: payload
        })
    }
}

export const filterSearch = () => {
    return async function (dispatch) {
        const types = await axios.get("http://localhost:3001/pokemons/originals")
        const respuesta = types.data
        dispatch({ type: SEARCH_FILTER, payload: respuesta })
    };
}

export const filterOriginal = () => {
    return async function (dispatch) {
        const types = await axios.get("http://localhost:3001/pokemons/originals")
        const respuesta = types.data
        dispatch({ type: GET_ORIGINALS_POKES, payload: respuesta })
    };
}

export const filterCreated = () => {
    return async function (dispatch) {
        const types = await axios.get("http://localhost:3001/pokemons/created")
        const respuesta = types.data
        dispatch({ type: GET_CREATED_POKES, payload: respuesta })
    };
}

export const getAllTypes = () => {
    return async function (dispatch) {
        const types = await axios.get("http://localhost:3001/types")
        const respuesta = types.data
        dispatch({ type: GET_ALL_TYPES, payload: respuesta })
    };
}

export const getPokeDetail = (id) => {
    return async (dispatch) => {
        const pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
        const respuesta = pokemon.data
        dispatch({ type: GET_POKE_DETAILS, payload: respuesta })
    };
};

export const getOriginalsPokes = () => {
    return async function (dispatch) {
        const pokes = await axios.get("http://localhost:3001/pokemons/originals")
        const respuesta = pokes.data
        dispatch({ type: GET_ALL_POKES, payload: respuesta })
    };
}

export const getCreatedPokes = () => {
    return async function (dispatch) {
        const pokes = await axios.get("http://localhost:3001/pokemons/created")
        const respuesta = pokes.data
        dispatch({ type: GET_ALL_POKES, payload: respuesta })
    };
}



export const createPoke = (values) => {
    return { type: CREATE_POKE, payload: { ...values } }
};

