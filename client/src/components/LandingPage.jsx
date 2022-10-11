import "./LandingPage.css"
import React from "react";
import {Link} from 'react-router-dom';


const LandingPage = () => {

    return (
        <div class="initialMessage">
            <div>
            <h1>Conoce mejor a los pokemon!</h1>
            <Link to="/home"><button className="btn">Entrar</button></Link>
            </div>
        </div>
    )
}

export default LandingPage