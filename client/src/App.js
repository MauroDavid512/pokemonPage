import './App.css';
import React from 'react';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx'
import PokeDetail from './components/PokeDetail';
import PokemonCreator from './components/PokemonCreator';
import { Autor } from './components/About';
import {Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route path="/home" component={Home}/>
      <Route path={"/pokeDetail/:id"} component={PokeDetail}/>
      <Route path="/pokemonCreator" component={PokemonCreator}/>
      <Route path="/autor" component={Autor}/>
    </div>
  );
}

export default App;
