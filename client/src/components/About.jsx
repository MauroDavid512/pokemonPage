import React from "react"
import { Link } from "react-router-dom"



export const Autor = () => {
    return (
        <div>
            <h1>Hola!</h1>
            <br />
            <img src="https://media-exp1.licdn.com/dms/image/D4D03AQFetFkVFk6KvQ/profile-displayphoto-shrink_800_800/0/1665445837086?e=1671667200&v=beta&t=lfnDSKHkrl3NVWrmWef-w0Bt6t6faWZ_ug_iRCwS-no" alt="" />
            <h3>Soy Mauro David</h3>
            <h3>Soy Desarrollador Web FullStack</h3>
            <h3>Esta página fue realizada utilizando las tecnologías:</h3>
            
                <h3>React</h3>
                <h3>Redux</h3>
                <h3>Express</h3>
                <h3>PostgreSQL</h3>
                <h3>Javascript</h3>
                <h3>HTML</h3>
                <h3>CSS</h3>

            <h3>Si deseás ver el codigo te dejo el link al repositorio aquí: <a href="https://github.com/MauroDavid512/pokemonPage">Repositorio</a></h3>

            <h3> Si tenés cualquier consulta te invito a contactarme! </h3>

            <h3><a href="https://www.linkedin.com/in/mauro-david-89432b193/">LinkedIn</a></h3>

            <h3><a href="https://github.com/MauroDavid512">GitHub</a></h3>



            <Link to="/home"><button className="btn">Volver</button></Link>
        </div>
    )
}