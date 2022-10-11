import "./PokeCard.css"
import React from "react"
import { NavLink } from "react-router-dom"
import { mayus } from ".."
import pokebola from '../imgs/pokebola.png'

const PokeCard = (props) => {
    
    return (
        <div className="card">
            <NavLink to={`/pokeDetail/${props.id}`}>
                <img className="image" src={props.img? props.img : pokebola} alt={props.name}/>
            </NavLink>
                <hr />
                <h3>{props.name}</h3>
             
                <p><b>Tipo: {props.typesString}</b>
                </p>

            
        </div>
    )
}

export default PokeCard
