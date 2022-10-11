import "./Cards.css"
import React from "react";
import PokeCard from "./PokeCard";
import { connect, useDispatch, useSelector } from 'react-redux'
import * as actions from "../redux/actions"
import Paginado from "./Paginado.jsx";

export const Cards = () => {

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(actions.getAllPokes());
  }, [dispatch])

  const page = useSelector((state) => state.page)
  const allPokes = useSelector((state) => state.pokemons);
  const pokesPerPage = 12;
  const indexLastPoke = page * pokesPerPage
  const indexFirstPoke = indexLastPoke - pokesPerPage
  const currentPokes = allPokes.slice(indexFirstPoke, indexLastPoke)
  const paginado = (pageNumber) => {
    dispatch(actions.changePage(pageNumber))
  }
  const sortS = useSelector((state) => state.ordenamiento)
  return (
    <div>
      <div className="order">
        {currentPokes?.map(p => <PokeCard key={p.id} id={p.id} name={p.name} img={p.img} typesString={p.typesString} types={p.types} />)}
      </div>
      <div>
        <p>Página {page}</p>
        <Paginado pokesPerPage={pokesPerPage} allPokes={allPokes.length} paginado={paginado} />
        <h6 className="renderizador">{sortS}</h6>
      </div>
    </div>
  )
}





export const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getAllPokes: () => dispatch(actions.getAllPokes())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);