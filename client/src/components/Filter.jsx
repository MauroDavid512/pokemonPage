import "./Filter.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions'
import { NavLink } from 'react-router-dom'
import SearchBar from "./SearchBar";

const Filter = () => {
    const dispatch = useDispatch();
    React.useEffect(()=>{
       dispatch(actions.getAllTypes());
    }, []);

    const [bool,setBool] = useState(true)

    const handleGetAll = (e) => {
        dispatch(actions.getAllPokes())
    }

    const handleTypeFilter = (e) => {
        dispatch(actions.filterType(e.target.value))
    }

    const handleAttackSort = (e) => {
        bool===true? setBool(false) : setBool(true)
        console.log(bool)
        dispatch(actions.attackSort(e.target.value))
    }

    const handleNameSort = (e) => {
        bool===true? setBool(false) : setBool(true)
        console.log(bool)
        dispatch(actions.nameSort(e.target.value))
    }

    const handleOriginFilter = (e) => {
        if(e.target.value==='Api'){
            dispatch(actions.filterOriginal())
        }else if(e.target.value==='Db'){
            dispatch(actions.filterCreated())
        }else{
            dispatch(actions.getAllPokes())
        }
    }


    let types = useSelector((state) => state.types)
    return (
        <div className="filterContainer">
            <button className="create" onClick={handleGetAll}>Cargar pokemons nuevamente</button>
            <SearchBar/>
            <p>Filtrar por tipo: </p>
                <select name="type" onChange={e => handleTypeFilter(e)}>
                    <option value="all">Todos</option>
                    {types.map(e=> <option value={e.name}>{e.name}</option>)}
                </select>
                <p>Ordenar:</p>
                Por nombre <br />
                <button name="nameUp" value="up" onClick={e => handleNameSort(e)}>/\</button>
                <button name="nameDown" value="down" onClick={e => handleNameSort(e)}>\/</button>
                <br /> Por ataque<br/>
                <button name="attackUp" value="upA" onClick={e => handleAttackSort(e)}>/\</button>
                <button name="attackDown" value="downA" onClick={e => handleAttackSort(e)}>\/</button> <br />
                Ver: <br />
                <select name="defaults" onChange={e => handleOriginFilter(e)}>
                    <option value="All">Todos</option>
                    <option value="Api">Originales</option>
                    <option value="Db">Creados</option>|
                </select><hr />
                <NavLink to="/pokemonCreator"><button className="btn">¡Crea tu propio<br/>POKEMON!</button></NavLink>
        </div>
    )
}


export default Filter