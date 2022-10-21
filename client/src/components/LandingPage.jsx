import "./LandingPage.css"
import React from "react";
import {Link} from 'react-router-dom';


const LandingPage = () => {

    return (
        <div class="initialMessage">
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
            <h1>Conoce mejor a los pokemon!</h1>
            <Link to="/home"><button className="btn">Entrar</button></Link>
            </div>
        </div>
    )
}

export default LandingPage