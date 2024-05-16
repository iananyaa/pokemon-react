import logo from './logo.png';
import './App.css';
import pokemonData from './pokemonapi.json';
import React, { useState } from 'react';

function App() {

  const [pokemonList, setPokemonList] = useState(pokemonData.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);


  //used to filter the pokemon list when searching
  const filteredPokemonList = pokemonList.filter((pokemon) =>

    pokemon.name.includes(searchTerm)

  )

  const showPokemon = async (url) => {

    const response = await fetch(url);

    if (!response.ok) {

      console.error(`Error fetching pokemon: ${response.statusText}`)
      return;

    }

    const data = await response.json();
    setSelectedPokemon(data);

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <main>
        <div className = "search-container">
          <input className = "search-box" type = "text" placeholder = "search..." value={searchTerm} onChange={event => setSearchTerm(event.target.value)}></input>
        </div>

        { selectedPokemon && (
          <div className = "pokemon-details">
            <h2>{selectedPokemon.name}</h2>
            <img src = {selectedPokemon.sprites.front_default}
              alt = {selectedPokemon.name}
            />
            
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>

            {selectedPokemon.stats.map((stat, index) => (
              <div key={index}>
                <p>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              </div>
            ))}

          </div>
        )}

        <ul>

          {filteredPokemonList.map((pokemon) => (
            <li key = {pokemon.id} className = "pokemon-item">
              <a href="#" onClick={() => showPokemon(pokemon.url)}>
                {pokemon.name}
              </a>
            </li>
          ))}

        </ul>

      </main>
    </div>

  );
}

export default App;
