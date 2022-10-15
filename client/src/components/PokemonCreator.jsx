import "./PokemonCreator.css"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../redux/actions'
import { NavLink } from "react-router-dom";
import axios from "axios";

// import { mayus } from "../../../api/src/routes/utils";


const PokemonCreator = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(actions.getAllTypes());
    }, []);
    React.useEffect(() => {
        dispatch(actions.getAllPokes());
    }, []);
    let types = useSelector((state) => state.types)
    let allPokemons = useSelector(state => state.allPokemons)
    const [creacion, setCreacion] = React.useState({
        name: "",
        img: "",
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        types: ["normal"]
    })
    const [erroresForm, setErroresForm] = React.useState({})
    const [type1, setType1] = React.useState("normal")
    const [type2, setType2] = React.useState("")
    const [loading, setLoading] = React.useState(1);
    const [errorimg, setErrorimg] = React.useState("");
    const [img, setimg] = React.useState("")


    const handleSubmit = (e) => {
        e.preventDefault();
        let pokemonExist = allPokemons.find(e => e.name === (creacion.name.charAt(0).toUpperCase() + creacion.name.slice(1).toLowerCase()))
        if (pokemonExist) {
            alert("Ya hay un pokemon con ese nombre")
        } else if (!creacion.name) {
            alert('¡Colocale un nombre a tu pokemon! :) ')
        } else {
            setErroresForm(validacion(creacion));
            if (Object.values(erroresForm).length > 0 || errorimg) {
                alert('Faltan datos o los has ingresado de forma erronea :( ')
            } else {
                axios.post('http://localhost:3001/pokemonCreator', creacion);
                console.log('Creacion ' + img)
                alert("Creaste un pokemon!");
                setType1('normal')
                setType2("")
                setLoading(1)
                setCreacion({
                    name: "",
                    img: "",
                    hp: 1,
                    attack: 1,
                    defense: 1,
                    speed: 1,
                    height: 1,
                    weight: 1,
                    types: ["normal"]
                });
            }
        }
    }


    const handleChange = (e) => {

        e.preventDefault()
        if (e.target.name === "name") {
            setCreacion({
                ...creacion,
                [e.target.name]: e.target.value
            })
        } else {
            setCreacion({
                ...creacion,
                [e.target.name]: e.target.value
            })
        };
    }



    const handleimg = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        let size = 0;
        if (files) {
            size += files[0].size;
        }

        data.append('file', files[0]);
        data.append('upload_preset', 'Pokemon');
        setLoading(2);
        try {
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/maurodavid/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            );
            const file = await res.json();
            let array = file.secure_url.split('.');
            let format = array[array.length - 1];

            if (size > 2000000) {
                setErrorimg('El archivo es demasiado grande');
            } else {
                if (format === 'jpg' || format === 'png') {
                    setErrorimg('');
                    setimg(file.secure_url);
                    setLoading(0);
                    setCreacion({ ...creacion, img: file.secure_url })
                } else {
                    setErrorimg('Solo se admiten archivos formato jpeg o png');
                    setLoading(1);
                }
            }
        } catch (error) {
            setErrorimg('Solo se admiten archivos formato jpeg o png');
            setLoading(1);
        }
    };

    const handleTypes = (e) => {
        e.preventDefault()
        if (e.target.name === 'type1') {
            setType1(e.target.value)
        } else if (e.target.name === 'type2') {
            setType2(e.target.value)
        }
        if (type2 === "undefined") {
            let arrAux = []
            arrAux.push(type1)
            setCreacion({
                ...creacion,
                types: [...arrAux]
            })
        } else {
            let arrAux = []
            arrAux.push(type1, type2)
            let arrSet = new Set(arrAux)
            setCreacion({
                ...creacion,
                types: [...arrSet]
            })
        }
    }

    const handleErrors = (e) => {
        e.preventDefault();
        setErroresForm(validacion(creacion));
    }

    const validacion = (datos) => {
        let errores = {}
        //Nombre
        if (!datos.name) {
            errores.name = "Campo requerido"
        } else if (!/^[a-zA-Z\s]*$/.test(datos.name)) {
            errores.name = "El nombre debe estar solamente compuesto por letras"
        }
        else if (datos.name.length <= 2) {
            errores.name = "El nombre debe contener más de 2 caracteres"
        } else if (datos.name.length >= 10) {
            errores.name = "El nombre no puede contener más de 10 caracteres"
        }
        if (!datos.defense) {
            errores.defense = "Campo requerido"
        } else if (!/^\d+$/.test(datos.defense)) {
            errores.defense = "Todas las estadisticas deben ser un numero"
        } else if (datos.defense < 0) {
            errores.defense = "Ninguna estadistica puede ser negativa"
        }
        if (!datos.hp) {
            errores.hp = "Campo requerido"
        } else if (!/^\d+$/.test(datos.hp)) {
            errores.hp = "Todas las estadisticas deben ser un numero"
        } else if (datos.hp < 1) {
            errores.hp = "La estadistica vida no puede ser menor a 1"
        }
        if (!datos.speed) {
            errores.speed = "Campo requerido"
        } else if (!/^\d*$/.test(datos.speed)) {
            errores.speed = "Todas las estadisticas deben ser un numero"
        } else if (datos.speed < 0) {
            errores.speed = "Ninguna estadistica puede ser negativa"
        }
        if (!datos.height) {
            errores.height = "Campo requerido"
        } else if (!/^\d*$/.test(datos.height)) {
            errores.height = "Todas las estadisticas deben ser un numero"
        } else if (datos.height < 0) {
            errores.height = "Ninguna estadistica puede ser negativa"
        }
        if (!datos.weight) {
            errores.weight = "Campo requerido"
        } else if (!/^\d*$/.test(datos.weight)) {
            errores.weight = "Todas las estadisticas deben ser un numero"
        } else if (datos.weight < 0) {
            errores.weight = "Ninguna estadistica puede ser negativa"
        }
        if (!datos.attack) {
            errores.attack = "Campo requerido"
        } else if (!/^\d*$/.test(datos.attack)) {
            errores.attack = "Todas las estadisticas deben ser un numero"
        } else if (datos.attack < 0) {
            errores.attack = "Ninguna estadistica puede ser negativa"
        }
        if ((parseInt(datos.hp) + parseInt(datos.attack) + parseInt(datos.defense) + parseInt(datos.speed) + parseInt(datos.height) + parseInt(datos.weight)) > 1500) {
            errores.suma = "Las estadisticas no deben sumar más de 1500"
        }

        return errores
    }


    return (
        <div className="contenedor">
            <div>
                <h1 className="titulo">¡CREA TU PROPIO POKEMON!</h1>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Nombre: </label><br />
                <input name="name" value={creacion.name} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} ></input>
                {erroresForm.name ? <div><small>{erroresForm.name}</small><br /></div> : false}
                {/*---------------------*/}
                <br />
                <label>Imagen: </label><br />
                <input
                    id="inputFile"
                    type="file"
                    name="image"
                    onChange={(e) => handleimg(e)}
                />
                {loading === 2 ? (
                    <p>
                        Cargando imagen...
                    </p>
                ) : (
                    false
                )}
                {loading === 0 ? (
                    <div>
                        <br />
                        <img src={img} alt="" />
                        <br />
                    </div>
                ) : (
                    false
                )}

                {errorimg? <div><small>{errorimg}</small></div> : false}

                {/*---------------------*/}
                <hr />
                <h3 className="titulo">Estadisticas:</h3>
                {erroresForm.suma ? <div><small>{erroresForm.suma}</small><br /></div> : false}
                <label>Vida: </label><br />
                <input name="hp" value={creacion.hp} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} ></input>
                {erroresForm.hp ? <div><small>{erroresForm.hp}</small><br /></div> : false}
                {/*---------------------*/}
                <br />
                <label>Ataque: </label><br />
                <input name="attack" value={creacion.attack} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} ></input>
                {erroresForm.attack ? <div><small>{erroresForm.attack}</small><br /></div> : false}
                {/*---------------------*/}
                <br />
                <label>Defensa: </label><br />
                <input name="defense" value={creacion.defense} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} ></input>
                {erroresForm.defense ? <div><small>{erroresForm.defense}</small><br /></div> : false}
                {/*---------------------*/}
                <br />
                <label>Velocidad: </label><br />
                <input name="speed" value={creacion.speed} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} ></input>
                {erroresForm.speed ? <div><small>{erroresForm.speed}</small><br /></div> : false}
                {/*---------------------*/}
                <br />
                <label>Altura</label><br />
                <input name="height" value={creacion.height} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} ></input>
                {erroresForm.height ? <div><small>{erroresForm.height}</small><br /></div> : false}
                {/*---------------------*/}
                <br />
                <label>Peso</label><br />
                <input name="weight" value={creacion.weight} onChange={e => handleChange(e)} onKeyUp={e => handleErrors(e)} ></input>
                {erroresForm.weight ? <div><small>{erroresForm.weight}</small><br /></div> : false}
                {/*---------------------*/}
                <hr />
                <h3 className="titulo">Tipo</h3>
                <label>Puedes elegir 1 o 2 tipos</label><br />
                <select name="type1" value={type1} onChange={e => handleTypes(e)} onClick={e => handleTypes(e)}>
                    {types.map(e => <option value={e.name}>{e.name}</option>)}
                </select>
                <select name="type2" value={type2} onChange={e => handleTypes(e)} onClick={e => handleTypes(e)}>
                    <option value="undefined">--</option>
                    {types.map(e => <option value={e.name}>{e.name}</option>)}
                </select>
                {/*---------------------*/}
                <br />
                <button type="submit" onChange={e => handleChange(e)} className="create">CREAR</button>
            </form>
            <NavLink to="/home"><button>Volver</button></NavLink>
        </div>
    )
}

export default PokemonCreator