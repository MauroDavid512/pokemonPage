import "./Home.css"
import React from "react";
import {Cards} from "./Cards"; 
import Filter from "./Filter";
import { useSelector } from "react-redux";

const Home = () => {
    const title = useSelector((state=> state.title))
    
    return (
        <div>
            <div className="home">
                <h1>{title}</h1>
            </div>
            <div className="blocks">
                <div className="filter">
                <Filter/>
                </div>
                <div className="cardContainer">
                <Cards/>
                </div>
            </div>
        </div>

    )
}

export default Home