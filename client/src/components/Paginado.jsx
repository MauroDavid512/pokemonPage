import React from "react";
import './Paginado.css'
import * as actions from "../redux/actions"
import { useDispatch, useSelector } from "react-redux";



const Paginado = ({ pokesPerPage, allPokes, paginado }) => {
    const dispatch = useDispatch()
    const actualPageStr = useSelector(state => state.page)
    const actualPage = parseInt(actualPageStr)
    
    const handleChangePage = (e) => {
        e.preventDefault()
        paginado(e.target.value)
        dispatch(actions.changePage(e.target.value))
    }
    const pages = [];
    for (let i = 1; i <= Math.ceil(allPokes / pokesPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="paginContainer">
            {(actualPage -1) > 0 ? <button className="btn" value={actualPage -1} onClick={e => handleChangePage(e)}>{'<'}</button>:null}
            {pages
                && pages.length > 1
                && pages.map(num => (
                    <button className="btn" value={num}   onClick={(e) => {handleChangePage(e)}}>{num}</button>
                ))}
                {(actualPage +1) <= pages.length ? <button className="btn" value={actualPage +1} onClick={e => handleChangePage(e)}>{'>'}</button>:null}
        </div>
    )
}



export default Paginado